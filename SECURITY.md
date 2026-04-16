# Security Vulnerability Scanning

This document outlines the security scanning implementation for the Mckeywa Construction Website project.

## Overview

A comprehensive security vulnerability scanning system has been integrated into the project with the following capabilities:

- **CI/CD Pipeline Integration**: Automated security scans on every push, pull request, and daily schedule
- **On-Demand Scanning**: Manual security scanning via npm scripts
- **Multi-Layer Security**: Dependency scanning, code analysis, container security, and sensitive data detection

## Security Scanning Tools

### 1. Dependency Vulnerability Scanning
- **npm audit**: Built-in Node.js vulnerability scanner
- **retire.js**: Scans for known vulnerable JavaScript libraries
- **Snyk**: Advanced vulnerability detection (requires API token)

### 2. Code Security Analysis
- **ESLint Security Plugin**: Identifies security anti-patterns in code
- **CodeQL**: GitHub's advanced code analysis engine
- **Semgrep**: Multi-language static analysis for security issues

### 3. Container Security
- **Trivy**: Comprehensive container vulnerability scanner
- **Docker Security Best Practices**: Hardened Docker configuration

### 4. Sensitive Data Detection
- Custom pattern matching for API keys, passwords, and secrets
- Configuration file scanning for exposed credentials

## Usage

### On-Demand Security Scanning

#### Quick Security Audit
```bash
npm run security-audit
```

#### Comprehensive Security Scan
```bash
npm run security-scan
```

#### Fix Common Vulnerabilities
```bash
npm run security-fix
```

#### Security-Focused Linting
```bash
npm run lint:security
```

### CI/CD Pipeline

The security scanning runs automatically in the following scenarios:

1. **On Push**: Every push to `main` and `develop` branches
2. **Pull Requests**: Security scan on every PR to `main`
3. **Daily Schedule**: Automated scan at 2 AM UTC
4. **Manual Trigger**: Can be triggered manually via GitHub Actions

#### GitHub Actions Workflow
- **Location**: `.github/workflows/security-scan.yml`
- **Features**:
  - Multi-Node.js version testing (18.x, 20.x)
  - Parallel job execution for efficiency
  - Artifact upload for security reports
  - PR comments with security findings
  - Comprehensive security summary

## Configuration Files

### Security Scan Configuration
- **`.audit-ci.json`**: npm audit configuration
- **`.eslintrc.security.json`**: ESLint security rules
- **`scripts/security-scan.sh`**: Main security scanning script

### Container Security
- **`Dockerfile`**: Multi-stage secure build
- **`nginx.conf`**: Hardened web server configuration

## Security Reports

All security scans generate detailed reports saved to `./security-reports/`:

- `npm-audit-<timestamp>.json`: Dependency vulnerability report
- `retire-<timestamp>.json`: Known vulnerable libraries report
- `eslint-security-<timestamp>.json`: Code security issues
- `sensitive-data-<timestamp>.txt`: Potential data exposure
- `outdated-<timestamp>.json`: Outdated dependencies
- `security-summary-<timestamp>.md`: Executive summary

## Current Security Status

### Identified Vulnerabilities (High Priority)
1. **lodash <= 4.17.23**: Multiple high-severity vulnerabilities
2. **picomatch 4.0.0 - 4.0.3**: Method injection and ReDoS vulnerabilities
3. **rollup 4.0.0 - 4.58.0**: Arbitrary file write vulnerability
4. **vite <= 6.4.1**: Multiple path traversal and file access vulnerabilities

### Recommended Actions
1. **Immediate**: Run `npm audit fix` to address high-severity vulnerabilities
2. **Short-term**: Update Vite to latest version with security patches
3. **Ongoing**: Regular dependency updates and security monitoring

## Security Best Practices Implemented

### Development Security
- **Security-focused linting rules** integrated into development workflow
- **Pre-commit hooks** recommended for security checks
- **Dependency scanning** during development

### Production Security
- **Hardened nginx configuration** with security headers
- **Non-root container execution** for reduced attack surface
- **Rate limiting** and request filtering
- **Content Security Policy** implementation

### CI/CD Security
- **Automated vulnerability scanning** in pipeline
- **Secret management** best practices
- **Security gatekeeping** for deployments

## Integration Instructions

### Setting Up Snyk (Enhanced Security Scanning)

#### Quick Setup
```bash
# Run the interactive setup script
npm run setup-snyk
```

#### Manual Setup Steps

1. **Create Snyk Account**: 
   - Visit [snyk.io](https://snyk.io)
   - Sign up for free account (unlimited scans for open source)
   - Verify your email address

2. **Generate Snyk Token**:
   - Log into Snyk dashboard
   - Go to Account Settings → General
   - Click "Generate token" under "Service account token"
   - Copy the generated token

3. **Configure Snyk Token** (choose one method):

   **Method 1: GitHub Repository Secret (Recommended for CI/CD)**
   ```bash
   # In your GitHub repository:
   # 1. Go to Settings → Secrets and variables → Actions
   # 2. Click "New repository secret"
   # 3. Name: SNYK_TOKEN
   # 4. Value: [Your Snyk token]
   # 5. Click "Add secret"
   ```

   **Method 2: Environment Variable (Local Development)**
   ```bash
   export SNYK_TOKEN="your-token-here"
   echo 'export SNYK_TOKEN="your-token-here"' >> ~/.bashrc  # or ~/.zshrc
   ```

   **Method 3: Local Authentication**
   ```bash
   snyk auth your-token-here
   ```

4. **Test Snyk Integration**:
   ```bash
   # Test locally
   snyk test --dry-run
   
   # Run full scan
   snyk test --severity-threshold=high
   
   # Enable continuous monitoring
   snyk monitor
   ```

5. **GitHub Actions Integration**:
   - Trigger setup workflow: Go to Actions → "Setup Snyk Integration" → "Run workflow"
   - Snyk will automatically run in security scans when token is configured

### Local Development Setup

1. **Install Security Tools**:
   ```bash
   npm install --save-dev eslint-plugin-security retire
   ```

2. **Set Up Pre-commit Hooks** (recommended):
   ```bash
   # Add to package.json scripts
   "precommit": "npm run security-audit && npm run lint:security"
   ```

3. **Environment Variables** (optional):
   ```bash
   export SNYK_TOKEN="your-token-here"
   ```

## Monitoring and Maintenance

### Regular Security Tasks
- **Weekly**: Run `npm audit` and review findings
- **Monthly**: Full security scan with comprehensive analysis
- **Quarterly**: Security policy review and tool updates

### Alert Configuration
- **GitHub Actions**: Configure notifications for security scan failures
- **Email Alerts**: Set up notifications for critical vulnerabilities
- **Slack Integration**: Optional security alerts to development channels

## Troubleshooting

### Common Issues

1. **False Positives**: Review and adjust ESLint security rules
2. **Build Failures**: Check for conflicting security configurations
3. **Missing Tools**: Ensure all security dependencies are installed

### Getting Help
- **Security Reports**: Check detailed logs in `security-reports/`
- **GitHub Actions**: Review workflow logs for specific failures
- **Documentation**: Refer to tool-specific documentation

## Compliance and Standards

This security scanning implementation aligns with:
- **OWASP Top 10**: Web application security risks
- **CIS Benchmarks**: Security configuration standards
- **NIST Cybersecurity Framework**: Security best practices

---

*Last Updated: April 15, 2026*
*Security Contact: development team*
