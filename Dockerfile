# Frontend Dockerfile
FROM node:18-alpine as frontend-build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Backend stage
FROM node:18-alpine as backend

WORKDIR /app

# Copy server package files
COPY server/package*.json ./
RUN npm ci --only=production

# Copy server source
COPY server/ .

# Final stage
FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY --from=backend /app /app

# Copy built frontend files
COPY --from=frontend-build /app/build /app/build

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 5000

CMD ["node", "index.js"]