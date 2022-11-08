const nodemailer = require('nodemailer');
const emailTemplateObject = require('../emailTemplates');

const sendEmail = (applicantMail, emailAction) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD
        }
    })

    const emailInfo = emailTemplateObject[emailAction];

    return transporter.sendMail({
        from: 'No reply mar-2022',
        to: applicantMail,
        subject: emailInfo.subject,
        html: emailInfo.html
    })
}

module.exports = {sendEmail};