const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

let transporter;
let usingEthereal = false;

async function createTransporter() {
  // If SMTP credentials provided, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    usingEthereal = false;
    return transporter;
  }

  // Dev fallback: create a test account on Ethereal
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  usingEthereal = true;
  console.log(
    "[mailer] Using Ethereal test account. Preview URLs will be logged in the server console."
  );
  return transporter;
}

async function sendMail({ to, subject, html, text }) {
  if (!transporter) await createTransporter();

  const fromName = process.env.EMAIL_FROM_NAME || "PERSOVITA";
  const fromAddress =
    process.env.EMAIL_FROM_ADDRESS || "no-reply@persovita.local";
  const msg = {
    from: `${fromName} <${fromAddress}>`,
    to,
    subject,
    text: text || undefined,
    html: html || undefined,
  };

  const info = await transporter.sendMail(msg);

  if (usingEthereal) {
    const preview = nodemailer.getTestMessageUrl(info);
    console.log(`[mailer] Message sent (Ethereal). Preview: ${preview}`);
  }

  return info;
}

module.exports = { sendMail, createTransporter };
