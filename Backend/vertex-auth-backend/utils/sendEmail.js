const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"360 Vertex Solutions" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
  });
};
