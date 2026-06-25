# IT Support Ticketing System - Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Clone Repository
```bash
git clone https://github.com/KHALIFAH0091/It-support.git
cd It-support
```

### 2. Run Installation Script
```bash
sudo bash install.sh
```

### 3. Configure Database
Edit `hesk_settings.inc.php`:
```php
$hesk_settings['db_host']='localhost';
$hesk_settings['db_name']='hesk_db';
$hesk_settings['db_user']='hesk_user';
$hesk_settings['db_pass']='your_secure_password';
```

### 4. Create Database
```sql
CREATE DATABASE hesk_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'hesk_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON hesk_db.* TO 'hesk_user'@'localhost';
FLUSH PRIVILEGES;
```

### 5. Access Installation Wizard
Navigate to: `http://yourdomain.com/helpdesk/admin/install/`

## 📋 Features

✅ **Ticket Management** - Create, track, and resolve support tickets
✅ **Knowledge Base** - Self-service customer support articles
✅ **Multi-language Support** - Support multiple languages
✅ **Email Integration** - SMTP, IMAP, POP3 support
✅ **Customer Accounts** - Optional customer registration
✅ **Admin Dashboard** - Powerful management interface
✅ **Security** - Multi-factor authentication support
✅ **Attachments** - Support for ticket attachments
✅ **Ratings & Feedback** - Customer satisfaction tracking
✅ **Barcode Support** - Generate barcodes for tickets

## 🌐 Access Points

| Function | URL |
|----------|-----|
| Customer Portal | `/` |
| Admin Panel | `/admin/` |
| Knowledge Base | `/knowledgebase.php` |
| Submit Ticket | `/submit_ticket.php` |
| My Tickets | `/my_tickets.php` |
| Login | `/login.php` |
| Register | `/register.php` |

## 🔐 Default Security Settings

- SPAM Prevention: Enabled
- Security Image: Enabled
- Multi-factor Authentication: Disabled
- SSL/HTTPS: Disabled (enable for production)

## 📁 Directory Structure

```
It-support/
├── admin/               # Admin panel
├── attachments/         # Ticket attachments (writable)
├── cache/              # Cache files (writable)
├── hesk_settings.inc.php  # Configuration file
├── index.php           # Customer portal
├── login.php           # Login page
├── submit_ticket.php   # Ticket submission
├── knowledgebase.php   # Knowledge base
├── autoload.php        # Auto-loader
├── .htaccess           # Apache configuration
├── composer.json       # PHP dependencies
├── install.sh          # Installation script
├── SETUP_GUIDE.md      # Detailed setup guide
└── README.md           # This file
```

## 🛠️ Customization

### Change Site Title
```php
$hesk_settings['site_title']='Your Company Name';
$hesk_settings['hesk_title']='Your Help Desk Name';
```

### Enable HTTPS
```php
$hesk_settings['force_ssl']=1;
```

### Enable Customer Accounts
```php
$hesk_settings['customer_accounts']=1;
```

### Configure Email
```php
$hesk_settings['smtp']=1;
$hesk_settings['smtp_host_name']='mail.yourdomain.com';
$hesk_settings['smtp_host_port']=587;
$hesk_settings['smtp_user']='your_email@domain.com';
$hesk_settings['smtp_password']='your_password';
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Verify MySQL is running
sudo systemctl status mysql

# Test connection
mysql -h localhost -u hesk_user -p hesk_db
```

### Permission Denied
```bash
# Fix permissions
sudo bash install.sh

# Or manually:
sudo chmod 777 attachments
sudo chmod 777 cache
```

### White Blank Page
Enable debug mode:
```php
$hesk_settings['debug_mode']=1;
```

Check Apache error logs:
```bash
tail -f /var/log/apache2/error.log
```

## 📚 Additional Resources

- **Official HESK Website**: https://www.hesk.com/
- **GitHub Repository**: https://github.com/KHALIFAH0091/It-support
- **PHP Documentation**: https://www.php.net/
- **Apache Documentation**: https://httpd.apache.org/

## 📝 License

This project is based on HESK (Help Desk) ticketing system.

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ⚠️ Production Deployment Checklist

- [ ] Enable HTTPS (`$hesk_settings['force_ssl']=1;`)
- [ ] Disable debug mode (`$hesk_settings['debug_mode']=0;`)
- [ ] Set strong database password
- [ ] Configure SMTP for email notifications
- [ ] Set up regular database backups
- [ ] Enable automated backups for attachments
- [ ] Configure firewall rules
- [ ] Set up SSL certificate
- [ ] Enable automatic updates (if available)
- [ ] Configure admin account security

## 📞 Support

For issues and questions:
1. Check SETUP_GUIDE.md for detailed instructions
2. Review HESK official documentation
3. Check GitHub Issues
4. Open a new issue with detailed information

---

**Last Updated**: 2026-06-25
**HESK Version**: 3.7.10
**Maintained By**: KHALIFAH0091
