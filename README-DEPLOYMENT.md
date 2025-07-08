# Production Deployment Guide - work.cloud.vu

## 🚀 Quick Deployment

### One-Line Deployment
```bash
curl -fsSL https://raw.githubusercontent.com/JamesNeumann/work/main/scripts/deploy.sh | sudo bash
```

### Manual Deployment

1. **Clone Repository**
```bash
sudo mkdir -p /opt/work
cd /opt/work
sudo git clone https://github.com/JamesNeumann/work.git .
```

2. **Run Deployment Script**
```bash
sudo chmod +x scripts/deploy.sh
sudo ./scripts/deploy.sh
```

## 🔧 Server Requirements

### Minimum System Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 20GB minimum, 50GB recommended
- **CPU**: 2 cores minimum
- **Network**: Static IP with ports 80, 443 open

### Required Software (auto-installed)
- Docker 20.0+
- Docker Compose 2.0+
- Git
- OpenSSL
- Curl

## 🌐 DNS Configuration

**Before deployment, configure your DNS:**

```
A Record: work.cloud.vu → YOUR_SERVER_IP
CNAME Record: www.work.cloud.vu → work.cloud.vu
```

## 🔐 SSL Certificates

### Option 1: Let's Encrypt (Recommended)
```bash
# After initial deployment
cd /opt/work
docker-compose -f docker-compose.prod.yml run --rm certbot certonly \
  --webroot --webroot-path=/var/www/certbot \
  --email admin@cloud.vu \
  --agree-tos --no-eff-email \
  -d work.cloud.vu
```

### Option 2: Custom SSL Certificates
```bash
# Copy your certificates to:
/opt/work/ssl/work.cloud.vu.crt
/opt/work/ssl/work.cloud.vu.key
```

## 📋 Environment Configuration

### Production Environment Variables
Located in `/opt/work/.env.production`:

```bash
# Critical settings to verify:
DOMAIN=work.cloud.vu
CLIENT_URL=https://work.cloud.vu
MONGODB_URI=mongodb://admin:SecurePassword2024!@mongodb:27017/feature-matrix?authSource=admin
JWT_SECRET=SuperSecureJWTSecretForProduction2024WorkCloudVu!@#$%
```

### Security Settings
```bash
# Change default MongoDB password
MONGO_INITDB_ROOT_PASSWORD=YourSecurePassword123!

# Generate new JWT secret
JWT_SECRET=$(openssl rand -base64 64)
```

## 🗄️ Database Setup

### Default Admin User
- **Email**: `admin@work.cloud.vu`
- **Password**: `admin123` (change immediately!)
- **Role**: Administrator

### First Login Steps
1. Navigate to `https://work.cloud.vu`
2. Login with default credentials
3. Change admin password immediately
4. Create additional user accounts
5. Configure user roles and departments

## 🐳 Docker Services

### Service Overview
- **nginx**: Reverse proxy with SSL termination
- **backend**: Node.js API server
- **mongodb**: Database with authentication
- **certbot**: SSL certificate management
- **backup**: Automated database backups
- **watchtower**: Automatic container updates

### Service Management
```bash
cd /opt/work

# View all services
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Restart specific service
docker-compose -f docker-compose.prod.yml restart nginx

# Update all services
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Application health
curl https://work.cloud.vu/health

# Service status
systemctl status work-app

# Container status
docker-compose -f /opt/work/docker-compose.prod.yml ps
```

### Log Management
```bash
# Application logs
tail -f /opt/work/logs/production.log

# Nginx logs
tail -f /opt/work/logs/nginx/access.log

# Container logs
docker-compose -f /opt/work/docker-compose.prod.yml logs -f backend
```

### Automated Backups
- **Database**: Daily at 2:00 AM
- **Location**: `/opt/work/backups/`
- **Retention**: 7 days
- **Cron Job**: Automatically configured

### Manual Backup
```bash
cd /opt/work
docker-compose -f docker-compose.prod.yml run --rm backup
```

### Restore from Backup
```bash
# List available backups
ls -la /opt/work/backups/

# Restore specific backup
cd /opt/work/backups
tar -xzf 20240708_120000_feature_matrix_backup.tar.gz
mongorestore --host mongodb:27017 --username admin --password SecurePassword2024! --authenticationDatabase admin --drop ./20240708_120000/feature-matrix
```

## 🔄 Updates & Maintenance

### Application Updates
```bash
cd /opt/work
git pull origin main
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### SSL Certificate Renewal
```bash
# Manual renewal
docker-compose -f docker-compose.prod.yml run --rm certbot renew
docker-compose -f docker-compose.prod.yml restart nginx

# Automatic renewal is configured via cron
```

### Security Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose -f /opt/work/docker-compose.prod.yml pull
docker-compose -f /opt/work/docker-compose.prod.yml up -d
```

## 🛡️ Security Considerations

### Firewall Configuration
```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# iptables
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

### Security Headers
All security headers are configured in nginx.conf:
- HSTS
- XSS Protection
- Content Type Options
- Frame Options
- CSP

### Rate Limiting
- API endpoints: 10 requests/second
- Login attempts: 5 requests/minute
- Configured in nginx.conf

## 🚨 Troubleshooting

### Common Issues

**1. SSL Certificate Issues**
```bash
# Check certificate validity
openssl x509 -in /opt/work/ssl/work.cloud.vu.crt -text -noout

# Regenerate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /opt/work/ssl/work.cloud.vu.key \
  -out /opt/work/ssl/work.cloud.vu.crt \
  -subj "/C=DE/ST=Bavaria/L=Munich/O=Cloud.vu/CN=work.cloud.vu"
```

**2. Database Connection Issues**
```bash
# Check MongoDB status
docker-compose -f /opt/work/docker-compose.prod.yml exec mongodb mongo --eval "db.adminCommand('ismaster')"

# Reset MongoDB password
docker-compose -f /opt/work/docker-compose.prod.yml exec mongodb mongo admin --eval "db.changeUserPassword('admin', 'NewPassword123!')"
```

**3. Application Not Starting**
```bash
# Check container logs
docker-compose -f /opt/work/docker-compose.prod.yml logs backend

# Restart all services
docker-compose -f /opt/work/docker-compose.prod.yml down
docker-compose -f /opt/work/docker-compose.prod.yml up -d
```

**4. Permission Issues**
```bash
# Fix ownership
sudo chown -R 1001:1001 /opt/work
sudo chmod +x /opt/work/scripts/*.sh
```

## 📞 Support

### Log Locations
- Application: `/opt/work/logs/production.log`
- Nginx: `/opt/work/logs/nginx/`
- Docker: `docker-compose logs`
- System: `/var/log/syslog`

### Useful Commands
```bash
# Service status
systemctl status work-app

# Restart application
systemctl restart work-app

# View resource usage
docker stats

# Container shell access
docker-compose -f /opt/work/docker-compose.prod.yml exec backend sh
```

---

## 🎯 Post-Deployment Checklist

- [ ] Application accessible at https://work.cloud.vu
- [ ] SSL certificate valid and trusted
- [ ] Admin login working
- [ ] Database connection established
- [ ] Backup system functional
- [ ] Monitoring setup complete
- [ ] DNS records configured
- [ ] Firewall rules applied
- [ ] Default passwords changed
- [ ] User accounts created

**🎉 Your Feature Matrix application is now live at https://work.cloud.vu!**