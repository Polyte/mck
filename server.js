const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, projectType, budget, location, timeline, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !projectType || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: name, email, phone, projectType, message' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Create email content
    const emailContent = `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Project Type:</strong> ${projectType}</p>
      ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email to company
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified domain
      to: ['info@Mckeywa.co.za', 'enquiries@Mckeywa.co.za'],
      subject: `New Project Inquiry: ${projectType} - ${name}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send email' 
      });
    }

    // Send confirmation email to customer
    const confirmationContent = `
      <h2>Thank You for Your Inquiry</h2>
      <p>Dear ${name},</p>
      <p>Thank you for contacting Mckeywa Construction. We have received your project inquiry and will get back to you within 2 hours.</p>
      <p><strong>Your Inquiry Details:</strong></p>
      <ul>
        <li>Project Type: ${projectType}</li>
        ${budget ? `<li>Budget: ${budget}</li>` : ''}
        ${timeline ? `<li>Timeline: ${timeline}</li>` : ''}
      </ul>
      <p>If you have any urgent questions, please call us at (012) 322 6786.</p>
      <p>Best regards,<br/>Mckeywa Construction Team</p>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified domain
      to: [email],
      subject: 'Thank You for Your Inquiry - Mckeywa Construction',
      html: confirmationContent,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Your inquiry has been submitted successfully. We will contact you within 2 hours.' 
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
