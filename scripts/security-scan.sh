#!/bin/bash

# Security Scanning Script for Mckeywa Construction Website
# This script performs comprehensive security vulnerability scanning

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Create reports directory
REPORTS_DIR="./security-reports"
mkdir -p "$REPORTS_DIR"

print_status "Starting comprehensive security scan..."
print_status "Reports will be saved to: $REPORTS_DIR"

# Get current timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# 1. npm audit
print_status "Running npm audit..."
if command -v npm &> /dev/null; then
    npm audit --audit-level=moderate --json > "$REPORTS_DIR/npm-audit-$TIMESTAMP.json" 2>&1 || true
    npm audit --audit-level=moderate || print_warning "npm audit found vulnerabilities"
    print_success "npm audit completed"
else
    print_error "npm not found"
fi

# 2. Install and run retire.js for known vulnerabilities
print_status "Installing and running retire.js..."
if command -v npm &> /dev/null; then
    npm install -g retire 2>/dev/null || true
    if command -v retire &> /dev/null; then
        retire --outputformat json --outputpath "$REPORTS_DIR/retire-$TIMESTAMP.json" || print_warning "retire.js found issues"
        print_success "retire.js scan completed"
    else
        print_warning "Could not install retire.js"
    fi
fi

# 3. Install and run Snyk if token is available
print_status "Checking Snyk availability..."
if [ -n "$SNYK_TOKEN" ]; then
    if command -v npm &> /dev/null; then
        npm install -g snyk 2>/dev/null || true
        if command -v snyk &> /dev/null; then
            snyk test --json > "$REPORTS_DIR/snyk-$TIMESTAMP.json" 2>&1 || print_warning "Snyk found vulnerabilities"
            print_success "Snyk scan completed"
        else
            print_warning "Could not install Snyk"
        fi
    fi
else
    print_warning "SNYK_TOKEN not set, skipping Snyk scan"
fi

# 4. Run ESLint with security rules
print_status "Running ESLint security rules..."
if command -v npx &> /dev/null; then
    # Install eslint-plugin-security if not present
    npm install --save-dev eslint-plugin-security 2>/dev/null || true
    
    # Create eslint security config
    cat > .eslintrc.security.json << EOF
{
  "plugins": ["security"],
  "extends": ["plugin:security/recommended"],
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  }
}
EOF

    npx eslint --ext .js,.jsx,.ts,.tsx src/ --config .eslintrc.security.json --format json > "$REPORTS_DIR/eslint-security-$TIMESTAMP.json" 2>&1 || print_warning "ESLint security found issues"
    print_success "ESLint security scan completed"
else
    print_warning "npx not found, skipping ESLint security scan"
fi

# 5. Check for sensitive data exposure
print_status "Scanning for potential sensitive data exposure..."
SENSITIVE_PATTERNS=(
    "password.*="
    "api_key.*="
    "secret.*="
    "token.*="
    "private_key.*="
    "aws_access_key_id"
    "aws_secret_access_key"
)

SENSITIVE_FILES=(
    ".env"
    ".env.local"
    ".env.production"
    "config.json"
    "secrets.json"
)

# Scan for sensitive patterns in source code
echo "Sensitive Pattern Scan Results - $TIMESTAMP" > "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
echo "========================================" >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
echo "" >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
    if grep -r -i -n --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.json" "$pattern" src/ 2>/dev/null; then
        echo "Found pattern '$pattern' in source code" >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
        grep -r -i -n --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.json" "$pattern" src/ 2>/dev/null >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
        echo "" >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
    fi
done

# Check for sensitive files
echo "Sensitive Files Check:" >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
echo "======================" >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
for file in "${SENSITIVE_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "WARNING: Sensitive file found: $file" >> "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"
    fi
done

print_success "Sensitive data scan completed"

# 6. Check for outdated dependencies
print_status "Checking for outdated dependencies..."
if command -v npm &> /dev/null; then
    npm outdated --json > "$REPORTS_DIR/outdated-$TIMESTAMP.json" 2>/dev/null || true
    print_success "Outdated dependencies check completed"
fi

# 7. Generate summary report
print_status "Generating security summary report..."
cat > "$REPORTS_DIR/security-summary-$TIMESTAMP.md" << EOF
# Security Scan Summary Report

**Date:** $(date)
**Project:** Mckeywa Construction Website

## Scan Results

### 1. Dependency Vulnerabilities
- **npm audit:** Results saved in \`npm-audit-$TIMESTAMP.json\`
- **Snyk:** ${SNYK_TOKEN:+Results saved in \`snyk-$TIMESTAMP.json\`}${SNYK_TOKEN:-Skipped (no token)}
- **retire.js:** Results saved in \`retire-$TIMESTAMP.json\`

### 2. Code Security
- **ESLint Security:** Results saved in \`eslint-security-$TIMESTAMP.json\`

### 3. Sensitive Data Exposure
- **Sensitive Data Scan:** Results saved in \`sensitive-data-$TIMESTAMP.txt\`

### 4. Dependency Updates
- **Outdated Packages:** Results saved in \`outdated-$TIMESTAMP.json\`

## Recommendations

1. **Review all vulnerability reports** and address high/critical issues immediately
2. **Update dependencies** to their latest secure versions
3. **Remove any hardcoded secrets** found in the sensitive data scan
4. **Set up automated security scanning** in your CI/CD pipeline
5. **Regular security audits** should be performed monthly

## Next Steps

1. Review the detailed reports in this directory
2. Create a plan to address identified vulnerabilities
3. Update dependencies using \`npm update\` or \`npm install package@latest\`
4. Implement security best practices in development workflow

---

*This report was generated automatically by the security-scan.sh script*
EOF

print_success "Security scan completed successfully!"
print_status "All reports saved to: $REPORTS_DIR"
print_status "Summary report: $REPORTS_DIR/security-summary-$TIMESTAMP.md"

# Display summary
echo ""
echo "=== QUICK SUMMARY ==="
echo "📁 Reports directory: $REPORTS_DIR"
echo "📄 Summary report: security-summary-$TIMESTAMP.md"
echo ""

# Check for critical issues
if grep -q "critical" "$REPORTS_DIR/npm-audit-$TIMESTAMP.json" 2>/dev/null; then
    print_error "CRITICAL vulnerabilities found! Review npm-audit report immediately."
fi

if [ -f "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt" ] && grep -q "Found pattern" "$REPORTS_DIR/sensitive-data-$TIMESTAMP.txt"; then
    print_warning "Potential sensitive data exposure detected! Review sensitive-data report."
fi

print_success "Security scanning script completed. Review the reports for detailed findings."
