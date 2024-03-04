// utils/sendRegistrationEmail.js
const sendEmail = require('./mailer');

const sendRegistrationEmail = async (userEmail, userFirstName, verificationToken) => {
  const emailSubject = 'Welcome to Decentralized Art MarketPlace!';
  const emailBody = {
    body: {
      name: userFirstName,
      intro: 'Welcome to Decentalized Art MarketPlace! We’re very excited to have you on board.',
      action: {
        instructions: 'To get started with Decentalized Art MarketPlace, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `${process.env.CLIENT_URL}/api/verify?token=${verificationToken}`, // Verification link
        },
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    },
  };

  // Send the email using the sendEmail utility
  try {
    await sendEmail(userEmail, emailSubject, emailBody);
    console.log(`Registration email sent to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending registration email to ${userEmail}: ${error.message}`);
    throw error;
  }
};

module.exports = sendRegistrationEmail;