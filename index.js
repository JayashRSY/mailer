const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env' });
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', async (req, res) => {
    res.send('Hello, World!');
});
app.get('/contact', async (req, res) => {
    res.send('Contact form is working!');
});
app.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'jayash.work@gmail.com',
            subject: subject,
            text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}` // Body of the email
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error: Failed to send email.');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully!');
            }
        });
    } catch (error) {
        console.log("🚀 ~ file: index.js:22 ~ error:", error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
