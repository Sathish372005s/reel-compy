import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

const sanitize = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ContactPayload;
    const name = sanitize(payload.name);
    const email = sanitize(payload.email).toLowerCase();
    const phone = sanitize(payload.phone);
    const message = sanitize(payload.message);

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          error: "Missing required fields. Please complete all form inputs.",
        },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const emailService = process.env.EMAIL_SERVICE || "gmail";

    if (!emailUser || !emailPass || !receiverEmail) {
      console.error(
        "Email is not configured. Set EMAIL_USER, EMAIL_PASS, and RECEIVER_EMAIL."
      );

      return NextResponse.json(
        {
          error:
            "Email is not configured. Please set EMAIL_USER, EMAIL_PASS, and RECEIVER_EMAIL.",
        },
        { status: 500 }
      );
    }

    if (smtpHost && !Number.isFinite(smtpPort)) {
      return NextResponse.json(
        { error: "SMTP_PORT must be a valid number." },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>New Photography Inquiry</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            background: #050505;
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #ffffff;
          }

          .container {
            max-width: 650px;
            margin: auto;
            background: #111111;
            border: 1px solid #d4af37;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);
          }

          .header {
            background: linear-gradient(135deg, #080808 0%, #151515 100%);
            text-align: center;
            padding: 40px 30px;
            border-bottom: 2px solid #d4af37;
          }

          .logo {
            font-size: 34px;
            font-weight: 800;
            letter-spacing: 6px;
            color: #ffffff;
            margin: 0;
          }

          .tagline {
            margin-top: 10px;
            color: #d4af37;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 3px;
          }

          .content {
            padding: 35px;
          }

          .heading {
            color: #d4af37;
            font-size: 18px;
            margin-bottom: 25px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }

          td {
            padding: 14px 10px;
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          }

          .label {
            width: 35%;
            color: #d4af37;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .value {
            color: #ffffff;
            font-size: 14px;
          }

          .value a {
            color: #f5d67c;
            text-decoration: none;
          }

          .message-title {
            color: #d4af37;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 12px;
            font-weight: bold;
          }

          .message-box {
            background: #0a0a0a;
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 10px;
            padding: 20px;
            color: #e5e5e5;
            line-height: 1.8;
            white-space: pre-wrap;
          }

          .footer {
            text-align: center;
            padding: 25px;
            background: #080808;
            border-top: 1px solid rgba(212, 175, 55, 0.15);
          }

          .footer-text {
            color: #888888;
            font-size: 12px;
            margin: 5px 0;
          }

          .footer-brand {
            color: #d4af37;
            font-weight: 600;
            letter-spacing: 2px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">FLAREELS</h1>
            <div class="tagline">Capturing Stories &bull; Creating Memories</div>
          </div>

          <div class="content">
            <div class="heading">New Photography Inquiry</div>

            <table>
              <tr>
                <td class="label">Client Name</td>
                <td class="value"><strong>${safeName}</strong></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr>
                <td class="label">Phone Number</td>
                <td class="value"><a href="tel:${safePhone}">${safePhone}</a></td>
              </tr>
            </table>

            <div class="message-title">Project Details</div>
            <div class="message-box">${safeMessage}</div>
          </div>

          <div class="footer">
            <p class="footer-text">&copy; ${new Date().getFullYear()} Flareels. All Rights Reserved.</p>
            <p class="footer-brand">Professional Photography &bull; Videography &bull; Content Creation</p>
            <p class="footer-text">Capturing Stories &bull; Creating Memories</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const transporter = nodemailer.createTransport(
      smtpHost
        ? {
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: emailUser,
              pass: emailPass,
            },
          }
        : {
            service: emailService,
            auth: {
              user: emailUser,
              pass: emailPass,
            },
          }
    );

    await transporter.verify();

    await transporter.sendMail({
      from: `"Flareels" <${emailUser}>`,
      to: receiverEmail,
      subject: `New Photography Inquiry - ${name}`,
      text: [
        "New Photography Inquiry",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        message,
      ].join("\n"),
      html: htmlContent,
      replyTo: {
        name,
        address: email,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Email Error:", error);

    return NextResponse.json(
      {
        error: "Failed to send inquiry. Please check SMTP settings and try again.",
      },
      { status: 500 }
    );
  }
}
