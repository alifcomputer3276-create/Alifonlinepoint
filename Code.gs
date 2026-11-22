/**
 * ALIF IT CENTER admission form receiver.
 * Create a NEW private Google Spreadsheet for admission applications.
 * Do not make the spreadsheet public or share it with students/applicants.
 */
const SHEET_NAME = 'Admission Applications';
const HEADERS = [
  'Submitted At', 'Course', 'Study Mode', 'Preferred Start',
  'Student Name (Bangla)', 'Student Name (English)', 'Student DOB', 'Gender',
  'Student Phone', 'Student Email', 'Student ID Type', 'Student ID Number',
  'Present Address', 'Permanent Address',
  'Father Name', 'Father DOB', 'Father NID', 'Father Phone',
  'Mother Name', 'Mother DOB', 'Mother NID', 'Mother Phone',
  'Guardian Name', 'Guardian Relation',
  'Education', 'Institution', 'Group', 'Passing Year',
  'Computer Experience', 'Source', 'Notes', 'Information Confirmed', 'Privacy Consent'
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, message: 'No form data received' });
    }
    const data = JSON.parse(e.postData.contents);
    if (!data.student_name_bn || !data.student_phone || !data.course ||
        !data.student_dob || !data.present_address ||
        data.information_confirmed !== 'on' || data.privacy_consent !== 'on') {
      return jsonResponse({ ok: false, message: 'Required fields are missing' });
    }

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('Set SPREADSHEET_ID in Script Properties first.');
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    // Keep all submitted values as text to avoid interpreting IDs/phone numbers as numbers or formulas.
    const values = [
      new Date(), data.course, data.study_mode, data.preferred_start,
      data.student_name_bn, data.student_name_en, data.student_dob, data.gender,
      data.student_phone, data.student_email, data.student_id_type, data.student_id_number,
      data.present_address, data.permanent_address,
      data.father_name, data.father_dob, data.father_nid, data.father_phone,
      data.mother_name, data.mother_dob, data.mother_nid, data.mother_phone,
      data.guardian_name, data.guardian_relation,
      data.education, data.institution, data.group_name, data.passing_year,
      data.computer_experience, data.source, data.notes,
      data.information_confirmed, data.privacy_consent
    ].map(value => safeCell(value));

    sheet.appendRow(values);
    return jsonResponse({ ok: true, message: 'Application received' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: 'Could not save application' });
  }
}

function safeCell(value) {
  const text = value == null ? '' : String(value).trim();
  // Prevent spreadsheet formula injection from user-entered text.
  return /^[=+@\-]/.test(text) ? "'" + text : text;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
