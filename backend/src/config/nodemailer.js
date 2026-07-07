const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Nodemailer Error:", error.message);
  } else {
    console.log("Nodemailer is ready to send emails");
  }
});

module.exports = transporter;