/*
  ALIF ONLINE POINT — WEBSITE SETTINGS
  Update the values below when your details are ready.
  Google Forms URL: open the form in Google Forms, press Send, copy the link.
*/
const SITE_SETTINGS = {
  phone: "",                 // Example: 01XXXXXXXXX (use your real business number)
  whatsapp: "",              // Example: 8801XXXXXXXXX (country code, no + sign)
  bkash: "",                 // Your verified bKash payment number
  nagad: "",                 // Your verified Nagad payment number
  applicationFormUrl: "",    // Your Google Form link for online applications
  paymentFormUrl: ""         // Your Google Form link for payment/transaction submissions
};

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3600);
}

function setText(selector, value, fallback) {
  document.querySelectorAll(selector).forEach((el) => { el.textContent = value || fallback; });
}

setText('[data-payment="bkash"]', SITE_SETTINGS.bkash, 'নম্বর যোগ করা হয়নি');
setText('[data-payment="nagad"]', SITE_SETTINGS.nagad, 'নম্বর যোগ করা হয়নি');
setText('[data-contact="phone"]', SITE_SETTINGS.phone, 'যোগাযোগ নম্বর যোগ করা হয়নি');

const phoneContact = document.getElementById('phoneContact');
if (phoneContact && SITE_SETTINGS.phone) {
  const phone = phoneContact.querySelector('[data-contact="phone"]');
  if (phone) {
    const link = document.createElement('a');
    link.href = `tel:${SITE_SETTINGS.phone.replace(/[^+\d]/g, '')}`;
    link.textContent = SITE_SETTINGS.phone;
    link.style.color = 'inherit';
    phone.replaceWith(link);
  }
}

const formLinks = {
  application: SITE_SETTINGS.applicationFormUrl,
  payment: SITE_SETTINGS.paymentFormUrl
};
document.querySelectorAll('[data-form-link]').forEach((link) => {
  const type = link.getAttribute('data-form-link');
  const url = formLinks[type];
  if (url && /^https:\/\//i.test(url)) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.href = '#';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast(type === 'application'
        ? 'অনলাইন আবেদন চালু করতে script.js ফাইলে Google Forms লিংক যুক্ত করুন।'
        : 'পেমেন্ট তথ্য জমা চালু করতে script.js ফাইলে Google Forms লিংক যুক্ত করুন।');
    });
  }
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 450);
}, { passive: true });
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const year = document.getElementById('currentYear');
if (year) year.textContent = new Date().getFullYear();
