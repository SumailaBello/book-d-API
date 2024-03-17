import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

// Send Notification Email
const sendNotificationEmail = async (email)=> {
    try {
      const mailResponse = await mailSender(
        email,
        "Booked Notification Email",
        `<h2>Book-d availability updated</h2>
         <a href="bookd://Calendar" ></a>`
      );
      console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
      throw error;
    }
  }

const mailSender = async (email, title, body) => {
    try {
      // Create a Transporter to send emails
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        // secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      });
      // Send emails to users
      let info = await transporter.sendMail({
        from: 'Book-d',
        to: email,
        subject: title,
        html: body,
      });
      console.log("Email info: ", info);
      return info;
    } catch (error) {
      console.log(error.message);
    }
};

export default sendNotificationEmail;