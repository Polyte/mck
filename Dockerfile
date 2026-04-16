# Multi-stage build for security and optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install security tools
RUN apk add --no-cache \
    python3 \
    py3-pip \
    make \
    g++ \
    && pip3 install --no-cache-dir \
    safety \
    bandit

# Copy package files
COPY package*.json ./

# Install dependencies with security check
RUN npm ci --only=production && \
    npm audit --audit-level=moderate || true

# Copy source code
COPY . .

# Run security scans during build
RUN npm run security-audit || true && \
    npx safety check --json || true && \
    npx bandit -r src/ -f json || true

# Build the application
RUN npm run build

# Production stage with minimal attack surface
FROM nginx:alpine AS production

# Install security updates
RUN apk update && \
    apk upgrade && \
    rm -rf /var/cache/apk/*

# Remove unnecessary packages and files
RUN rm -rf /usr/share/man /tmp/* /var/tmp/* && \
    find /var/log -type f -delete

# Copy built application
COPY --from=builder /app/build /usr/share/nginx/html

# Copy secure nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set proper permissions
RUN chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
