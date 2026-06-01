# 🐕 Shibarashi — YouTube Shadowing

A clean, minimal YouTube shadowing workspace for language learners.

簡潔的 YouTube 英文 Shadowing 工作區,專為語言學習設計。

![light + dark](https://img.shields.io/badge/theme-light%20%2F%20dark-1d1d1f) ![no build](https://img.shields.io/badge/setup-no%20npm%20install-1d1d1f)

---

## 🎬 Demo / 示範

https://github.com/user-attachments/assets/7eb5d6dc-d4e1-4403-9404-2b1e3edcf5e6

---

## ✨ Features / 功能

- Watch any YouTube video with its transcript side-by-side / 看 YouTube 影片,逐字稿並排顯示

- Click a line to jump or repeat it — great for shadowing / 點句子即可跳播或重複,適合跟讀

- Transcript auto-grouped into readable sentences / 逐字稿自動分成好讀的句子 

- Notes autosaved per video, kept in a searchable Library / 筆記自動依影片儲存,可在 Library 搜尋

- Highlight a sentence → add to notes or translate (繁體中文) / 反白句子 → 加入筆記或翻譯成繁體中文

- Export notes to TXT / PDF, or copy as Markdown for Notion / 筆記匯出成 TXT / PDF,或複製成 Markdown 貼到 Notion

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

> **Mac blocks `start.command`?** ("Apple could not verify…") Go to **System Settings → Privacy & Security**, scroll down to "start.command was blocked" → click **Open Anyway**.
>
> **Mac 擋住 `start.command`?**(出現「無法驗證…」)到 **系統設定 → 隱私權與安全性**,往下找到「已封鎖 start.command」→ 按「**仍要打開**」。

---

## ⚠️ Limitations / 限制

- Auto transcript depends on YouTube; if it fails, paste the transcript manually.

  自動逐字稿看 YouTube 臉色,失敗時可手動貼上

- Videos without captions can't be auto-transcribed.

  沒字幕的影片無法自動轉錄。

- Translation uses a free public service (no API key); heavy use may rate-limit.

  翻譯用免費公開服務(免 API key),大量使用可能被限流。

- Notes and saved videos live in your browser only — not synced or shared.

  筆記與影片只存在你的瀏覽器,不會同步或分享。

---

## 📄 Disclaimer / 免責聲明

This is a personal, non-commercial tool for **language-learning (shadowing) only**.

這是一個**僅供個人語言學習(shadowing)** 的非商業工具。

- It runs **entirely on your own computer**. There is no hosted service — each user runs it locally with their own connection, and the author neither operates a server nor collects any data.

  本工具**完全在你自己的電腦上執行**。沒有任何架設的服務 —— 每位使用者都是在本機、用自己的網路連線執行,作者不營運任何伺服器,也不蒐集任何資料。

- It is **not affiliated with, endorsed by, or sponsored by** YouTube or Google.

  本工具與 YouTube、Google **無任何關聯,也未獲其授權或贊助**。

- All videos, captions, and translations belong to their respective owners. Use them only for your own personal study — do **not** download, redistribute, or use content in ways that infringe copyright.

  影片、字幕、翻譯的著作權皆屬原作者所有。請僅用於個人學習,**請勿**下載、再散布或以侵權方式使用內容。

- Please respect the Terms of Service of YouTube and any other service you access through this tool.

  使用時請遵守 YouTube 及任何透過本工具存取之服務的服務條款。

- The software is provided **"as is", without warranty of any kind**. You are solely responsible for how you use it.

  本軟體**依「現狀」提供,不附任何擔保**。使用方式與後果由使用者自行負責。

---

## 📜 License / 授權

Released under the [MIT License](LICENSE).

採用 [MIT License](LICENSE) 授權。
