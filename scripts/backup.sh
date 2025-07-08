#!/bin/bash

# MongoDB Backup Script for Production
set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups"
MONGO_HOST="${MONGO_HOST:-mongodb}"
MONGO_PORT="${MONGO_PORT:-27017}"
MONGO_DATABASE="${MONGO_DATABASE:-feature-matrix}"
MONGO_USERNAME="${MONGO_USERNAME:-admin}"
MONGO_PASSWORD="${MONGO_PASSWORD}"

# Create backup directory
mkdir -p "$BACKUP_DIR/$TIMESTAMP"

echo "Starting MongoDB backup at $(date)"

# Create database dump
mongodump \
  --host="$MONGO_HOST:$MONGO_PORT" \
  --username="$MONGO_USERNAME" \
  --password="$MONGO_PASSWORD" \
  --authenticationDatabase=admin \
  --db="$MONGO_DATABASE" \
  --out="$BACKUP_DIR/$TIMESTAMP"

# Compress backup
cd "$BACKUP_DIR"
tar -czf "${TIMESTAMP}_feature_matrix_backup.tar.gz" "$TIMESTAMP"
rm -rf "$TIMESTAMP"

echo "Backup completed: ${TIMESTAMP}_feature_matrix_backup.tar.gz"

# Clean up old backups (keep last 7 days)
find "$BACKUP_DIR" -name "*_feature_matrix_backup.tar.gz" -mtime +7 -delete

# Log backup info
echo "$(date): Backup $TIMESTAMP completed successfully" >> "$BACKUP_DIR/backup.log"

echo "Backup process finished at $(date)"