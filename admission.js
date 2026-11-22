/* Paste your deployed Google Apps Script Web App URL below after setup. */
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbypa4IPBd1-5f3rGYGYTRxlfeQmRyahIgVZ8p7i3kMDhvkFRy9pN5FWKtt40eRmYZ1Z-Q/exec';

const form = document.getElementById('admissionForm');
const statusBox = document.getElementById('formStatus');

// Allow links such as admission.html?course=Data%20Analysis to preselect a course.
const requestedCourse = new URLSearchParams(window.location.search).get('course');
if (requestedCourse) {
  const courseSelect = document.getElementById('course');
  const matchingOption = [...courseSelect.options].find(option =>
    option.text.trim().toLowerCase() === requestedCourse.trim().toLowerCase()
  );
  if (matchingOption) courseSelect.value = matchingOption.value;
}

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `form-status ${type}`;
  statusBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusBox.className = 'form-status';

    if (!form.reportValidity()) return;
    if (FORM_ENDPOINT.includes('PASTE_YOUR_')) {
      showStatus('ফর্মের নকশা প্রস্তুত, কিন্তু অনলাইন জমা এখনো চালু হয়নি। README ফাইলের নির্দেশনা অনুযায়ী Apps Script URL যুক্ত করুন।', 'error');
      return;
    }

    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'জমা দেওয়ার অনুরোধ পাঠানো হচ্ছে…';

    const data = Object.fromEntries(new FormData(form).entries());
    data.submitted_at_local = new Date().toLocaleString('bn-BD');
    data.form_source = 'ALIF IT CENTER Website';

    try {
      // text/plain keeps the request CORS-simple for a Google Apps Script web app.
      // The browser cannot read the cross-origin response in no-cors mode, so this
      // message confirms dispatch only; the center must verify the private Sheet.
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      });
      showStatus('আবেদনের তথ্য পাঠানোর অনুরোধ করা হয়েছে। এটি চূড়ান্তভাবে জমা হয়েছে কি না, ALIF IT CENTER-এর সঙ্গে যোগাযোগ করে নিশ্চিত হোন।', 'success');
      form.reset();
    } catch (error) {
      showStatus('এই মুহূর্তে আবেদন পাঠানো যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন অথবা সরাসরি প্রতিষ্ঠানে যোগাযোগ করুন।', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'আবেদন জমা দিন <span>→</span>';
    }
  });
}
