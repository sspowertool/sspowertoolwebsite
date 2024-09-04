const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('./models/User'); // Ensure the path is correct
const OTP = require('./models/OTP');   // Ensure the path is correct

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP to the database
  await OTP.create({ email, otp });

  // Send OTP via email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`
    });
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  // Find the OTP in the database
  const otpRecord = await OTP.findOne({ email, otp });
  
  if (otpRecord) {
    // OTP is valid
    res.status(200).json({ success: true, message: 'OTP verified' });
  } else {
    // OTP is invalid
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

module.exports = router;
