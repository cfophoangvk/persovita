const nodemailer = require("nodemailer");

async function sendMail({ to, subject, html, text }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const msg = {
    from: `"PERSOVITA" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(msg);
    console.log(" Email sent successfully:", info.messageId);
    return info;
  } catch (err) {
    console.error(" Error sending email:", err);
    throw err;
  }
}

module.exports = { sendMail };
