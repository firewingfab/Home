# Join Club → Google Sheets Setup

This site is static HTML, so the form needs a server endpoint to store submissions. The simplest option is a **Google Apps Script Web App** that appends each submission into a Google Sheet.

## 1) Create a Google Sheet

Create a sheet named `Join Club` with headers like:

- Timestamp
- Name
- Email
- Phone
- College/School
- Location
- Pincode
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

function doGet() {
  return ContentService
    .createTextOutput("FirewingFab Join Club endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const sheet = getSheet_();

  const p = (e && e.parameter) ? e.parameter : {};

  const name = (p.name || "").toString().trim();
  const email = (p.email || "").toString().trim();
  const phone = (p.phone || "").toString().trim();
  const institute = (p.institute || "").toString().trim();
  const location = (p.location || "").toString().trim();
  const pincode = (p.pincode || "").toString().trim();

  // Honeypot (spam)
  const website = (p.website || "").toString().trim();
  if (website) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    name,
    email,
    phone,
    institute,
    location,
    pincode,
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

## Notes / Alternatives

- **Google Forms**: quickest, no code—create a Google Form and link/iframe it.
- **Form services**: Formspree / Getform / Basin etc. (paid tiers often, but easy).
- If you want *better error reporting* on the website, you’ll need CORS-friendly endpoints (a small backend or a form provider).

