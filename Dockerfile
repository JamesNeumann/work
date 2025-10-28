# Multi-stage build for React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Build the React app
RUN npm run build

# List build output for debugging
RUN echo "=== Build completed ===" && \
    ls -lah /app/build && \
    echo "=== index.html exists ===" && \
    cat /app/build/index.html | head -20

# Production stage with nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy built app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy error page
COPY 50x.html /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx-client.conf /etc/nginx/conf.d/default.conf

# Verify build files exist and show content
RUN echo "=== Nginx html directory ===" && \
    ls -lah /usr/share/nginx/html/ && \
    echo "=== Checking index.html ===" && \
    test -f /usr/share/nginx/html/index.html || (echo "ERROR: index.html not found!" && exit 1) && \
    echo "=== index.html first 20 lines ===" && \
    head -20 /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
