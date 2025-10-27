#!/bin/bash

# Production Deployment Script for work.cloud.vu
set -e

echo "🚀 Starting deployment for work.cloud.vu..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}Error: Do not run this script as root${NC}"
   exit 1
fi

# Step 1: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --silent

# Step 2: Build React application
echo -e "${YELLOW}🔨 Building React application...${NC}"
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo -e "${RED}❌ Build failed - build directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"
echo -e "${GREEN}📁 Build directory created at ./build${NC}"

# Step 3: Stop existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down

# Step 4: Start containers
echo -e "${YELLOW}🐳 Starting Docker containers...${NC}"
docker-compose -f docker-compose.prod.yml up -d --build

# Step 5: Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 10

# Step 6: Check service health
echo -e "${YELLOW}🏥 Checking service health...${NC}"

# Check MongoDB
if docker-compose -f docker-compose.prod.yml ps | grep -q "mongodb.*Up"; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${RED}❌ MongoDB is not running${NC}"
fi

# Check Backend
if docker-compose -f docker-compose.prod.yml ps | grep -q "backend.*Up"; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${RED}❌ Backend is not running${NC}"
fi

# Check Nginx
if docker-compose -f docker-compose.prod.yml ps | grep -q "nginx.*Up"; then
    echo -e "${GREEN}✅ Nginx is running${NC}"
else
    echo -e "${RED}❌ Nginx is not running${NC}"
fi

# Step 7: Show logs
echo -e "${YELLOW}📋 Recent logs:${NC}"
docker-compose -f docker-compose.prod.yml logs --tail=20

echo ""
echo -e "${GREEN}✨ Deployment completed!${NC}"
echo -e "${GREEN}🌐 Application should be available at: https://work.cloud.vu${NC}"
echo ""
echo "To view logs, run:"
echo "  docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "To stop the application, run:"
echo "  docker-compose -f docker-compose.prod.yml down"
