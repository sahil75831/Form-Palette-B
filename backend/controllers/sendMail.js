import nodemailer from "nodemailer";
import { generateMailContent } from "../utils/mailContent.js";

const sendMail = async (name, email, senderEmail, userID, type) => {
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");
  console.log("send mail called ");

  let mailContent = null;
  if (type === "registerVerification") {
    mailContent = generateMailContent(
      name,
      `${process.env.CLIENT_URL}/login/verification?id=${userID}`
    );
  }
  if (type === "resetPasswordVerification") {
    mailContent = generateMailContent(
      name,
      `${process.env.CLIENT_URL}/resetPassword/changePassword?id=${userID}`
    );
  }

  console.log(
    "sending mail ... ",
    email,
    senderEmail,
    userID,
    process.env.SENDER_EMAIL_PASSWORD
  );

  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  // Setup email data
  const mailOptions = {
    from: senderEmail,
    to: email,
    subject: "Verifying Account",
    text: "This is a test email from nodemailer.",
    html: mailContent,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error.message);
    } else {
      console.log("Email sent successfully:", info.response);
      return res.status(200).json({ message: "otp verified" });
    }
  });
};

export { sendMail };
