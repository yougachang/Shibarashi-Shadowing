# 部署到雲端(Render,免費)

你的 app 已經準備好了。本地 git 也 commit 好了。
剩下兩步要你用自己的帳號做(我無法代登入):

---

## 步驟 1：推到 GitHub

1. 到 https://github.com/new 建一個新的 repo
   - 名字隨意,例如 `shibarashi`
   - 設 **Public**(免費部署需要)或 Private 都可
   - **不要**勾「Add a README」(我們已經有檔案了)

2. 建好後,GitHub 會顯示一段指令。回到終端機,在這個資料夾執行：

```bash
cd "/Users/chanyuchia/goal tracking"
git remote add origin https://github.com/你的帳號/shibarashi.git
git branch -M main
git push -u origin main
```

(第一次 push 會要求登入 GitHub —— 用瀏覽器授權或輸入帳密/token）

---

## 步驟 2：在 Render 部署

1. 到 https://render.com 用 GitHub 帳號註冊/登入（免費）
2. 點 **New +** → **Web Service**
3. 連接你剛剛的 GitHub repo（`shibarashi`）
4. Render 會自動讀到 `render.yaml`，設定大致如下（通常不用改）：
   - **Runtime**: Node
   - **Build Command**: 留空
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. 按 **Create Web Service** → 等 1～2 分鐘

完成後 Render 會給你一個網址，例如：
`https://shibarashi.onrender.com`

把這個網址傳給任何人，他們打開就能用 —— 逐字稿、翻譯全部正常。

---

## 免費方案的小提醒

- **會休眠**：15 分鐘沒人用，伺服器會睡著。下次有人開時要等 ~30 秒喚醒（之後就順了）。這是免費方案的正常現象。
- **資料是各自存的**：每個人的打卡紀錄、筆記都存在他們自己的瀏覽器（localStorage），不會互相看到。這對「個人目標追蹤」來說正是你要的。

---

## 之後要更新網站怎麼辦？

改完 code 後，在這個資料夾執行：

```bash
git add -A
git commit -m "更新說明"
git push
```

Render 會自動偵測到、重新部署。完全不用再進 Render 後台。
