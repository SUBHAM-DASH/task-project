const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

async function sentEmail(toEmail, subject, text) {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: toEmail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error.response);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sentEmail };
