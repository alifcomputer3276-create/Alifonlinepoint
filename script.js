(() => {
  'use strict';

  const config = window.ALIF_CONFIG || {};
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-pick-service]').forEach(link => {
    link.addEventListener('click', () => {
      const select = document.getElementById('serviceSelect');
      if (!select) return;
      const requested = link.dataset.pickService;
      const option = [...select.options].find(item => item.textContent.includes(requested));
      if (option) select.value = option.value || option.textContent;
    });
  });

  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      const original = button.innerHTML;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'কপি হয়েছে ✓';
      } catch (_) {
        const input = document.createElement('textarea');
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
        button.textContent = 'কপি হয়েছে ✓';
      }
      window.setTimeout(() => { button.innerHTML = original; }, 1800);
    });
  });

  const payLink = document.getElementById('paymentFormLink');
  const payHint = document.getElementById('paymentLinkHint');
  if (payLink) {
    if (config.PAYMENT_FORM_URL && /^https:\/\//i.test(config.PAYMENT_FORM_URL)) {
      payLink.href = config.PAYMENT_FORM_URL;
      if (payHint) payHint.textContent = 'পেমেন্টের তথ্য জমা দিতে Google Form খুলুন।';
    } else {
      payLink.classList.add('is-disabled');
      payLink.addEventListener('click', event => event.preventDefault());
    }
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('applicationForm');
  const message = document.getElementById('formMessage');
  const submitButton = document.getElementById('submitButton');

  if (form) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (!config.APPLICATION_ENDPOINT || !/^https:\/\//i.test(config.APPLICATION_ENDPOINT)) {
        showMessage('ফর্মের সার্ভার লিংক সেট করা নেই। config.js পরীক্ষা করুন।', 'error');
        return;
      }

      const formData = new FormData(form);
      const phone = String(formData.get('mobile') || '').trim();
      if (!/^01[0-9]{9}$/.test(phone)) {
        showMessage('সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর লিখুন।', 'error');
        return;
      }

      submitButton.disabled = true;
      submitButton.innerHTML = 'পাঠানো হচ্ছে…';
      showMessage('আপনার আবেদন পাঠানো হচ্ছে। অনুগ্রহ করে পেজটি বন্ধ করবেন না।', 'info');

      const payload = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') payload.append(key, value);
      }
      if (!payload.has('consent')) payload.set('consent', '');

      try {
        // Apps Script web apps commonly require no-cors from a static GitHub Pages site.
        // The browser will not expose the server response in no-cors mode, so we report
        // that the request was sent, not that the spreadsheet row was independently verified.
        await fetch(config.APPLICATION_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          redirect: 'follow',
          body: payload
        });
        showMessage('আবেদনের তথ্য পাঠানোর অনুরোধ করা হয়েছে। নিশ্চিতকরণের জন্য প্রয়োজনে 01610-003276 নম্বরে যোগাযোগ করুন।', 'success');
        form.reset();
      } catch (error) {
        showMessage('এই মুহূর্তে আবেদন পাঠানো যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন অথবা 01610-003276 নম্বরে কল করুন।', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'আবেদন জমা দিন <span>→</span>';
      }
    });
  }

  function showMessage(text, type) {
    if (!message) return;
    message.textContent = text;
    message.className = `form-message ${type}`;
  }
})();
