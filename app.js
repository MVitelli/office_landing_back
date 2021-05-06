require('dotenv').config()
const express = require('express');
const sendMail = require('./src/services/mailer');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/mail', (req, res) => {
    sendMail(req.body)
        .then(() => {
            res.send("Email sent");
        })
        .catch((error) => {
            res.status(500).send(error);
        })
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port:`, process.env.PORT)
})