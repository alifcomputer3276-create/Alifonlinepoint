/**
 * ALIF ONLINE POINT
 * Expanded Online Application Form Data Receiver
 * Bind this Apps Script project to the destination Google Sheet.
 */

const SHEET_NAME = 'আবেদনসমূহ';
const HEADERS = [
  'জমার সময়', 'নাম', 'মোবাইল', 'পিতার নাম', 'মাতার নাম', 'জন্মতারিখ',
  'ইমেইল', 'ঠিকানা', 'সেবার ধরন', 'আবেদনের ধরন/প্রতিষ্ঠান', 'শিক্ষাগত যোগ্যতা',
  'জরুরিতা', 'কাগজপত্রের অবস্থা', 'যোগাযোগের সময়', 'আবেদনের বিস্তারিত',
  'সম্মতি', 'উৎস'
];

function doGet() {
  return ContentService.createTextOutput('Alif Online Point Application Receiver is Active!');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    const p = (e && e.parameter) ? e.parameter : {};

    // Honeypot spam check. Normal users leave this field empty.
    if (String(p.website || '').trim() !== '') {
      return output_({ ok: false, message: 'Rejected' });
    }

    const data = {
      name: clean_(p.name, 100),
      mobile: clean_(p.mobile, 11),
      fatherName: clean_(p.fatherName, 100),
      motherName: clean_(p.motherName, 100),
      birthDate: clean_(p.birthDate, 20),
      email: clean_(p.email, 120),
      address: clean_(p.address, 250),
      service: clean_(p.service, 100),
      applicationFor: clean_(p.applicationFor, 150),
      education: clean_(p.education, 60),
      urgency: clean_(p.urgency, 60),
      documentStatus: clean_(p.documentStatus, 80),
      contactTime: clean_(p.contactTime, 50),
      details: clean_(p.details, 1500),
      consent: clean_(p.consent, 10),
      source: clean_(p.source, 100)
    };

    if (!data.name || !/^01[0-9]{9}$/.test(data.mobile) || !data.address ||
        !data.service || !data.details || data.consent !== 'yes') {
      return output_({ ok: false, message: 'Required information missing or invalid' });
    }

    lock.waitLock(10000);
    locked = true;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error('No active spreadsheet. Bind this project to a Google Sheet.');

    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(), safeCell_(data.name), safeCell_(data.mobile),
      safeCell_(data.fatherName), safeCell_(data.motherName), safeCell_(data.birthDate),
      safeCell_(data.email), safeCell_(data.address), safeCell_(data.service),
      safeCell_(data.applicationFor), safeCell_(data.education), safeCell_(data.urgency),
      safeCell_(data.documentStatus), safeCell_(data.contactTime), safeCell_(data.details),
      data.consent, safeCell_(data.source)
    ]);

    return output_({ ok: true, message: 'Application received' });
  } catch (error) {
    console.error(error);
    return output_({ ok: false, message: 'Server error' });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function clean_(value, maxLength) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLength);
}

// Protect cells from being interpreted as spreadsheet formulas.
function safeCell_(value) {
  const text = String(value || '');
  return /^[=+@\-]/.test(text) ? "'" + text : text;
}

function output_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
