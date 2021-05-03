const express = require('express')
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config()

const PORT = 3009

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PW
    }
});

const mailOptions = {
    from: 'protrabajadoresestudio@gmail.com',
    to: '',
    subject: 'Probando',
    html: '<h1>Probando</h1><p>123</p>'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port: `, PORT)
})