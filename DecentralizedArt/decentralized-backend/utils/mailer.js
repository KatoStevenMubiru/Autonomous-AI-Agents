//utils/mailer.js
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const mailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Decentalized Art MarketPlace",
        link: "localhost:3000",
        // Optional product logo
        logo: ""
    },
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:465,
    secure:true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

// Dynamic sendEmail function
const sendEmail = async (email, subject, emailBody) => {
    // Generate the email content using Mailgen
    const emailContent = mailGenerator.generate(emailBody);
  
    // Setup email data
    const mailOptions = {
      from: `"Decentralized Art MarketPlace" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: emailContent
    };
  
    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return "Email Sent";
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };
  
  module.exports = sendEmail;