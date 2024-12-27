# Performance Monitor (效能監視器)

## 介紹
Performance Monitor 是一個用於監控系統 CPU 和 RAM 使用率的 Node.js 工具。該工具會每隔 5 秒收集一次數據，並自動將結果寫入 Google 試算表，以便進行後續的分析與視覺化。

---

## 功能
- **實時監控**：每隔 5 秒記錄 CPU 和 RAM 使用率。
- **Google 試算表整合**：自動將數據上傳至指定的試算表。
- **支持多電腦**：可自定義電腦名稱以區分多台設備的數據來源。

---

## 需求
- Node.js 環境 (推薦使用 Node.js 16+)
- Google Cloud 服務帳戶憑證
- Google 試算表 (需已創建並設置正確的工作表名稱)

---

## 安裝與設定

### 1. 克隆專案
```bash
git clone https://github.com/<your-username>/performance-monitor.git
cd performance-monitor
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 設定 Google Cloud 服務帳戶
1. 登錄 [Google Cloud Console](https://console.cloud.google.com/)。
2. 創建專案，啟用 Google Sheets API。
3. 創建服務帳戶，並下載憑證 JSON 檔案。
4. 將憑證 JSON 檔案放置於專案目錄，命名為 `credentials.json`。
5. 確保試算表已分享給服務帳戶 Email（憑證中的 `client_email`）。

### 4. 設置環境變數
編輯程式中的以下變數：
- **SPREADSHEET_ID**: 您的試算表 ID（可從試算表 URL 中獲取）。
- **SHEET_NAME**: 試算表內的工作表名稱（默認為 `電腦數據紀錄`）。
- **COMPUTER_NAME**: 用於區分不同電腦的名稱。

### 5. 執行程式
```bash
node app.js
```

---

## 試算表數據格式
寫入 Google 試算表的數據格式如下：
| 電腦名稱   | 時間 (UTC+8)        | CPU 使用率 (%) | RAM 使用率 (%) |
|------------|---------------------|----------------|----------------|
| linlin-pc  | 2024-12-28 01:55:23 | 12.34          | 45.67          |

---

## 程式結構

### 主要檔案
- `app.js`：主程式，負責監控數據並上傳至 Google 試算表。
- `credentials.json`：Google Cloud 服務帳戶憑證檔案。

---

## 注意事項
- 確保試算表的工作表名稱與程式中的 `SHEET_NAME` 一致。
- 試算表需要正確授權服務帳戶，否則會出現權限錯誤。

---

## 貢獻
歡迎提交 issue 和 pull request，改進此工具的功能！

---

## 授權
第一優先序: Tdr_gaming License
第二優先序: MIT License
