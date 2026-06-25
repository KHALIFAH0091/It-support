# Supabase + GitHub Setup Guide

## What is Supabase?

Supabase is a **free, open-source Firebase alternative** that provides:
- ✅ PostgreSQL database (free tier: 500MB)
- ✅ Instant REST API (no coding needed)
- ✅ Real-time subscriptions
- ✅ Authentication
- ✅ File storage

## Step 1: Create a Supabase Project

### 1.1 Go to Supabase
- Visit: https://supabase.com
- Click **"Start your project"**
- Sign up with GitHub (easiest!)

### 1.2 Create New Project
- Click **"New Project"**
- Fill in details:
  - **Project Name**: `it-support` (or your choice)
  - **Database Password**: Create a strong password (save this!)
  - **Region**: Select closest to you
- Click **"Create new project"** (takes 1-2 minutes)

## Step 2: Get Your API Keys

### 2.1 Find Your API Credentials
1. Once project is created, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon key** (public key, safe to share)

### 2.2 Save Your Keys
Create a new file: `web/config.js`

```javascript
// Supabase Configuration
const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

**Replace with your actual keys from Supabase!**

## Step 3: Create Database Tables

### 3.1 Open Supabase SQL Editor
1. In Supabase dashboard, click **"SQL Editor"**
2. Click **"New Query"**
3. Copy and paste the following SQL:

```sql
-- Create categories table
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tickets table
CREATE TABLE tickets (
    id BIGSERIAL PRIMARY KEY,
    ticket_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category_id BIGINT REFERENCES categories(id),
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO categories (name, description) VALUES
('General Support', 'General support inquiries'),
('Technical Issue', 'Technical problems and bugs'),
('Feature Request', 'New feature requests'),
('Account Issue', 'Account-related problems'),
('Billing', 'Billing and payment issues');

-- Enable RLS (Row Level Security) for public access
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view categories
CREATE POLICY "Allow public read" ON categories
    FOR SELECT USING (true);

-- Allow anyone to insert tickets
CREATE POLICY "Allow public insert" ON tickets
    FOR INSERT WITH CHECK (true);

-- Allow anyone to view tickets
CREATE POLICY "Allow public read" ON tickets
    FOR SELECT USING (true);
```

4. Click **"Run"** (⚡ button)
5. You should see: **"Success. No rows returned"**

## Step 4: Verify Tables

1. Click **"Table Editor"** in Supabase
2. You should see:
   - ✅ `categories` table (with 5 pre-filled rows)
   - ✅ `tickets` table (empty)

## Step 5: Update Your Web App

### 5.1 Update `web/index.html`
The web app is already set up to use Supabase! Just make sure `web/config.js` has your API keys.

### 5.2 Replace `web/app.js`
I'll provide an updated version that connects to Supabase instead of JSON files.

## Step 6: Test Everything

1. Open: `https://KHALIFAH0091.github.io/It-support/web/`
2. Fill out the ticket form
3. Click **"Submit Ticket"**
4. Check your Supabase dashboard → **Table Editor** → **tickets**
5. You should see your ticket!

## 🎉 You're Done!

Your system now has:
- ✅ **Database** (Supabase PostgreSQL)
- ✅ **API** (Supabase REST API - automatic!)
- ✅ **Web Interface** (GitHub Pages)
- ✅ **No server costs** (Supabase free tier)

## Free Tier Limits

| Feature | Limit |
|---------|-------|
| Storage | 500 MB |
| Bandwidth | 2 GB/month |
| Database Rows | Unlimited |
| API Calls | Unlimited |

## Cost After Free Tier

If you exceed free tier:
- **$5/month** = 10 GB storage + 50 GB bandwidth
- Perfect for small to medium projects

## Security Notes

1. **anon key** = Public (safe to use in JavaScript)
2. **service_role key** = Secret (never share!)
3. Row Level Security (RLS) controls access

## Troubleshooting

### "CORS Error" or "403 Forbidden"
1. Go to Supabase Settings → API
2. Scroll to **"CORS Configuration"**
3. Add: `https://KHALIFAH0091.github.io`
4. Save

### Tickets Not Saving
1. Check browser console (F12) for errors
2. Verify API keys in `config.js`
3. Check Supabase project is active

### Can't View Tables in Supabase
1. Go to **SQL Editor**
2. Run: `SELECT * FROM tickets;`
3. See if tables exist

## Next Steps

1. ✅ Create Supabase account
2. ✅ Copy API keys to `web/config.js`
3. ✅ Create database tables (SQL above)
4. ✅ Test the web interface
5. ✅ Share your GitHub Pages link: `https://KHALIFAH0091.github.io/It-support/web/`

## Support

- **Supabase Docs**: https://supabase.com/docs
- **GitHub Issues**: Report problems there
- **Supabase Discord**: Get help from community

---

**Setup Time**: ~5 minutes
**Cost**: FREE ✅
**Scalability**: Enterprise-grade ⭐

**Ready to go live!**
