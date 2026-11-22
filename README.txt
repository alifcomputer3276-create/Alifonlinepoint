ALIF IT CENTER WEBSITE — FILE GUIDE
===================================

FILES
-----
index.html       Main website / home page
admission.html   Separate course admission form
style.css       Shared responsive Black & Blue styling
main.js         Mobile menu and footer year
admission.js    Form handling; add the deployed Apps Script URL here
Code.gs         Google Apps Script receiver for the admission form

HOW TO PREVIEW
--------------
1. Extract this ZIP file.
2. Open index.html in Chrome, Edge or Opera.
3. Open the “ভর্তি আবেদন” link to see the separate admission form.

HOW TO CONNECT THE ADMISSION FORM TO A PRIVATE GOOGLE SHEET
-----------------------------------------------------------
IMPORTANT PRIVACY NOTE:
The form includes optional student/parent identity-number fields and dates of birth.
Collect these only when they are genuinely required for admission. Do not request ID
photos/scans through this simple form. Keep the destination spreadsheet private, limit
access to the responsible administrator, and delete records when they are no longer
needed. Do not publish the Sheet or its link on the website.

A. Create a private Sheet
1. Sign in to the Google account controlled by the center.
2. Create a new Google Spreadsheet named “ALIF IT CENTER - Admission Records”.
3. Keep its sharing setting restricted. Do not enable “Anyone with the link”.
4. Copy the spreadsheet ID from its URL. It is the long ID between /d/ and /edit.

B. Add the Apps Script
1. In the spreadsheet, open Extensions > Apps Script.
2. Remove the sample code and paste all the contents of Code.gs from this folder.
3. Open Project Settings (gear icon) > Script Properties > Add script property.
4. Property: SPREADSHEET_ID
   Value: paste the spreadsheet ID copied in step A.
5. Save the project.

C. Deploy as a Web App
1. Click Deploy > New deployment.
2. Select type: Web app.
3. Execute as: Me (the spreadsheet owner).
4. Who has access: Anyone. This makes the form endpoint public, so use it only with
   the private Sheet and review submissions regularly. A public endpoint can receive spam.
5. Click Deploy and authorize the requested Google permissions.
6. Copy the Web App URL ending in /exec.

D. Connect the website
1. Open admission.js in a text editor.
2. Find FORM_ENDPOINT near the top.
3. Replace PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE with the copied /exec URL,
   keeping the URL inside the quotation marks.
4. Save admission.js and upload all website files together to your hosting service.
5. Submit one test application using dummy/test details, then check the private Sheet.
   Delete the test row afterwards. Do not test with real NID numbers.

IMPORTANT
---------
- The browser uses a no-cors request, so the page cannot read Google's response.
  The success message means the request was dispatched, not that a staff member verified it.
  Always check the private Sheet and contact the applicant to confirm receipt.
- If you edit the Apps Script after deployment, deploy a new version from Manage deployments.
- Contact phone: 01610003276 (click-to-call link added in the Contact section).
- bKash payment number: 01609-189836 (shown on the homepage and admission page).
- Before making a payment, applicants should call to confirm the fee and payment type; do not assume Send Money or Merchant Payment.
- Official government services, application approvals, tax filing and identity services
  remain subject to the relevant authority's requirements and decisions.
