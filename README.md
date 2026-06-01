# 🐕 Shibarashi Goal Tracker

A clean, minimal **goal tracker + YouTube shadowing workspace** for language learners and designers.
Track your daily habits on a calendar, and turn any YouTube video into a shadowing study tool with transcript + notes.

簡潔的**目標追蹤 + YouTube 英文 Shadowing 工作區**。用日曆追蹤每天的習慣,把任何 YouTube 影片變成附逐字稿和筆記的口說練習工具。

![light + dark](https://img.shields.io/badge/theme-light%20%2F%20dark-1d1d1f) ![no build](https://img.shields.io/badge/setup-no%20npm%20install-1d1d1f)

---

## ✨ Features / 功能

**📅 Calendar tracker**
- Week / Month views of your daily habits, with a GitHub-style activity heatmap
- Streak counter, completion stats, drag-to-reschedule
- 每日習慣的週/月檢視、連續天數、GitHub 式的活動熱力圖

**🎧 Shadowing workspace**
- Paste a YouTube URL → watch the embedded video
- Auto-fetched transcript with timestamps — **click any line to jump there**
- Play / pause each line, resize panels, take notes (autosaved per video)
- Highlight any sentence → **add to notes** or **translate** (→ Traditional Chinese)
- Export notes to **TXT / PDF**, or copy as Markdown for Notion
- 自動逐字稿、點句子跳播放、做筆記、反白翻譯、匯出筆記

**🌗 Light / Dark / System theme** — Apple-style minimal monochrome.

---

## 🚀 How to run / 怎麼啟動

This app runs **on your own computer** (it needs a small local server to fetch transcripts).
這個 app 跑在**你自己的電腦上**(抓逐字稿需要一個小型本機伺服器)。

### 1. Install Node.js / 先安裝 Node.js

If you don't have it, download the **LTS** version from **https://nodejs.org** and install (just click through).
沒裝過的話,到 https://nodejs.org 下載 **LTS** 版安裝即可。

Check it's installed / 確認裝好了:
```bash
node --version
```
(should print something like `v20.x` or higher / 會印出 `v20.x` 之類的版本)

### 2. Download this project / 下載專案

**Option A — Download ZIP (easiest):**
On the GitHub page, click the green **`< > Code`** button → **Download ZIP** → unzip it.
在 GitHub 頁面點綠色 **`< > Code`** 按鈕 → **Download ZIP** → 解壓縮。

**Option B — git clone:**
```bash
git clone https://github.com/yougachang/youtube_shadowing_tool.git
```

### 3. Start it / 啟動

**Mac:** double-click **`start.command`** — it opens the app in your browser automatically.
**Mac:** 直接雙擊 **`start.command`**,會自動在瀏覽器打開。

**Any OS, from terminal / 任何系統,用終端機:**
```bash
cd youtube_shadowing_tool
node server.js
```
Then open **http://localhost:4178** in your browser.
然後在瀏覽器打開 **http://localhost:4178**。

> No `npm install` needed — it uses only built-in Node modules.
> 不需要 `npm install` —— 只用 Node 內建模組。

To stop it: press **Ctrl+C** in the terminal. / 要停止:在終端機按 **Ctrl+C**。

> **Mac: `start.command` won't open?** macOS may block double-clicking a downloaded script.
> Fix once in the terminal: `chmod +x start.command`, then right-click the file → **Open** → **Open** to confirm.
> Or just use the `node server.js` method above — it always works.
> **Mac 雙擊 `start.command` 被擋?** 下載的腳本 macOS 會擋。在終端機跑一次 `chmod +x start.command`,然後對檔案按右鍵 →「打開」→「打開」確認。或直接用上面的 `node server.js` 方式,一定可以。

---

## ⚠️ Limitations / 限制

Please read these — they're normal, not bugs. / 請先看這些 —— 都是正常現象,不是 bug。

1. **Runs locally, not online by default.**
   You (and anyone you share it with) run it on your own machine. There's no public website unless you deploy it yourself (see below).
   **預設跑在本機,不是線上網站。** 你和你分享的人都各自在自己電腦跑。除非自己部署,否則沒有公開網址。

2. **Auto transcript depends on YouTube.**
   YouTube actively blocks automated transcript fetching. Running **locally** (on a home network) usually works fine. If auto-fetch fails, the app falls back to a **manual paste** flow — click **"Open on YouTube" → "Show transcript" → copy & paste**. Timestamps are preserved.
   **自動逐字稿看 YouTube 臉色。** YouTube 會擋自動抓取。在**本機(家用網路)**通常正常。失敗時 app 會自動切到**手動貼**:點「Open on YouTube」→「顯示轉錄稿」→ 複製貼上(時間軸會保留)。

3. **Videos without captions can't be auto-transcribed.**
   If a YouTube video has no captions at all, there's nothing to fetch — use manual paste or pick another video.
   **沒字幕的影片無法自動轉錄。** 該影片本身沒有字幕就抓不到,改用手動貼或換影片。

4. **Translation uses a free public service.**
   The translate button uses Google's free endpoint (no API key). Reliable for personal use, but could rate-limit under heavy use.
   **翻譯用免費公開服務。** 翻譯按鈕用 Google 免費端點(免 API key),個人使用穩定,大量使用可能被限流。

5. **Your data stays on your device.**
   All habits, notes, and saved videos are stored in your browser's `localStorage`. They are **not synced** across devices or shared with anyone. Clearing your browser data will erase them.
   **資料只存在你的裝置。** 所有習慣、筆記、影片都存在瀏覽器的 `localStorage`,**不會跨裝置同步**、也不會分享給別人。清除瀏覽器資料會清空。

---

## 🌐 Optional: deploy online / 進階:部署到線上

Want a shareable web link? You can deploy the server to a free host like Render. See **`DEPLOY.md`**.
Note: on cloud hosts, auto-transcript is often blocked by YouTube — the manual-paste fallback still works.

想要可分享的網址?可以把伺服器部署到 Render 之類的免費平台,見 **`DEPLOY.md`**。注意:雲端上自動逐字稿常被 YouTube 擋,但手動貼仍可用。

---

## 🛠 Tech / 技術

- Single `index.html` (HTML + CSS + vanilla JS) — no framework
- `server.js` — tiny Node HTTP server (transcript proxy + translation + static files), **zero dependencies**
- Data: browser `localStorage`
