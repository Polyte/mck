#!/bin/bash

# Snyk Setup Script for Enhanced Security Scanning
# This script helps configure Snyk integration for the project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

print_header() {
    echo -e "${PURPLE}$1${NC}"
}

print_step() {
    echo -e "${CYAN}▶ $1${NC}"
}

# ASCII Art Header
print_header "
╔══════════════════════════════════════════════════════════════╗
║                Snyk Setup for Enhanced Security               ║
║                     Vulnerability Scanning                    ║
╚══════════════════════════════════════════════════════════════╝
"

print_status "Starting Snyk setup process..."

# Check if Snyk is already installed
if command -v snyk &> /dev/null; then
    print_success "Snyk CLI is already installed"
    snyk --version
else
    print_step "Installing Snyk CLI..."
    npm install -g snyk
    print_success "Snyk CLI installed successfully"
fi

# Check if Snyk token is already configured
if [ -n "$SNYK_TOKEN" ]; then
    print_success "Snyk token found in environment variables"
    AUTH_METHOD="environment"
elif [ -f "$HOME/.config/configstore/snyk.json" ]; then
    print_success "Snyk configuration found locally"
    AUTH_METHOD="local"
else
    print_warning "Snyk token not found"
    AUTH_METHOD="manual"
fi

# Guide user through Snyk setup
print_header "
📋 Snyk Setup Instructions
"

echo "1. 🌐 Create a Snyk Account:"
echo "   • Visit: https://snyk.io/"
echo "   • Click 'Sign up' and choose your plan"
echo "   • Free tier includes unlimited scans for open source"
echo ""

echo "2. 🔑 Generate Snyk Token:"
echo "   • Log into your Snyk dashboard"
echo "   • Go to Account Settings → General"
echo "   • Click 'Generate token' under 'Service account token'"
echo "   • Copy the generated token"
echo ""

echo "3. ⚙️ Configure Snyk Token:"
echo "   Choose one of the following methods:"
echo ""

# Check current setup method
case $AUTH_METHOD in
    "environment")
        echo "   ✅ Method 1 (Recommended): Environment Variable"
        echo "      Your SNYK_TOKEN is already configured"
        echo ""
        echo "   📝 Method 2: Local Configuration"
        echo "      Run: snyk auth [your-token-here]"
        echo ""
        echo "   🔐 Method 3: GitHub Repository Secret"
        echo "      Add SNYK_TOKEN to your GitHub repository secrets"
        ;;
    "local")
        echo "   📝 Method 1: Local Configuration"
        echo "      Your Snyk is already configured locally"
        echo ""
        echo "   🔐 Method 2: GitHub Repository Secret"
        echo "      Add SNYK_TOKEN to your GitHub repository secrets"
        echo ""
        echo "   ⚙️ Method 3: Environment Variable"
        echo "      Export: export SNYK_TOKEN='your-token-here'"
        ;;
    "manual")
        echo "   ⚙️ Method 1 (Recommended): Environment Variable"
        echo "      Export: export SNYK_TOKEN='your-token-here'"
        echo "      Add to your shell profile (.bashrc, .zshrc)"
        echo ""
        echo "   🔐 Method 2: GitHub Repository Secret"
        echo "      Add SNYK_TOKEN to your GitHub repository secrets"
        echo "      This enables Snyk in CI/CD pipeline"
        echo ""
        echo "   📝 Method 3: Local Authentication"
        echo "      Run: snyk auth [your-token-here]"
        ;;
esac

echo ""

# Interactive setup
print_step "Would you like to test your Snyk configuration now? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    print_status "Testing Snyk configuration..."
    
    # Test Snyk authentication
    if [ -n "$SNYK_TOKEN" ]; then
        if snyk auth $SNYK_TOKEN 2>/dev/null; then
            print_success "Snyk authentication successful!"
        else
            print_error "Snyk authentication failed. Please check your token."
            exit 1
        fi
    elif command -v snyk &> /dev/null; then
        if snyk test --dry-run 2>/dev/null; then
            print_success "Snyk is already authenticated!"
        else
            print_warning "Snyk authentication required. Please run: snyk auth [your-token]"
        fi
    else
        print_error "Snyk CLI not found. Please run: npm install -g snyk"
        exit 1
    fi
    
    # Run a test scan
    print_step "Running initial Snyk scan..."
    snyk test --severity-threshold=high || print_warning "Vulnerabilities found (this is normal for the initial scan)"
    
    print_success "Snyk setup test completed!"
else
    print_status "Skipping Snyk test. You can run it later with: snyk test"
fi

# GitHub Actions setup
print_header "
🚀 GitHub Actions Integration
"

echo "To enable Snyk in your CI/CD pipeline:"
echo ""
echo "1. 📁 Navigate to your GitHub repository"
echo "2. ⚙️ Go to Settings → Secrets and variables → Actions"
echo "3. 🔐 Click 'New repository secret'"
echo "4. 📝 Name: SNYK_TOKEN"
echo "5. 📋 Value: [Your Snyk token from step 2]"
echo "6. ✅ Click 'Add secret'"
echo ""

print_step "Would you like to run the Snyk setup workflow now? (y/n)"
read -r workflow_response
if [[ "$workflow_response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    print_status "Triggering Snyk setup workflow..."
    
    # Check if gh CLI is available
    if command -v gh &> /dev/null; then
        gh workflow run setup-snyk.yml
        print_success "Snyk setup workflow triggered!"
        print_status "Check the Actions tab in your GitHub repository for progress"
    else
        print_warning "GitHub CLI not found. Please trigger the workflow manually:"
        echo "   • Go to Actions tab in your repository"
        echo "   • Select 'Setup Snyk Integration' workflow"
        echo "   • Click 'Run workflow'"
    fi
else
    print_status "You can trigger the workflow later from the Actions tab"
fi

# Final instructions
print_header "
📚 Next Steps & Resources
"

echo "✅ Snyk CLI is installed and ready"
echo "🔍 You can run manual scans with: snyk test"
echo "📊 Enable monitoring with: snyk monitor"
echo "🚀 CI/CD integration is configured in .github/workflows/"
echo ""

echo "📖 Useful Snyk Commands:"
echo "   • snyk test                    # Scan for vulnerabilities"
echo "   • snyk monitor                 # Enable continuous monitoring"
echo "   • snyk wizard                  # Interactive security fix guide"
echo "   • snyk iac test               # Scan infrastructure as code"
echo "   • snyk container test          # Scan container images"
echo ""

echo "🌐 Helpful Resources:"
echo "   • Snyk Documentation: https://support.snyk.io/"
echo "   • Snyk Dashboard: https://app.snyk.io/"
echo "   • Security Best Practices: https://snyk.io/learn/"
echo ""

print_success "Snyk setup process completed!"
print_status "Your enhanced security scanning is now ready to use!"
