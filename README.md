# 🐕 Shibarashi — YouTube Shadowing

A clean, minimal YouTube shadowing workspace for language learners.

簡潔的 YouTube 英文 Shadowing 工作區,專為語言學習設計。

![light + dark](https://img.shields.io/badge/theme-light%20%2F%20dark-1d1d1f) ![no build](https://img.shields.io/badge/setup-no%20npm%20install-1d1d1f)

---

## ✨ Features / 功能

- Watch any YouTube video with its transcript side-by-side

  看 YouTube 影片,逐字稿並排顯示

- Click a line to jump or repeat it — great for shadowing

  點句子即可跳播或重複,適合跟讀

- Transcript auto-grouped into readable sentences (Grouped / Raw)

  逐字稿自動分成好讀的句子(Grouped / Raw 切換)

- Notes autosaved per video, kept in a searchable Library

  筆記自動依影片儲存,可在 Library 搜尋

- Highlight a sentence → add to notes or translate (繁體中文)

  反白句子 → 加入筆記或翻譯成繁體中文

- Export notes to TXT / PDF, or copy as Markdown for Notion

  筆記匯出成 TXT / PDF,或複製成 Markdown 貼到 Notion

- Light / Dark / System theme

  深色 / 淺色 / 跟隨系統主題

---

## 🚀 How to run / 怎麼啟動

Runs on your own computer (a small local server fetches transcripts).

跑在你自己的電腦上(用一個小型本機伺服器抓逐字稿)。

### 1. Install Node.js / 先安裝 Node.js

Download the **LTS** version from **https://nodejs.org** and install.

到 **https://nodejs.org** 下載 **LTS** 版安裝即可。

### 2. Download this project / 下載專案

On GitHub, click the green **`< > Code`** button → **Download ZIP** → unzip.

在 GitHub 點綠色 **`< > Code`** 按鈕 → **Download ZIP** → 解壓縮。

### 3. Start it / 啟動

**Mac:** double-click **`start.command`** — it opens in your browser.

**Mac:** 直接雙擊 **`start.command`**,會自動開啟瀏覽器。

**Any OS / 任何系統:**
```bash
cd Shibarashi-Shadowing
node server.js
```

Then open **http://localhost:4178**.

然後打開 **http://localhost:4178**。

> **Mac: `start.command` won't open?** Run `chmod +x start.command`, then right-click the file → **Open**. Or just use `node server.js`.
>
> **Mac 雙擊被擋?** 跑一次 `chmod +x start.command`,再右鍵 →「打開」。或直接用 `node server.js`。

---

## ⚠️ Limitations / 限制

- Auto transcript depends on YouTube; if it fails, paste the transcript manually (the app guides you).

  自動逐字稿看 YouTube 臉色,失敗時可手動貼上(app 會引導你)。

- Videos without captions can't be auto-transcribed.

  沒字幕的影片無法自動轉錄。

- Translation uses a free public service (no API key); heavy use may rate-limit.

  翻譯用免費公開服務(免 API key),大量使用可能被限流。

- Notes and saved videos live in your browser only — not synced or shared.

  筆記與影片只存在你的瀏覽器,不會同步或分享。
