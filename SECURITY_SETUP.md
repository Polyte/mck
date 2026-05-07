# Security Setup Guide

## Protecting Secret Keys

This document outlines how to properly handle sensitive information in this project.

### Environment Variables

#### 1. Never commit real secrets
- Use placeholder values in `.env.example`
- Real secrets go in `.env` (already gitignored)
- Never commit `.env` file to version control

#### 2. Current Environment Variables
```bash
# Resend API Key
RESEND_API_KEY=your_resend_api_key_here

# Server Port
PORT=3001
```

### Getting Your API Keys

#### Resend API Key
1. Go to [Resend Dashboard](https://resend.com/dashboard)
2. Navigate to API Keys section
3. Generate a new API key
4. Add the key to your `.env` file:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

### Production Deployment

#### Environment Variables in Production
- Use your hosting provider's environment variable management
- Never hardcode secrets in the application code
- Consider using secret management services (AWS Secrets Manager, etc.)

#### GitHub Actions
- Add secrets to Repository Settings > Secrets and variables > Actions
- Reference in workflows: `${{ secrets.YOUR_SECRET_NAME }}`

### Security Best Practices

#### 1. Regular Security Audits
- Run security scans regularly: `npm run security-scan`
- Check for exposed secrets: `grep -r "password\|api_key\|secret" src/ --exclude-dir=node_modules`

#### 2. Code Reviews
- Always review commits for exposed secrets
- Use pre-commit hooks to prevent accidental commits

#### 3. Access Control
- Limit access to production secrets
- Rotate API keys regularly
- Use different keys for development and production

### Emergency Procedures

#### If a Secret is Exposed
1. Immediately revoke the exposed key
2. Generate a new key
3. Update environment variables
4. Rotate all related secrets
5. Review access logs

### Monitoring

#### Security Scanning
This project includes automated security scanning:
- npm audit for dependency vulnerabilities
- ESLint security rules
- Snyk integration (when token is configured)

#### Regular Tasks
- [ ] Monthly dependency updates
- [ ] Quarterly secret rotation
- [ ] Annual security audit

### Contact

For security concerns, contact the development team immediately.

---

**Remember**: Security is everyone's responsibility. Never share credentials via email, chat, or commit them to version control.
