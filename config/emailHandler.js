import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendEmail = async (from, to, subject, text) => {
  console.log("Send Email Called!");
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text
    });
    return ("Message sent: %s", info.messageId ); 
  } catch (error) {
    console.log("There is some problem while sending email " + error);
  }
  
}

export const reportError = async (subject, text) => {
  await sendEmail("app@media.net", "dev@media.net", subject, text);
}
