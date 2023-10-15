import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { text } from "express";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ab2dff21eefcea",
      pass: "eb0e37a89f5a8d"
    }
});

export const sendEmail = async(from,to,subject,text) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text
  });

  return ("Message sent: %s", info.messageId);
}

export const reportError = async(subject,text) => {
  await sendEmail("app@media.net","dev@media.net",subject,text);
}
