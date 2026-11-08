ALIF ONLINE POINT — নতুন ওয়েবসাইট সেটআপ
======================================

ফাইলসমূহ
--------
index.html   : ওয়েবসাইটের মূল পেজ
style.css    : ডিজাইন ও মোবাইল রেসপন্সিভ স্টাইল
script.js    : মেনু, আবেদন জমা, কপি বাটন ও পেমেন্ট লিংক
config.js    : Google Apps Script ও Google Forms লিংক সেটিং
logo.svg     : ওয়েবসাইটের লোগো
Code.gs      : Google Sheets-এ আবেদন সংরক্ষণের Apps Script

কভার ছবি
--------
এই নতুন সাইটে কভার ছবি ব্যবহার করা হয়নি। Hero অংশটি HTML/CSS দিয়ে তৈরি।

GitHub-এ আপলোড
--------------
১) ZIP Extract করুন।
২) Extract করা ফোল্ডারের ভেতরের ফাইলগুলো GitHub repository-এর মূল জায়গায় (root) আপলোড করুন।
৩) ফাইলগুলো একই জায়গায় রাখবেন: index.html, style.css, script.js, config.js, logo.svg।
৪) পুরোনো ফাইল replace করতে বললে Replace/Commit changes দিন।
৫) GitHub Pages থেকে সাইট আপডেট হতে কয়েক মিনিট লাগতে পারে। এরপর Ctrl+F5 চাপুন।

আবেদন ফর্ম — Google Sheets সংযোগ
-------------------------------
১) যে Google Sheet-এ আবেদন রাখতে চান, সেটি খুলুন।
২) Extensions > Apps Script নির্বাচন করুন।
৩) Code.gs-এর পুরোনো কোড মুছে এই ZIP-এর Code.gs-এর সম্পূর্ণ কোড paste করুন।
৪) Save করুন।
৫) Deploy > Manage deployments > Edit (পেন্সিল) > Version: New version > Deploy করুন।
৬) Web app access আপনার প্রয়োজন অনুযায়ী সেট করুন। সাইট থেকে ফর্ম কাজ করতে সাধারণত Web app-টি Anyone access-এ deploy করতে হয়; এতে লিংক জানা যে কেউ আবেদন পাঠাতে পারে।
৭) Web app URL আগেরটাই থাকলে config.js-এ থাকা APPLICATION_ENDPOINT ঠিক আছে কি না মিলিয়ে নিন। URL বদলে গেলে নতুন /exec URL config.js-এ বসান।
৮) প্রথমবার Google অনুমতি চাইলে আপনার নিজের Google অ্যাকাউন্ট দিয়ে প্রয়োজনীয় অনুমতি দিন।

গুরুত্বপূর্ণ: ওয়েবসাইটটি browser no-cors request ব্যবহার করে। তাই ওয়েবপেজ সার্ভারের JSON উত্তর পড়ে Google Sheet-এ row তৈরি হয়েছে কি না তা সরাসরি নিশ্চিত করতে পারে না। প্রথমে নিজের একটি পরীক্ষামূলক আবেদন জমা দিয়ে Google Sheet-এর 'আবেদনসমূহ' tab-এ row এসেছে কি না পরীক্ষা করুন।

বিকাশ পেমেন্ট ফর্ম
------------------
১) আপনার Google Forms-এ পেমেন্ট তথ্য সংগ্রহের ফর্ম তৈরি করুন।
২) Google Form-এর Send > Link থেকে public responder link কপি করুন।
৩) config.js খুলে PAYMENT_FORM_URL-এর ফাঁকা quotation marks-এর মধ্যে সেই লিংক বসান। উদাহরণ:
   PAYMENT_FORM_URL: "https://docs.google.com/forms/d/e/FORM_ID/viewform"
৪) Save করে GitHub-এ config.js আপডেট করুন। এরপর পেমেন্ট তথ্য জমা দিন বাটন চালু হবে।

প্রকাশিত নম্বর
-------------
দোকানের ফোন: 01610-003276
বিকাশ নম্বর: 01609189836

নিরাপত্তা নোট
-------------
- এই ফর্মে OTP, PIN, পাসওয়ার্ড বা ব্যাংক/কার্ডের গোপন তথ্য চাওয়া হয় না।
- এই সংস্করণে ফাইল/ছবি সরাসরি আপলোডের ব্যবস্থা নেই। প্রয়োজনীয় কাগজপত্র কীভাবে পাঠাতে হবে তা দোকানের সঙ্গে কথা বলে ঠিক করুন।
- আবেদনকারীর ব্যক্তিগত তথ্য Google Sheet-এ সংরক্ষিত হবে। Sheet access শুধু প্রয়োজনীয় বিশ্বস্ত ব্যক্তিদের মধ্যে সীমিত রাখুন।
- Google Apps Script public web app হলে অনাকাঙ্ক্ষিত আবেদন আসতে পারে। নিয়মিত Sheet পরীক্ষা করুন এবং প্রয়োজন হলে spam protection আরও শক্ত করুন।
