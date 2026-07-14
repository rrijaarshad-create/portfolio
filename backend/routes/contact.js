const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Contact = require('../models/Contact');

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── POST Contact Message ─────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log('📬 New contact request received');

    // Validation
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

    // Save to MongoDB
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await contact.save();

    console.log('✅ Message saved to MongoDB');

    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is missing');

      return res.status(500).json({
        message: 'Message saved, but email service is not configured.',
      });
    }

    // ─── Send Email To Rija ───────────────────────────────────
    console.log('📧 Sending admin email with Resend...');

    const adminResult = await resend.emails.send({
      from: 'Rija Portfolio <onboarding@resend.dev>',

      to: [
        process.env.EMAIL_TO || 'rijaarshadr@gmail.com',
      ],

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
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
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
            Received via rija. portfolio
          </p>
        </div>
      `,
    });

    if (adminResult.error) {
      console.error(
        '❌ RESEND ADMIN EMAIL ERROR:',
        adminResult.error
      );

      return res.status(500).json({
        message: 'Message saved, but email failed to send.',
      });
    }

    console.log('✅ ADMIN EMAIL SENT');
    console.log('📨 Email ID:', adminResult.data?.id);

    // ─── Auto Reply ───────────────────────────────────────────
    console.log('📧 Sending auto reply...');

    const autoReplyResult = await resend.emails.send({
      from: 'Rija Arshad <onboarding@resend.dev>',

      to: [email],

      subject: `Thanks for reaching out, ${name}!`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            color: #17203D;
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

    if (autoReplyResult.error) {
      console.error(
        '⚠️ AUTO REPLY ERROR:',
        autoReplyResult.error
      );
    } else {
      console.log('✅ AUTO REPLY SENT');
      console.log(
        '📨 Auto Reply ID:',
        autoReplyResult.data?.id
      );
    }

    return res.status(200).json({
      message: 'Message sent successfully!',
    });

  } catch (err) {
    console.error('❌ CONTACT ERROR:', err);

    return res.status(500).json({
      message: 'Failed to process your message.',
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