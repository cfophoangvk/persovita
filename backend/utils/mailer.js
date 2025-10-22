const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

async function createTransporter() {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  )
    throw new Error("Missing SMTP configuration");

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    requireTLS: true,
    tls: {
      rejectUnauthorized: false,
    },
  });
}

async function sendMail({ to, subject, html, text }) {
  const transporter = await createTransporter();

  const fromName = process.env.EMAIL_FROM_NAME || "PERSOVITA";
  const fromAddress =
    process.env.EMAIL_FROM_ADDRESS || "no-reply@persovita.local";

  const msg = {
    from: `${fromName} <${fromAddress}>`,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(msg);
  console.log("✅ Email sent:", info.messageId);
  return info;
}

module.exports = { sendMail };
