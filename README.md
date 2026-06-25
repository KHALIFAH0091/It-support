# IT Support Ticketing System

**A complete support ticketing system using GitHub + Supabase**

## 🚀 Quick Start

### Prerequisites
- GitHub account (you already have this!)
- Supabase account (free at https://supabase.com)

### Setup (5 minutes)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Sign up with GitHub
   - Create new project

2. **Get API Keys**
   - Project Settings → API
   - Copy `Project URL` and `anon key`

3. **Configure App**
   - Edit `web/config.js`
   - Replace `YOUR_PROJECT_URL` and `YOUR_ANON_KEY`

4. **Create Database**
   - Follow instructions in `SUPABASE_SETUP.md`

5. **Deploy**
   - Enable GitHub Pages (Settings → Pages)
   - Access: `https://KHALIFAH0091.github.io/It-support/web/`

## 📋 Features

✅ **Submit Support Tickets** - Easy form to report issues
✅ **Ticket Tracking** - View all tickets in real-time
✅ **Status Filtering** - Filter by open/closed status
✅ **Categories** - Organize tickets by category
✅ **Auto ID Generation** - Unique ticket IDs
✅ **Timestamps** - Track when tickets were created
✅ **Responsive Design** - Works on mobile & desktop
✅ **No Server Costs** - Free Supabase tier

## 🌐 Architecture

```
GitHub Pages (Frontend)
        ↓
   HTML/CSS/JS
        ↓
   Supabase API
        ↓
 PostgreSQL Database
```

## 📂 Project Structure

```
It-support/
├── web/
│   ├── index.html       # Main interface
│   ├── app.js           # Supabase integration
│   ├── config.js        # API credentials
│   └── style.css        # Styling
├── SUPABASE_SETUP.md    # Setup guide
├── composer.json        # PHP config
└── README.md            # This file
```n
## 🔐 Security

- **Row Level Security** - Only public access to read/insert
- **CORS Configured** - Your GitHub Pages URL
- **No Passwords** - Uses Supabase's public anon key

## 💰 Cost

**Free Forever** (for small projects):
- ✅ Unlimited API calls
- ✅ Unlimited database rows
- ✅ 500 MB storage
- ✅ 2 GB bandwidth/month

**Paid Plans** (when you scale):
- $5/month = 10 GB storage + 50 GB bandwidth
- Pay as you grow

## 🆘 Support

- **Setup Issues?** Read `SUPABASE_SETUP.md`
- **Questions?** Check `web/config.js` comments
- **GitHub Issues**: Report bugs here

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [GitHub Pages Docs](https://pages.github.com)
- [REST API Guide](https://supabase.com/docs/guides/api)

## 🎯 Next Steps

1. ✅ Fork/clone this repo
2. ✅ Create Supabase account
3. ✅ Follow SUPABASE_SETUP.md
4. ✅ Update web/config.js
5. ✅ Enable GitHub Pages
6. ✅ Share your link!

---

**Made with ❤️ using GitHub + Supabase**

*No servers. No databases. No costs. Just pure web magic.* ✨
