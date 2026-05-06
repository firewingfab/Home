import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "institute",
  "location",
  "pincode",
  "category",
  "subcategory",
  "note",
  "dream"
] as const;

type Submission = {
  name: string;
  phone: string;
  email: string;
  institute: string;
  location: string;
  pincode: string;
  username: string;
  category: string;
  subcategory: string;
  note: string;
  dream: string;
  displayOnHome: boolean;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const asText = (value: FormDataEntryValue | null) => (value ?? "").toString().trim();

const toSubmission = (formData: FormData): Submission => ({
  name: asText(formData.get("name")),
  phone: asText(formData.get("phone")),
  email: asText(formData.get("email")),
  institute: asText(formData.get("institute")),
  location: asText(formData.get("location")),
  pincode: asText(formData.get("pincode")),
  username: asText(formData.get("username")),
  category: asText(formData.get("category")),
  subcategory: asText(formData.get("subcategory")),
  note: asText(formData.get("note")),
  dream: asText(formData.get("dream")),
  displayOnHome: asText(formData.get("display_on_home")) === "yes"
});

const validateSubmission = (submission: Submission) => {
  for (const field of REQUIRED_FIELDS) {
    if (!submission[field]) {
      return `Missing required field: ${field}`;
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return "Please provide a valid email address.";
  }

  if (submission.displayOnHome && !submission.username) {
    return "Please enter your username to display in the Home page Dreamers section.";
  }

  return null;
};

const buildEmailHtml = (submission: Submission, submittedAt: string) => {
  const row = (label: string, value: string) => `
    <tr class="field-row">
      <td class="field-label">${escapeHtml(label)}</td>
      <td class="field-value">${escapeHtml(value || "-")}</td>
    </tr>
  `;

  return `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #f1f5f9;
            font-family: Arial, Helvetica, sans-serif;
            color: #0f172a;
          }
          .email-shell {
            width: 100%;
            padding: 20px 12px;
            box-sizing: border-box;
            background: #f1f5f9;
          }
          .email-card {
            max-width: 760px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
          }
          .email-header {
            padding: 20px 24px;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #ffffff;
          }
          .email-header h1 {
            margin: 0;
            font-size: 22px;
            line-height: 1.3;
          }
          .email-header p {
            margin: 8px 0 0;
            color: #cbd5e1;
            font-size: 14px;
          }
          .email-content {
            padding: 20px 24px 24px;
          }
          .section-title {
            margin: 0 0 12px;
            font-size: 16px;
            line-height: 1.4;
            color: #0f172a;
          }
          .section-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .field-label {
            padding: 10px 12px;
            border: 1px solid #e2e8f0;
            background: #f8fafc;
            font-weight: 700;
            color: #0f172a;
            width: 220px;
            vertical-align: top;
          }
          .field-value {
            padding: 10px 12px;
            border: 1px solid #e2e8f0;
            color: #0f172a;
            white-space: pre-wrap;
            word-break: break-word;
            vertical-align: top;
          }
          @media only screen and (max-width: 640px) {
            .email-shell {
              padding: 12px 8px;
            }
            .email-header,
            .email-content {
              padding-left: 14px !important;
              padding-right: 14px !important;
            }
            .email-header h1 {
              font-size: 18px !important;
            }
            .section-title {
              font-size: 15px !important;
            }
            .field-row,
            .field-label,
            .field-value {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box;
            }
            .field-label {
              border-bottom: none !important;
              border-radius: 8px 8px 0 0;
              padding-bottom: 8px !important;
            }
            .field-value {
              border-top: none !important;
              border-radius: 0 0 8px 8px;
              margin-bottom: 10px;
              padding-top: 8px !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-shell">
          <div class="email-card">
            <div class="email-header">
              <h1>New FirewingFab Join Form Submission</h1>
              <p>Submitted at: ${escapeHtml(submittedAt)}</p>
            </div>

            <div class="email-content">
              <h2 class="section-title">Contact Details</h2>
              <table class="section-table" role="presentation" cellpadding="0" cellspacing="0" border="0">
                ${row("Name", submission.name)}
                ${row("Phone", submission.phone)}
                ${row("Email", submission.email)}
                ${row("College / School", submission.institute)}
                ${row("Location", submission.location)}
                ${row("Pincode", submission.pincode)}
              </table>

              <h2 class="section-title">Builder Profile</h2>
              <table class="section-table" role="presentation" cellpadding="0" cellspacing="0" border="0">
                ${row("Username", submission.username || "-")}
                ${row("Category", submission.category)}
                ${row("Subcategory", submission.subcategory)}
                ${row("Display on Home", submission.displayOnHome ? "Yes" : "No")}
              </table>

              <h2 class="section-title">Dream / Vision Details</h2>
              <table class="section-table" role="presentation" cellpadding="0" cellspacing="0" border="0">
                ${row("Short Note", submission.note)}
                ${row("Dream / Vision", submission.dream)}
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const buildEmailText = (submission: Submission, submittedAt: string) => `
New FirewingFab Join Form Submission
Submitted at: ${submittedAt}

Contact Details
- Name: ${submission.name}
- Phone: ${submission.phone}
- Email: ${submission.email}
- College / School: ${submission.institute}
- Location: ${submission.location}
- Pincode: ${submission.pincode}

Builder Profile
- Username: ${submission.username || "-"}
- Category: ${submission.category}
- Subcategory: ${submission.subcategory}
- Display on Home: ${submission.displayOnHome ? "Yes" : "No"}

Dream / Vision Details
- Short Note: ${submission.note}
- Dream / Vision: ${submission.dream}
`;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_APIKEY;
  const senderEmail = process.env.SENDER_EMAIL;
  const receiverEmail = process.env.RECEIVER_ADDRESS;

  if (!apiKey || !senderEmail || !receiverEmail) {
    return NextResponse.json(
      { message: "Email service is not configured. Please contact us." },
      { status: 500 }
    );
  }

  const formData = await request.formData();

  // Honeypot anti-spam field
  if (asText(formData.get("website"))) {
    return NextResponse.json({ message: "Ignored." }, { status: 200 });
  }

  const submission = toSubmission(formData);
  const validationError = validateSubmission(submission);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Asia/Kolkata"
  }).format(new Date());

  const payload = {
    from: `FirewingFab Join Form <${senderEmail}>`,
    to: [receiverEmail],
    subject: `New Join Submission: ${submission.name} (${submission.category})`,
    reply_to: submission.email,
    html: buildEmailHtml(submission, submittedAt),
    text: buildEmailText(submission, submittedAt)
  };

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend API error:", errorText);
    return NextResponse.json(
      { message: "Failed to send email. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ message: "Submitted successfully." }, { status: 200 });
}
