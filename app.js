const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const sendMail = require('./src/services/mailer');
const app = express();

// const http = require('http');
const https = require('https');
const fs = require('fs')

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


const httpsServer = https.createServer({
    key: fs.readFileSync(process.env.PRIV_KEY),
    cert: fs.readFileSync(process.env.CERT),
}, app);

httpsServer.listen(process.env.PORT, () => {
    console.log(`Listening on port:`, process.env.PORT)
})
