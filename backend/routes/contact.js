// 
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// ─── Gmail Transporter ────────────────────────────────────────
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
};

// ─── POST Contact Message ─────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log('📬 New contact request received');

    // ─── Validation ───────────────────────────────────────────
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Name, email, and message are required.',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address.',
      });
    }

    // ─── Save Message To MongoDB ──────────────────────────────
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await contact.save();

    console.log('✅ Message saved to MongoDB');

    // ─── Check Email Environment Variables ────────────────────
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ EMAIL CONFIGURATION MISSING');
      console.error(
        'EMAIL_USER exists:',
        !!process.env.EMAIL_USER
      );
      console.error(
        'EMAIL_PASS exists:',
        !!process.env.EMAIL_PASS
      );

      return res.status(500).json({
        message:
          'Message saved, but email configuration is missing.',
      });
    }

    // ─── Send Emails ──────────────────────────────────────────
    try {
      console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
      console.log(
        '📬 EMAIL_TO:',
        process.env.EMAIL_TO || process.env.EMAIL_USER
      );
      console.log(
        '🔐 EMAIL_PASS exists:',
        !!process.env.EMAIL_PASS
      );

      const transporter = createTransporter();

      // Test Gmail connection
      console.log('🔄 Testing Gmail SMTP connection...');

      await transporter.verify();

      console.log('✅ Gmail SMTP connection successful');

      // ─── Email To Rija ──────────────────────────────────────
      const adminEmail = await transporter.sendMail({
        from: `"Rija Portfolio" <${process.env.EMAIL_USER}>`,

        to:
          process.env.EMAIL_TO ||
          process.env.EMAIL_USER,

        replyTo: email,

        subject: `New Portfolio Message from ${name}`,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 30px;
              background: #f9f9fb;
              color: #17203D;
              border-radius: 10px;
            "
          >
            <h2 style="color: #6552D0;">
              New Portfolio Message
            </h2>

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Subject:</strong>
              ${subject || 'Not specified'}
            </p>

            <hr
              style="
                border: none;
                border-top: 1px solid #ddd;
                margin: 20px 0;
              "
            />

            <p>
              <strong>Message:</strong>
            </p>

            <div
              style="
                background: #ffffff;
                padding: 20px;
                border-left: 4px solid #6552D0;
                border-radius: 6px;
                line-height: 1.6;
              "
            >
              ${message.replace(/\n/g, '<br/>')}
            </div>

            <p
              style="
                color: #6b7280;
                font-size: 12px;
                margin-top: 25px;
              "
            >
              Received via rija. portfolio contact form
            </p>
          </div>
        `,
      });

      console.log('✅ ADMIN EMAIL SENT');
      console.log(
        '📨 Admin Message ID:',
        adminEmail.messageId
      );

      // ─── Auto Reply To Visitor ──────────────────────────────
      const autoReply = await transporter.sendMail({
        from: `"Rija Arshad" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: `Thanks for reaching out, ${name}!`,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 30px;
            "
          >
            <h2 style="color: #6552D0;">
              Hey ${name}!
            </h2>

            <p>
              Thanks for reaching out through my portfolio.
            </p>

            <p>
              I've received your message and will get back
              to you as soon as possible.
            </p>

            <p>
              Here's a copy of your message:
            </p>

            <blockquote
              style="
                border-left: 4px solid #6552D0;
                padding: 15px;
                margin-left: 0;
                background: #f9f9fb;
                color: #555;
              "
            >
              ${message.replace(/\n/g, '<br/>')}
            </blockquote>

            <p>Talk soon! 🚀</p>

            <p>
              <strong>Rija Arshad</strong>
              <br />
              Full Stack Developer
            </p>
          </div>
        `,
      });

      console.log('✅ AUTO REPLY SENT');
      console.log(
        '📨 Auto Reply Message ID:',
        autoReply.messageId
      );

      return res.status(200).json({
        message: 'Message sent successfully!',
      });

    } catch (emailErr) {
      console.error('❌ EMAIL SENDING FAILED');
      console.error('❌ Error name:', emailErr.name);
      console.error('❌ Error message:', emailErr.message);
      console.error('❌ Error code:', emailErr.code);
      console.error('❌ Error response:', emailErr.response);

      return res.status(500).json({
        message:
          'Message was saved, but email failed to send.',
      });
    }

  } catch (err) {
    console.error('❌ CONTACT ERROR:', err);

    return res.status(500).json({
      message:
        'Failed to process your message. Please try again.',
    });
  }
});

// ─── GET Contact Messages ─────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ createdAt: -1 });

    return res.json(messages);

  } catch (err) {
    console.error('❌ GET CONTACT ERROR:', err);

    return res.status(500).json({
      message: 'Server error',
    });
  }
});

module.exports = router;