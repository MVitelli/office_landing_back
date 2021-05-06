const nodemailer = require('nodemailer');
require('dotenv').config();

const to = process.env.MAIL_TO;
const subject = "Consulta desde protrabajadores";

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_KEY
    }
});

const sendMail = async ({ email, name, message }) => {
    let mailOptions = {
        to,
        from: email,
        subject,
        html:
            `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Consulta</title>
        </head>
        <body>
            <div>
                <h3>${name}, mail: ${email} dejo esta consulta:</h3>
                <p>${message}</p>
            </div>
            <div>
                <p>Para contestar hacer click <a href="mailto:${email}?subject=Consulta&body= ${message}">aquí</a></p>
            </div>
        </body>
        </html>`
    }
    try {
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(`error`, error)
        throw error;
    }
}

module.exports = sendMail;