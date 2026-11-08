/**
 * ALIF ONLINE POINT — APPLICATION FORM RECEIVER
 * Paste this code into Extensions > Apps Script from a new Google Sheet.
 * Deploy as a Web App: Execute as Me; Who has access: Anyone.
 */
const SHEET_NAME = 'আবেদনসমূহ';
const HEADERS = ['জমার সময়', 'নাম', 'মোবাইল', 'সেবার ধরন', 'আবেদনের বিস্তারিত', 'যোগাযোগের সময়', 'সম্মতি', 'উৎস'];

/**
 * A simple GET response so the deployed /exec URL can be checked in a browser.
 * Actual form submissions are handled by doPost(e).
 */
function doGet() {
  return ContentService.createTextOutput('Alif Online Point application receiver is active. Submit applications through the website form.');
}

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    // Ignore bot submissions and reject incomplete data.
    if (String(p.website || '').trim()) return output_({ ok: false, message: 'Rejected' });
    const name = clean_(p.name, 100);
    const mobile = clean_(p.mobile, 11);
    const service = clean_(p.service, 80);
    const details = clean_(p.details, 1500);
    const contactTime = clean_(p.contactTime, 40);
    const consent = clean_(p.consent, 10);
    const source = clean_(p.source, 100);
    if (!name || !/^01[0-9]{9}$/.test(mobile) || !service || !details || consent !== 'yes') {
      return output_({ ok: false, message: 'Required information missing' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
      }
      sheet.appendRow([new Date(), safeCell_(name), safeCell_(mobile), safeCell_(service), safeCell_(details), safeCell_(contactTime), consent, safeCell_(source)]);
    } finally {
      lock.releaseLock();
    }
    return output_({ ok: true, message: 'Application received' });
  } catch (err) {
    return output_({ ok: false, message: 'Server error' });
  }
}

function clean_(value, maxLength) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}

// Prevent spreadsheet formula execution from submitted text.
function safeCell_(value) {
  const text = String(value || '');
  return /^[=+@\-]/.test(text) ? "'" + text : text;
}

function output_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
