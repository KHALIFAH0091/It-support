# IT Support Ticketing System - Setup Guide

## Prerequisites
- PHP 7.4 or higher
- MySQL/MariaDB database
- Apache web server with mod_rewrite enabled
- Git (for version control)

## Database Setup

### 1. Create Database and User

```sql
CREATE DATABASE hesk_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'hesk_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON hesk_db.* TO 'hesk_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Import Initial Schema

Execute the HESK database initialization script (check `admin/install/` directory for SQL files).

## Directory Structure & Permissions

Create required directories with proper permissions:

```bash
# Create directories
mkdir -p attachments
mkdir -p cache
mkdir -p admin

# Set permissions (755 = read/execute for all, write for owner)
chmod 755 attachments
chmod 755 cache
chmod 755 admin
chmod 755 .

# Make directories writable
chmod 777 attachments
chmod 777 cache
```

## File Configuration

### 1. Update hesk_settings.inc.php

**Database Credentials:**
```php
$hesk_settings['db_host']='localhost';
$hesk_settings['db_name']='hesk_db';
$hesk_settings['db_user']='hesk_user';
$hesk_settings['db_pass']='secure_password_here';
```

**Site Settings:**
```php
$hesk_settings['site_title']='Your Company Name';
$hesk_settings['site_url']='http://yourdomain.com';
$hesk_settings['hesk_title']='Support Center';
$hesk_settings['hesk_url']='http://yourdomain.com/helpdesk';
$hesk_settings['webmaster_mail']='admin@yourdomain.com';
```

### 2. Apache Configuration

Ensure `.htaccess` file exists and mod_rewrite is enabled:

```bash
# Enable mod_rewrite
sudo a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2
```

## Installation Steps

### Step 1: Clone Repository
```bash
git clone https://github.com/KHALIFAH0091/It-support.git helpdesk
cd helpdesk
```

### Step 2: Run Installation Script
```bash
sudo bash install.sh
```

### Step 3: Configure Settings
Edit `hesk_settings.inc.php` with your database and site details.

### Step 4: Run Installation
Access installation wizard:
```
http://yourdomain.com/helpdesk/admin/install/
```

OR use command line if available:
```bash
php admin/install/index.php
```

### Step 5: Create Admin Account
During installation, create your administrator account with:
- Username
- Password
- Email address

### Step 6: Verify Installation
```bash
# Check file ownership
ls -la attachments/ cache/

# Verify database connection works
php -r "require 'hesk_settings.inc.php'; echo 'Settings loaded successfully';"
```

## Access the System

| Interface | URL |
|-----------|-----|
| **Customer Portal** | `http://yourdomain.com/helpdesk/` |
| **Admin Panel** | `http://yourdomain.com/helpdesk/admin/` |
| **Knowledge Base** | `http://yourdomain.com/helpdesk/knowledgebase.php` |
| **Ticket Submission** | `http://yourdomain.com/helpdesk/submit_ticket.php` |

## First Login

1. Navigate to Admin Panel: `/helpdesk/admin/`
2. Enter admin credentials created during installation
3. Configure help desk categories, staff, and other settings

## Email Configuration (Optional)

For automated email notifications, configure SMTP in `hesk_settings.inc.php`:

```php
$hesk_settings['smtp']=1;
$hesk_settings['smtp_host_name']='mail.yourdomain.com';
$hesk_settings['smtp_host_port']=587;
$hesk_settings['smtp_enc']='tls';
$hesk_settings['smtp_user']='helpdesk@yourdomain.com';
$hesk_settings['smtp_password']='email_password';
```

## Security Recommendations

1. **Change default SPAM question** (line 106):
```php
$hesk_settings['question_ask']='Your custom security question';
$hesk_settings['question_ans']='answer';
```

2. **Enable HTTPS**:
```php
$hesk_settings['force_ssl']=1;
```

3. **Set strong database password**

4. **Regularly backup database and attachments**

## Troubleshooting

### Cannot Connect to Database
- Verify MySQL/MariaDB is running
- Check database credentials in `hesk_settings.inc.php`
- Verify user has proper permissions

### Permission Denied Errors
```bash
chmod 777 attachments
chmod 777 cache
```

### Blank Page or White Screen
- Enable debug mode in `hesk_settings.inc.php`:
```php
$hesk_settings['debug_mode']=1;
```
- Check PHP error logs
- Verify PHP version compatibility

### Images/CSS Not Loading
- Check `.htaccess` file exists
- Verify Apache mod_rewrite is enabled
- Check file permissions (should be 644)

## Support & Documentation

- **HESK Official**: https://www.hesk.com/
- **GitHub Repository**: https://github.com/KHALIFAH0091/It-support
- **Community Forum**: Check official HESK documentation

## Next Steps

1. Create ticket categories
2. Add staff members
3. Set up email integration
4. Customize knowledge base
5. Configure automated responses
6. Enable customer accounts
7. Set up reporting and analytics

---

**Installation Date**: 2026-06-25
**HESK Version**: 3.7.10
**Repository**: KHALIFAH0091/It-support
