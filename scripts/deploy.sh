#!/bin/bash

# Production Deployment Script for work.cloud.vu
set -e

echo "🚀 Starting deployment to work.cloud.vu"

# Configuration
DOMAIN="work.cloud.vu"
APP_DIR="/opt/work"
REPO_URL="https://github.com/JamesNeumann/work.git"
BRANCH="main"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   log_error "This script must be run as root"
   exit 1
fi

# Create application directory
log_info "Creating application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# Clone or update repository
if [ -d ".git" ]; then
    log_info "Updating existing repository..."
    git fetch origin
    git reset --hard origin/$BRANCH
else
    log_info "Cloning repository..."
    git clone $REPO_URL .
    git checkout $BRANCH
fi

# Set permissions
chown -R 1001:1001 $APP_DIR
chmod +x scripts/*.sh

# Create SSL directory
log_info "Setting up SSL directory..."
mkdir -p ssl logs backups data
chmod 755 ssl logs backups data

# Install Docker and Docker Compose if not present
if ! command -v docker &> /dev/null; then
    log_info "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable docker
    systemctl start docker
fi

if ! command -v docker-compose &> /dev/null; then
    log_info "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Stop existing containers
log_info "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Pull latest images
log_info "Pulling latest Docker images..."
docker-compose -f docker-compose.prod.yml pull

# Build application
log_info "Building application..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Generate SSL certificates if they don't exist
if [ ! -f "ssl/work.cloud.vu.crt" ]; then
    log_warn "SSL certificates not found. Generating self-signed certificates for testing..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/work.cloud.vu.key \
        -out ssl/work.cloud.vu.crt \
        -subj "/C=DE/ST=Bavaria/L=Munich/O=Cloud.vu/CN=work.cloud.vu"
    
    log_info "Self-signed certificates generated. Replace with Let's Encrypt certificates for production."
fi

# Start services
log_info "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to start
log_info "Waiting for services to start..."
sleep 30

# Health check
log_info "Performing health check..."
if curl -f -s https://$DOMAIN/health > /dev/null; then
    log_info "✅ Application is running successfully at https://$DOMAIN"
else
    log_warn "⚠️ Health check failed. Check logs with: docker-compose -f docker-compose.prod.yml logs"
fi

# Setup log rotation
log_info "Setting up log rotation..."
cat > /etc/logrotate.d/work-app << EOF
$APP_DIR/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    notifempty
    create 644 1001 1001
    postrotate
        docker-compose -f $APP_DIR/docker-compose.prod.yml restart nginx
    endscript
}
EOF

# Setup backup cron job
log_info "Setting up automated backups..."
(crontab -l 2>/dev/null; echo "0 2 * * * cd $APP_DIR && docker-compose -f docker-compose.prod.yml run --rm backup") | crontab -

# Setup SSL renewal (if using Let's Encrypt)
log_info "Setting up SSL certificate renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * cd $APP_DIR && docker-compose -f docker-compose.prod.yml run --rm certbot renew && docker-compose -f docker-compose.prod.yml restart nginx") | crontab -

# Create systemd service for auto-start
log_info "Creating systemd service..."
cat > /etc/systemd/system/work-app.service << EOF
[Unit]
Description=Work Feature Matrix Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

systemctl enable work-app.service

log_info "🎉 Deployment completed successfully!"
log_info "📍 Application URL: https://$DOMAIN"
log_info "📊 Health Check: https://$DOMAIN/health"
log_info "📝 Logs: docker-compose -f $APP_DIR/docker-compose.prod.yml logs -f"
log_info "🔄 Restart: systemctl restart work-app"

echo ""
echo "Next steps:"
echo "1. Replace self-signed SSL certificates with Let's Encrypt certificates"
echo "2. Configure your DNS to point $DOMAIN to this server"
echo "3. Create your first admin user at https://$DOMAIN"
echo ""