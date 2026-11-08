ALIF ONLINE POINT — ফর্ম সেটআপ নির্দেশিকা
========================================

এই প্যাকেজে যা আছে
------------------
index.html       ওয়েবসাইটের মূল পেজ; আবেদন ফর্ম যুক্ত আছে
style.css        ওয়েবসাইট ও আবেদন ফর্মের ডিজাইন
script.js        আবেদন জমা ও Google Payment Form বাটনের কাজ
config.js        Google Apps Script ও Payment Google Form লিংক বসানোর জায়গা
Code.gs          আবেদন জমা হলে Google Sheet-এ সংরক্ষণের কোড
assets/          লোগো ও Graphical Cover

১) HTML আবেদন ফর্মের ডেটা Google Sheet-এ নেওয়া
------------------------------------------------
ক) Google Drive খুলে New > Google Sheets দিয়ে একটি নতুন Sheet তৈরি করুন।
খ) Sheet-এর ভেতর Extensions > Apps Script-এ ক্লিক করুন।
গ) Apps Script-এর Code.gs-এ থাকা পুরোনো লেখা মুছে এই প্যাকেজের Code.gs ফাইলের সম্পূর্ণ কোড কপি করে পেস্ট করুন।
ঘ) Save করুন।
ঙ) Deploy > New deployment > Select type (gear) > Web app নির্বাচন করুন।
চ) Execute as: Me নির্বাচন করুন।
ছ) Who has access: Anyone নির্বাচন করুন। (প্রতিষ্ঠানের নীতিমালা অনুমতি না দিলে এই ধাপ সম্ভব নাও হতে পারে।)
জ) Deploy চাপুন এবং প্রয়োজন হলে Google অনুমতি সম্পন্ন করুন।
ঝ) যে Web app URL পাবেন, সেটি কপি করুন। URL সাধারণত https://script.google.com/macros/s/.../exec দিয়ে শুরু হয়।

২) config.js-এ Apps Script URL বসানো
-----------------------------------
config.js ফাইল Notepad-এ খুলুন।
applicationScriptUrl: "" এর কোটেশনের মধ্যে Apps Script Web app URL পেস্ট করুন।
উদাহরণ:
applicationScriptUrl: "https://script.google.com/macros/s/আপনার_ID/exec"
ফাইল Save করুন।

৩) শুধু পেমেন্টের জন্য Google Form তৈরি
--------------------------------------
ক) forms.google.com খুলে Blank Form তৈরি করুন।
খ) ফর্মের নাম দিন: Alif Online Point — Payment Information
গ) নিচের প্রশ্নগুলো যোগ করুন:
   1. গ্রাহকের নাম — Short answer — Required
   2. মোবাইল নম্বর — Short answer — Required
   3. কোন সেবার জন্য পেমেন্ট — Dropdown — Required
   4. পেমেন্ট মাধ্যম — Multiple choice (bKash / Nagad / Bank / Other) — Required
   5. পেমেন্টের পরিমাণ — Short answer — Required
   6. Transaction ID — Short answer — Required
   7. পেমেন্টের তারিখ — Date — Required
   8. অতিরিক্ত তথ্য — Paragraph — Optional
ঘ) Send/Publish থেকে responder link কপি করুন।
ঙ) config.js-এ paymentGoogleFormUrl: "" এর কোটেশনের মধ্যে লিংকটি বসান।
চ) Save করুন।

৪) GitHub Pages-এ আপডেট
-----------------------
পুরো Alif-Online-Point-Website ফোল্ডারের ফাইলগুলো আপনার GitHub repository-র root-এ আপলোড করুন।
index.html, style.css, script.js, config.js, Code.gs, README_BN.txt এবং assets ফোল্ডার যেন একইভাবে থাকে।
পুরোনো ফাইল replace/overwrite করে Commit changes দিন।

৫) পরীক্ষা
---------
ওয়েবসাইট খুলে Application form-এ নিজের একটি পরীক্ষামূলক আবেদন দিন। Google Sheet-এর 'আবেদনসমূহ' ট্যাবে নতুন row এসেছে কি না দেখুন।
পেমেন্ট বাটনে ক্লিক করে Google Payment Form ঠিকমতো খুলছে কি না পরীক্ষা করুন।

গুরুত্বপূর্ণ নিরাপত্তা
--------------------
- এই ফর্মে পাসওয়ার্ড, OTP, bKash/Nagad PIN, ব্যাংক PIN বা অপ্রয়োজনীয় NID/জন্মনিবন্ধন নম্বর চাইবেন না।
- Payment Google Form-এ Transaction ID ও প্রয়োজনীয় সাধারণ তথ্য নিন; OTP/PIN কখনো চাইবেন না।
- Apps Script Web App URL এবং Google Form responder URL ছাড়া কোনো গোপন কী বা পাসওয়ার্ড ওয়েবসাইটে রাখবেন না।
- ফর্মের তথ্য শুধু প্রয়োজনীয় কাজে ব্যবহার করুন এবং Google Sheet-এর প্রবেশাধিকার সীমিত রাখুন।

নোট
---
GitHub Pages static hosting। তাই HTML/CSS একা ডেটা সংরক্ষণ করতে পারে না। আবেদন ফর্মের তথ্য Google Sheet-এ পাঠাতে Code.gs ডেপ্লয় করে তার URL config.js-এ বসানো বাধ্যতামূলক। Google Form URL না বসানো পর্যন্ত পেমেন্ট বাটন নিষ্ক্রিয় থাকবে।
