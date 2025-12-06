# Production Setup Guide

## Important: Data Persistence in Production

### Current Setup (Temporary Solution)
The application now uses **in-memory storage** in production environments. This means:
- ✅ CRUD operations work on mobile and desktop
- ⚠️ Data is stored in memory and will be lost on server restart
- ⚠️ Each serverless function instance has its own memory

### Recommended: Use a Database

For permanent data persistence, you should use a database. Here are the recommended options:

#### Option 1: Vercel Postgres (Recommended for Vercel)
```bash
# Install Vercel Postgres
npm install @vercel/postgres
```

**How to get POSTGRES_URL:**
1. Deploy to Vercel
2. Go to Storage tab → Create Database → Postgres
3. Vercel automatically adds POSTGRES_URL to your environment

📖 **Detailed guide:** See `DATABASE_SETUP_GUIDE.md`

#### Option 2: MongoDB Atlas (Free Tier Available)
```bash
# Install MongoDB
npm install mongodb
```

**How to get MONGODB_URI:**
1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string from "Connect" button

📖 **Detailed guide:** See `DATABASE_SETUP_GUIDE.md`

#### Option 3: Supabase (Free Tier Available)
```bash
# Install Supabase
npm install @supabase/supabase-js
```

**How to get Supabase credentials:**
1. Sign up at supabase.com
2. Create new project
3. Get URL and key from Project Settings → API

📖 **Detailed guide:** See `DATABASE_SETUP_GUIDE.md`

## Quick Fix: Environment Variables

Add this to your production environment variables:

```env
NODE_ENV=production
```

## Testing Before Deployment

1. **Test locally in production mode:**
```bash
npm run build
npm start
```

2. **Verify CRUD operations work:**
   - Add a project
   - Edit a project
   - Delete a project
   - Test on mobile viewport

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Cloudinary credentials added
- [ ] Admin credentials set
- [ ] Test CRUD operations locally
- [ ] Deploy to production
- [ ] Test CRUD operations on live site
- [ ] Test on mobile devices

## Known Limitations

### In-Memory Storage
- Data persists only during server runtime
- Data is lost on:
  - Server restart
  - Redeployment
  - Serverless function cold start (on some platforms)

### Solution
Implement a proper database using one of the options above for production use.

## Need Help?

### Step-by-Step Database Setup
📖 **See `DATABASE_SETUP_GUIDE.md`** for detailed instructions with screenshots

### Official Documentation
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Supabase Documentation](https://supabase.com/docs)

### Quick Answer
**Don't need a database yet?** Your app works perfectly without one! Deploy now, add database later when you need permanent storage.
