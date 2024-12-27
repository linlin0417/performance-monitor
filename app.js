const os = require('os');
const { google } = require('googleapis');
const fs = require('fs');
const osUtils = require('os-utils');

// 設定電腦名稱
const COMPUTER_NAME = 'pc'; // 替換為您的電腦名稱

// Google Sheets API 設定
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = './credentials.json'; // 憑證檔案路徑
const SPREADSHEET_ID = ''; // 替換為您的 Google 試算表 ID
const SHEET_NAME = 'test'; // 替換為您的工作表名稱

// 授權 Google Sheets API
async function authorize() {
    try {
        const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
        const { client_email, private_key } = credentials;
        const auth = new google.auth.JWT(client_email, null, private_key, SCOPES);
        console.log('Google Sheets API 授權成功');
        return google.sheets({ version: 'v4', auth });
    } catch (err) {
        console.error('授權失敗:', err.message);
        throw err;
    }
}

// 寫入數據到 Google 試算表
async function appendToSheet(data) {
    try {
        console.log('正在嘗試寫入數據:', data);
        const sheets = await authorize();
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:D`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [data],
            },
        });
        console.log('寫入成功，回應:', response.data);
    } catch (err) {
        console.error('寫入試算表時發生錯誤:', err.message);
    }
}

// 獲取當前 UTC+8 的日期和時間
function getUTC8DateTime() {
    const now = new Date();
    const utc8Time = new Date(now.getTime() + 8 * 60 * 60 * 1000); // 加 8 小時
    return utc8Time.toISOString().replace('T', ' ').split('.')[0]; // 格式化為 "YYYY-MM-DD HH:mm:ss"
}

// 獲取系統數據
function getSystemUsage() {
    console.log('正在獲取系統數據...');
    osUtils.cpuUsage(async (cpuUsage) => {
        const totalMemory = os.totalmem() / 1024 / 1024; // MB
        const freeMemory = os.freemem() / 1024 / 1024; // MB
        const usedMemoryPercentage = (((totalMemory - freeMemory) / totalMemory) * 100).toFixed(2);
        const cpuUsagePercentage = (cpuUsage * 100).toFixed(2);

        const utc8DateTime = getUTC8DateTime();

        const rowData = [COMPUTER_NAME, utc8DateTime, cpuUsagePercentage, usedMemoryPercentage];
        console.log('系統數據獲取成功:', rowData);
        await appendToSheet(rowData);
    });
}

// 設置間隔定時器，每 5 秒記錄一次
setInterval(getSystemUsage, 5000);

console.log(`正在監控系統使用率（電腦名稱: ${COMPUTER_NAME}），每 5 秒寫入 Google 試算表...`);
