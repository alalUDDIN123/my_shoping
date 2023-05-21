const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.my_email,
        pass: process.env.my_password
    }
});
async function sendEmail(to, subject, message) {
    let mailOptions = {
        from: process.env.my_email,
        to: to,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        //   console.log(`Email sent to ${to} from sendmail `);
    } catch (error) {
        if (error.code === 'EAUTH') {
        
            throw new Error('Invalid email credentials from admin side');
        } else {
        
            throw new Error('Error sending email');
        }
    }
}

module.exports = sendEmail;
