(function () {
  'use strict';
  const config = window.ALIF_CONFIG || {};
  const paymentButton = document.getElementById('paymentGoogleFormButton');
  const paymentNote = document.getElementById('paymentSetupNote');
  const paymentUrl = String(config.paymentGoogleFormUrl || '').trim();

  if (paymentButton && /^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/i.test(paymentUrl)) {
    paymentButton.href = paymentUrl;
    paymentButton.classList.remove('is-disabled');
    paymentButton.removeAttribute('aria-disabled');
    if (paymentNote) paymentNote.textContent = 'পেমেন্ট ফর্ম প্রস্তুত। বাটনে ক্লিক করে তথ্য জমা দিন।';
  } else if (paymentButton) {
    paymentButton.addEventListener('click', function (event) { event.preventDefault(); });
  }

  const form = document.getElementById('applicationForm');
  const status = document.getElementById('applicationStatus');
  const submit = document.getElementById('applicationSubmit');
  const endpoint = String(config.applicationScriptUrl || '').trim();

  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (String(data.get('website') || '').trim()) return; // Honeypot anti-spam field.

      const mobile = String(data.get('mobile') || '').trim();
      if (!/^01[0-9]{9}$/.test(mobile)) {
        status.textContent = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।';
        status.className = 'form-status error';
        return;
      }
      if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(endpoint)) {
        status.textContent = 'আবেদন ফর্মটি তৈরি আছে, তবে জমা নেওয়ার সংযোগ এখনো সেট করা হয়নি। README_BN.txt-এর নির্দেশনা অনুসরণ করে Google Apps Script URL config.js-এ বসান।';
        status.className = 'form-status warning';
        return;
      }

      submit.disabled = true;
      submit.textContent = 'জমা দেওয়া হচ্ছে…';
      status.textContent = 'আপনার আবেদন পাঠানো হচ্ছে।';
      status.className = 'form-status';

      const payload = new URLSearchParams();
      ['name', 'mobile', 'service', 'details', 'contactTime', 'consent'].forEach(function (key) {
        payload.set(key, String(data.get(key) || ''));
      });
      payload.set('source', 'Alif Online Point Website');

      try {
        // Apps Script accepts form-urlencoded POSTs. no-cors avoids browser CORS blocking;
        // the browser cannot read the server response, so the sheet should be checked.
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: payload.toString()
        });
        status.textContent = 'আবেদন পাঠানোর অনুরোধ সম্পন্ন হয়েছে। প্রয়োজনে Alif Online Point-এর সঙ্গে যোগাযোগ করুন।';
        status.className = 'form-status success';
        form.reset();
      } catch (error) {
        status.textContent = 'আবেদন পাঠানো যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।';
        status.className = 'form-status error';
      } finally {
        submit.disabled = false;
        submit.innerHTML = 'আবেদন জমা দিন <span>→</span>';
      }
    });
  }

  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      });
    });
  }

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 450);
    }, { passive: true });
  }
})();
