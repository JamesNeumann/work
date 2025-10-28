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

# Production stage with nginx
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy error page
COPY 50x.html /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx-client.conf /etc/nginx/conf.d/default.conf

# Verify build files exist
RUN ls -la /usr/share/nginx/html/ && \
    test -f /usr/share/nginx/html/index.html || (echo "ERROR: index.html not found!" && exit 1)

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
