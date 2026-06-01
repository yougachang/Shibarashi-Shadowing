// Goal Tracker — local server
// Serves index.html and proxies YouTube transcript fetching.
// No npm dependencies — uses Node 18+ built-in fetch + http.

const http = require('http');
const fs = require('fs');
const path = require('path');

// Render (and most hosts) inject a PORT env var; fall back to 4178 locally.
const PORT = process.env.PORT || 4178;
const ROOT = __dirname;

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// ---------- transcript fetching ----------

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

// Ask YouTube's InnerTube "player" API (ANDROID client) for video data.
// The watch-page caption URLs now return empty bodies due to anti-scraping;
// the ANDROID client returns caption tracks whose URLs actually serve content.
const ANDROID_UA = 'com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip';

async function getPlayerData(videoId) {
  const res = await fetch('https://www.youtube.com/youtubei/v1/player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': ANDROID_UA,
      'X-Goog-Api-Format-Version': '2',
    },
    body: JSON.stringify({
      videoId,
      context: {
        client: {
          clientName: 'ANDROID',
          clientVersion: '20.10.38',
          androidSdkVersion: 34,
          hl: 'en',
          gl: 'US',
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`YouTube player API returned ${res.status}`);
  return res.json();
}

// timedtext format=3: <p t="ms" d="ms"><s>word</s>...</p> (or plain text inside <p>)
function parseTimedText(xml) {
  const segments = [];
  const re = /<p t="(\d+)"(?: d="(\d+)")?[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const start = parseInt(m[1], 10) / 1000;
    const dur = m[2] ? parseInt(m[2], 10) / 1000 : 0;
    let text = m[3].replace(/<[^>]+>/g, ''); // strip nested <s> tags
    text = decodeEntities(text).replace(/\s+/g, ' ').trim();
    if (text) segments.push({ start, dur, text });
  }
  return segments;
}

// Older timedtext: <text start="s" dur="s">…</text>
function parseLegacyTimedText(xml) {
  const segments = [];
  const re = /<text start="([\d.]+)"(?: dur="([\d.]+)")?[^>]*>([\s\S]*?)<\/text>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const start = parseFloat(m[1]);
    const dur = m[2] ? parseFloat(m[2]) : 0;
    let text = m[3].replace(/<[^>]+>/g, '');
    text = decodeEntities(text).replace(/\s+/g, ' ').trim();
    if (text) segments.push({ start, dur, text });
  }
  return segments;
}

async function fetchTranscript(videoId) {
  const player = await getPlayerData(videoId);

  const status = player?.playabilityStatus?.status;
  if (status && status !== 'OK') {
    const reason = player?.playabilityStatus?.reason || status;
    throw new Error(`Video not playable: ${reason}`);
  }

  const title = player?.videoDetails?.title || '';
  const tracks = player?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
  if (!tracks || !tracks.length) throw new Error('This video has no captions/transcript available.');

  // prefer English (manual over auto-generated if both exist), else first
  const english = tracks.filter(t => (t.languageCode || '').startsWith('en'));
  let track = english.find(t => t.kind !== 'asr') || english[0] || tracks[0];

  let baseUrl = track.baseUrl;
  if (!baseUrl) throw new Error('Caption track has no URL.');
  if (!/[?&]fmt=/.test(baseUrl)) baseUrl += '&fmt=json3';

  const ttRes = await fetch(baseUrl, { headers: { 'User-Agent': ANDROID_UA } });
  if (!ttRes.ok) throw new Error(`Transcript fetch returned ${ttRes.status}`);
  const xml = await ttRes.text();

  let segments = parseTimedText(xml);
  if (!segments.length) segments = parseLegacyTimedText(xml);
  if (!segments.length) throw new Error('Transcript was empty or could not be parsed.');

  return { title, lang: track.languageCode || 'en', segments };
}

// ---------- translation ----------
// Uses Google's free (unofficial) translate endpoint — no API key.
// Default target: Traditional Chinese (zh-TW).
async function translateText(text, target = 'zh-TW', source = 'en') {
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx'
    + `&sl=${encodeURIComponent(source)}&tl=${encodeURIComponent(target)}`
    + `&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Translation service returned ${res.status}`);
  const data = await res.json();
  // data[0] is an array of [translatedChunk, originalChunk, ...]
  const translated = (data[0] || []).map(seg => seg[0]).join('');
  if (!translated) throw new Error('Empty translation.');
  return translated;
}

// ---------- http server ----------

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS (localhost only context, but harmless)
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (url.pathname === '/api/transcript') {
    const v = url.searchParams.get('v');
    if (!v) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing video id (?v=).' }));
    }
    try {
      const data = await fetchTranscript(v);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message || 'Failed to fetch transcript.' }));
    }
    return;
  }

  if (url.pathname === '/api/translate') {
    const q = url.searchParams.get('q');
    const target = url.searchParams.get('target') || 'zh-TW';
    if (!q) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing text (?q=).' }));
    }
    try {
      const translated = await translateText(q, target);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ translated, target }));
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message || 'Translation failed.' }));
    }
    return;
  }

  // static
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  filePath = path.join(ROOT, path.normalize(filePath).replace(/^(\.\.[/\\])+/, ''));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`\n  🎯 Goal Tracker running at  http://localhost:${PORT}\n`);
  console.log('  Press Ctrl+C to stop.\n');
});
