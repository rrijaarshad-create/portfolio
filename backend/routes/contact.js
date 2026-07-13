const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 8000,
});

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `📬 New message from ${name}: ${subject || 'Portfolio Contact'}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9fb; color: #17203D; border-radius: 8px;">
              <h2 style="color: #6552D0; margin-bottom: 16px;">New Portfolio Message</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;">From</td><td style="color: #17203D;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="color: #17203D;">${email}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">Subject</td><td style="color: #17203D;">${subject || 'Not specified'}</td></tr>
              </table>
              <hr style="border-color: rgba(101,82,208,0.2); margin: 16px 0;" />
              <p style="color: #6b7280; margin-bottom: 8px;">Message:</p>
              <p style="background: rgba(101,82,208,0.05); padding: 16px; border-radius: 6px; border-left: 3px solid #6552D0; color: #17203D; line-height: 1.7;">
                ${message.replace(/\n/g, '<br/>')}
              </p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">Received via your portfolio contact form</p>
            </div>
          `,
        });

        await transporter.sendMail({
          from: `"Rija Arshad" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Thanks for reaching out, ${name}! 🙌`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #6552D0;">Hey ${name}!</h2>
              <p>Thanks for your message. I've received it and will get back to you within 24 hours.</p>
              <p>Here's a copy of what you sent:</p>
              <blockquote style="border-left: 3px solid #6552D0; padding-left: 16px; color: #666;">
                ${message.replace(/\n/g, '<br/>')}
              </blockquote>
              <p>Talk soon! 🚀</p>
              <p><strong>Rija Arshad</strong><br/>Full-Stack Developer</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Email send failed (message was still saved to DB):', emailErr.message);
      }
    }

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;