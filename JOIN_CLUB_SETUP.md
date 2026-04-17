# Join Club → Google Sheets Setup

This site is static HTML, so the form needs a server endpoint to store submissions. The simplest option is a **Google Apps Script Web App** that appends each submission into a Google Sheet.

## 1) Create a Google Sheet

Create a sheet named `Join Club` with headers like:

- Timestamp
- Name
- Username
- Email
- Phone
- College/School
- Location
- Pincode
- Category
- Subcategory
- Dream/Vision
- Note
- Display on Home
- Source

## 2) Create the Apps Script

1. In the sheet: **Extensions → Apps Script**
2. Replace the code with this:

```js
const SHEET_NAME = "Join Club";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  return sheet;
}

function clean_(v) {
  return (v || "").toString().trim();
}

function isTruthy_(v) {
  const s = clean_(v).toLowerCase();
  return s === "yes" || s === "true" || s === "1" || s === "on";
}

function safeCallback_(cb) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(cb) ? cb : "";
}

function outputJson_(e, obj) {
  const p = (e && e.parameter) ? e.parameter : {};
  const cb = safeCallback_(clean_(p.callback));
  const text = JSON.stringify(obj);

  if (cb) {
    return ContentService
      .createTextOutput(`${cb}(${text});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(text)
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const mode = clean_(p.mode);

  if (mode === "dreamers") {
    return getDreamers_(e);
  }

  return ContentService
    .createTextOutput("FirewingFab Join Club endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getDreamers_(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const limitRaw = parseInt(clean_(p.limit), 10);
  const limit = Math.max(1, Math.min(30, isNaN(limitRaw) ? 9 : limitRaw));

  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (!values || values.length < 2) {
    return outputJson_(e, { ok: true, dreamers: [] });
  }

  const headers = values[0].map(h => clean_(h).toLowerCase());
  const col = (candidates) => {
    for (let i = 0; i < candidates.length; i++) {
      const idx = headers.indexOf(candidates[i]);
      if (idx >= 0) return idx;
    }
    return -1;
  };

  const idxName = col(["name"]);
  const idxUsername = col(["username"]);
  const idxCategory = col(["category"]);
  const idxSubcategory = col(["subcategory"]);
  const idxDream = col(["dream/vision", "dream", "vision"]);
  const idxNote = col(["note"]);
  const idxDisplay = col(["display on home", "display_on_home", "display"]);

  const dreamers = [];
  for (let r = values.length - 1; r >= 1 && dreamers.length < limit; r--) {
    const row = values[r];

    const display = idxDisplay >= 0 ? row[idxDisplay] : "";
    if (!isTruthy_(display)) continue;

    const dream = idxDream >= 0 ? clean_(row[idxDream]) : "";
    if (!dream) continue;

    dreamers.push({
      name: idxName >= 0 ? clean_(row[idxName]) : "",
      username: idxUsername >= 0 ? clean_(row[idxUsername]) : "",
      category: idxCategory >= 0 ? clean_(row[idxCategory]) : "",
      subcategory: idxSubcategory >= 0 ? clean_(row[idxSubcategory]) : "",
      dream,
      note: idxNote >= 0 ? clean_(row[idxNote]) : ""
    });
  }

  return outputJson_(e, { ok: true, dreamers });
}

function doPost(e) {
  const sheet = getSheet_();

  const p = (e && e.parameter) ? e.parameter : {};

  const name = clean_(p.name);
  const username = clean_(p.username);
  const email = clean_(p.email);
  const phone = clean_(p.phone);
  const institute = clean_(p.institute);
  const location = clean_(p.location);
  const pincode = clean_(p.pincode);
  const category = clean_(p.category);
  const subcategory = clean_(p.subcategory);
  const dream = clean_(p.dream);
  const note = clean_(p.note);
  const displayOnHome = isTruthy_(p.display_on_home) ? "Yes" : "No";

  // Honeypot (spam)
  const website = clean_(p.website);
  if (website) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    name,
    username,
    email,
    phone,
    institute,
    location,
    pincode,
    category,
    subcategory,
    dream,
    note,
    displayOnHome,
    "firewingfab-home-join.html"
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3) Deploy as a Web App

1. Click **Deploy → New deployment**
2. Select **Web app**
3. **Execute as**: Me
4. **Who has access**: Anyone
5. Deploy and copy the **Web app URL** (ends with `/exec`)

## 4) Connect the website to the endpoint

Edit `join-config.js` and set the URL:

```js
window.JOIN_CLUB_ENDPOINT = "https://script.google.com/macros/s/XXXXX/exec";
```

## 5) Home page “Dreamers” section

The Home page loads public Dreamers using the same endpoint via JSONP:

- Only rows with **Display on Home** = `Yes` are shown
- Only **Name, Username, Category, Subcategory, Dream/Vision, Note** are exposed publicly (no email/phone)

## Notes / Alternatives

- **Google Forms**: quickest, no code—create a Google Form and link/iframe it.
- **Form services**: Formspree / Getform / Basin etc. (paid tiers often, but easy).
- If you want *better error reporting* on the website, you’ll need CORS-friendly endpoints (a small backend or a form provider).
