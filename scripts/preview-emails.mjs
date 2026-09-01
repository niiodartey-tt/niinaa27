// Run with: node scripts/preview-emails.mjs
// Outputs three HTML files to email-previews/ for browser inspection.
// No Supabase, Resend, or real submission required.

import { writeFileSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

// ── Inline the template functions (mirrors lib/email-templates.ts) ────────────
// Duplicated here so this script runs with plain Node — no TypeScript tooling needed.

function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const COUPLE_EMAIL = "niinaathompson@outlook.com"

function emailShell(siteUrl, body) {
  const logoUrl = siteUrl ? `${siteUrl}/logo-tl.png` : ""
  const logoHtml = logoUrl
    ? `<img src="${logoUrl}" alt="Thomas and Leanne" width="96" height="96"
         style="display:block;margin:0 auto 20px;width:96px;height:auto;" />`
    : ""

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Thomas &amp; Leanne</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F0DCD0;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background-color:#F0DCD0;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:560px;background-color:#FBF9F4;">

          <!-- ── Header ── -->
          <tr>
            <td align="center" style="padding:40px 40px 28px;background-color:#FBF9F4;">
              ${logoHtml}
              <p style="margin:0 0 24px;font-family:Georgia,serif;font-style:italic;
                         font-size:28px;color:#3A2A22;line-height:1.2;">
                Thomas &amp; Leanne
              </p>
              <div style="height:1px;background-color:#D4AF6A;"></div>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="padding:32px 40px 40px;color:#3A2A22;
                        font-family:'Cormorant Garamond',Georgia,serif;
                        font-size:18px;line-height:1.75;">
              ${body}
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding:0 40px 36px;text-align:center;">
              <div style="height:1px;background-color:#D4AF6A;margin-bottom:20px;"></div>
              <p style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;
                          font-size:14px;color:#8A7267;">
                2 January 2027 &middot; Skybox Event Centre, Lashibi, Accra
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildGuestEmail(name, attending, siteUrl) {
  const n = esc(name)
  const contactLink = `<a href="mailto:${COUPLE_EMAIL}"
    style="color:#D4AF6A;text-decoration:underline;">${COUPLE_EMAIL}</a>`

  const body = attending
    ? `<p style="margin:0 0 20px;">Dear ${n},</p>
       <p style="margin:0 0 24px;">
         Thank you for responding. We are so glad you will be joining us.
       </p>
       <table cellpadding="0" cellspacing="0" role="presentation"
              style="width:100%;background-color:#F0DCD0;margin-bottom:28px;">
         <tr>
           <td style="padding:20px 24px;">
             <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:12px;
                        color:#8A7267;text-transform:uppercase;letter-spacing:0.08em;">
               Date
             </p>
             <p style="margin:0 0 16px;font-family:'Cormorant Garamond',Georgia,serif;
                        font-size:18px;font-weight:600;color:#3A2A22;">
               Saturday, 2 January 2027
             </p>
             <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:12px;
                        color:#8A7267;text-transform:uppercase;letter-spacing:0.08em;">
               Venue
             </p>
             <p style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;
                        font-size:18px;font-weight:600;color:#3A2A22;">
               Skybox Event Centre, Lashibi, Accra, Ghana
             </p>
             <a href="https://maps.app.goo.gl/AG2VCBrt5tz5nQa1A"
                style="font-family:'Cormorant Garamond',Georgia,serif;font-size:14px;
                       color:#D4AF6A;text-decoration:underline;display:inline-block;margin-top:8px;">
               Get directions →
             </a>
           </td>
         </tr>
       </table>
       <p style="margin:0 0 28px;">
         We look forward to celebrating with you. If anything changes before
         1 December 2026, please reach us at ${contactLink}.
       </p>
       <p style="margin:0;font-style:italic;color:#8A7267;">
         With love,<br />Thomas &amp; Leanne
       </p>`
    : `<p style="margin:0 0 20px;">Dear ${n},</p>
       <p style="margin:0 0 20px;">
         Thank you for letting us know — you will be missed. We are grateful
         you took the time to respond.
       </p>
       <p style="margin:0 0 28px;">
         If your plans change before 1 December 2026, please don't hesitate
         to reach back out at ${contactLink}.
       </p>
       <p style="margin:0;font-style:italic;color:#8A7267;">
         With love,<br />Thomas &amp; Leanne
       </p>`

  return emailShell(siteUrl, body)
}

function buildListEmail(rows, siteUrl) {
  const attendingCount = rows.filter((r) => r.attending).length
  const decliningCount = rows.length - attendingCount

  const headerCell = (label, align = "left") =>
    `<th style="padding:10px 12px;text-align:${align};font-family:Georgia,serif;
               font-size:11px;color:#D4AF6A;letter-spacing:0.08em;
               text-transform:uppercase;font-weight:normal;">${label}</th>`

  const tableRows = rows
    .map((r, i) => {
      const bg = i % 2 === 0 ? "#FBF9F4" : "#F5EDE8"
      const date = new Date(r.updated_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      const cell = (content, color = "#3A2A22", fontSize = "17px") =>
        `<td style="padding:10px 12px;font-family:'Cormorant Garamond',Georgia,serif;
                    font-size:${fontSize};color:${color};
                    border-bottom:1px solid #E4DFD3;">${content}</td>`

      return `<tr style="background-color:${bg};">
        ${cell(esc(r.full_name))}
        ${cell(esc(r.email), "#8A7267", "13px")}
        ${cell(r.attending ? "Attending" : "Declined", r.attending ? "#3A2A22" : "#8A7267")}
        ${cell(r.attending && r.guest_count ? String(r.guest_count) : "—", "#3A2A22")}
        ${cell(date, "#8A7267", "13px")}
      </tr>`
    })
    .join("")

  const guestNotes = rows.filter((r) => r.message)
  const notesSection =
    guestNotes.length > 0
      ? `<p style="margin:32px 0 12px;font-family:Georgia,serif;font-size:12px;
                   color:#8A7267;text-transform:uppercase;letter-spacing:0.08em;">
           Guest Notes
         </p>` +
        guestNotes
          .map(
            (r) =>
              `<p style="margin:0 0 14px;font-family:'Cormorant Garamond',Georgia,serif;
                          font-size:17px;color:#3A2A22;">
                 <strong>${esc(r.full_name)}:</strong>
                 <em style="color:#8A7267;">${esc(r.message)}</em>
               </p>`,
          )
          .join("")
      : ""

  const body = `
    <p style="margin:0 0 6px;font-family:'Cormorant Garamond',Georgia,serif;
               font-size:22px;font-weight:600;color:#3A2A22;">
      RSVP Summary
    </p>
    <p style="margin:0 0 28px;font-family:Georgia,serif;font-size:14px;color:#8A7267;">
      ${rows.length} total &middot; ${attendingCount} attending &middot; ${decliningCount} declined
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
           style="border-collapse:collapse;">
      <thead>
        <tr style="background-color:#3A2A22;">
          ${headerCell("Name")}
          ${headerCell("Email")}
          ${headerCell("Response")}
          ${headerCell("Guests", "center")}
          ${headerCell("RSVP'd")}
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
    ${notesSection}`

  return emailShell(siteUrl, body)
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_SITE_URL = "https://thomasandleanne.com"

const mockRows = [
  {
    full_name: "Abena Mensah",
    email: "abena@example.com",
    attending: true,
    guest_count: 2,
    message: "So excited for you both!",
    updated_at: new Date("2026-10-15").toISOString(),
  },
  {
    full_name: "Kwame Boateng",
    email: "kwame@example.com",
    attending: true,
    guest_count: 1,
    message: null,
    updated_at: new Date("2026-10-18").toISOString(),
  },
  {
    full_name: "Efua Darko",
    email: "efua@example.com",
    attending: false,
    guest_count: null,
    message: "So sorry I cannot make it — wishing you both a beautiful day.",
    updated_at: new Date("2026-10-20").toISOString(),
  },
]

// ── Generate and write files ──────────────────────────────────────────────────

const outDir = join(root, "email-previews")
mkdirSync(outDir, { recursive: true })

const files = [
  {
    name: "guest-attending.html",
    html: buildGuestEmail("Abena Mensah", true, MOCK_SITE_URL),
  },
  {
    name: "guest-declining.html",
    html: buildGuestEmail("Efua Darko", false, MOCK_SITE_URL),
  },
  {
    name: "list-summary.html",
    html: buildListEmail(mockRows, MOCK_SITE_URL),
  },
]

for (const { name, html } of files) {
  const filePath = join(outDir, name)
  writeFileSync(filePath, html, "utf8")
  console.log(`✓  ${filePath}`)
}

console.log("\nOpen any file in your browser to preview the email layout.")
