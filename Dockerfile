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

# Full install so Vite and build tooling are available (they live in devDependencies)
RUN npm ci && \
    npm audit --audit-level=moderate || true

# Copy source code
COPY . .

# Run security scans during build
RUN npm run security-audit || true && \
    npx safety check --json || true && \
    npx bandit -r src/ -f json || true

# Build the application
RUN npm run build

# Production runtime dependencies only (Express, Nodemailer, etc.)
FROM node:18-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Production: nginx serves the SPA; Node runs the /api/* routes (chat, contact) on loopback
FROM node:18-alpine AS production

RUN apk update && apk upgrade && apk add --no-cache nginx curl && rm -rf /var/cache/apk/*

WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
    CMD curl -sf http://127.0.0.1:8080/health || exit 1

CMD ["/docker-entrypoint.sh"]
