const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse data from the form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files from your 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle the contact form submission
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // FIXED: Using createTransport (no 'er' at the end)
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'phmraslam@gmail.com', 
                pass: 'qwxb ylrb kysk nnfz'   
            }
        });

        const mailOptions = {
            from: email,
            to: 'phmraslam@gmail.com',       // The email address where you want to receive messages
            subject: `New Portfolio Inquiry from ${name}`,
            text: `You have a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});