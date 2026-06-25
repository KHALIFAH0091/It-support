#!/bin/bash

# HESK Installation Script
# Automates directory creation and permission setup

echo "================================"
echo "HESK Installation Script"
echo "================================"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script should be run as root (sudo)"
   exit 1
fi

# Get current directory
HESK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Installation directory: $HESK_DIR"
echo ""

# Create required directories
echo "Creating required directories..."
mkdir -p "$HESK_DIR/attachments"
mkdir -p "$HESK_DIR/cache"
mkdir -p "$HESK_DIR/admin"

# Set directory permissions
echo "Setting directory permissions..."
chmod 755 "$HESK_DIR"
chmod 777 "$HESK_DIR/attachments"
chmod 777 "$HESK_DIR/cache"

# Set file permissions
echo "Setting file permissions..."
find "$HESK_DIR" -type f -name "*.php" -exec chmod 644 {} \;
find "$HESK_DIR" -type f -name "*.htaccess" -exec chmod 644 {} \;
find "$HESK_DIR" -type f -name "*.txt" -exec chmod 644 {} \;
find "$HESK_DIR" -type f -name "*.json" -exec chmod 644 {} \;

# Make script executable
chmod 755 "$HESK_DIR/install.sh"

echo ""
echo "================================"
echo "Installation Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Edit hesk_settings.inc.php with your database credentials"
echo "2. Create database using the SQL installation script"
echo "3. Access http://yourdomain.com/helpdesk/admin/install/"
echo "4. Follow the installation wizard"
echo ""
echo "Directory Status:"
echo "  ✓ attachments/ - $(ls -ld "$HESK_DIR/attachments" | awk '{print $1}' | tail -c 4) permissions"
echo "  ✓ cache/ - $(ls -ld "$HESK_DIR/cache" | awk '{print $1}' | tail -c 4) permissions"
echo "  ✓ admin/ - $(ls -ld "$HESK_DIR/admin" | awk '{print $1}' | tail -c 4) permissions"
echo ""
