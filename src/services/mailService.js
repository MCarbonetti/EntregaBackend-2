const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
exports.sendReset = (to, link) => transporter.sendMail({
  from: process.env.SMTP_USER,
  to,
  subject: 'Password Reset',
  html: `<a href="${link}">Reset Password</a>`
});
