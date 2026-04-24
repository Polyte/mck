# Resend API Setup Guide

## Overview
This document explains how to set up the Resend API for the contact form functionality.

## Prerequisites
1. A Resend account (sign up at https://resend.com)
2. A verified domain or use the default `onboarding@resend.dev` for testing

## Setup Steps

### 1. Get Your Resend API Key
1. Log in to your Resend dashboard
2. Go to API Keys section
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your actual API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   PORT=3001
   ```

### 3. Domain Verification (Optional but Recommended)
For production use, you should verify your own domain:

1. In Resend dashboard, go to Domains
2. Add your domain (e.g., `mckeywa.co.za`)
3. Follow the DNS verification steps
4. Once verified, update the `from` field in `server.js`:
   ```javascript
   from: 'contact@yourdomain.com', // Your verified domain
   ```

### 4. Update Email Recipients
In `server.js`, update the email addresses to your actual company emails:
```javascript
to: ['info@mckeywa.co.za'],
```

## Running the Application

### Development Mode
To run both the frontend and backend together:
```bash
npm run dev:full
```

### Separate Processes
Or run them separately:
```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend development
npm run dev
```

## Testing the Contact Form

### Manual Testing
1. Navigate to the contact page in your browser
2. Fill out the form with valid information
3. Submit the form
4. Check for success message and email delivery

### API Testing
Test the API endpoint directly:
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "083 123 4567",
    "projectType": "Infrastructure Development",
    "message": "Test message"
  }'
```

## Security Considerations
- Never commit your `.env` file to version control
- Use environment variables for all sensitive data
- Consider implementing rate limiting for the contact endpoint
- Validate all form inputs on both client and server side

## Troubleshooting

### Common Issues
1. **Email not sending**: Check your API key and domain verification
2. **CORS errors**: Ensure the frontend URL is allowed in your CORS configuration
3. **Server not starting**: Verify all dependencies are installed and `.env` file exists

### Error Messages
- `"Failed to send email"`: Usually indicates API key issues or unverified domain
- `"Missing required fields"`: Form validation failed
- `"Invalid email format"`: Email address format is incorrect

## Production Deployment
For production deployment:
1. Use a proper verified domain
2. Set up proper CORS origins
3. Implement rate limiting
4. Use environment-specific configuration
5. Set up monitoring and logging

## API Endpoint Details

### POST /api/contact
**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "company": "string (optional)",
  "projectType": "string (required)",
  "budget": "string (optional)",
  "location": "string (optional)",
  "timeline": "string (optional)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your inquiry has been submitted successfully. We will contact you within 2 hours."
}
```

### GET /api/health
**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```
