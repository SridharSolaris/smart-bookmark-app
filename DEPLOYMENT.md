# Deployment Checklist

Follow these steps to deploy your Smart Bookmark App to Vercel.

## 📋 Prerequisites

- [x] Supabase project created
- [x] Database schema set up
- [x] Google OAuth credentials configured
- [x] App working locally

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new **public** repository named `smart-bookmark-app`
3. Don't initialize with README (we already have one)
4. Copy the repository URL

### Step 2: Push Code to GitHub

```bash
# Navigate to your project directory
cd c:\Users\SRIDHAR\Downloads\tryhard\smart-bookmark-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Smart Bookmark App"

# Add remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/smart-bookmark-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click **"Add New Project"**
4. Click **"Import"** next to your `smart-bookmark-app` repository
5. Click **"Deploy"** (keep default settings for now)

### Step 4: Add Environment Variables

1. After initial deployment, go to **Project Settings → Environment Variables**
2. Add these variables (from your `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_REDIRECT_URL=https://your-app.vercel.app
```

3. Click **"Save"**
4. Go to **Deployments** tab
5. Click **"Redeploy"** to apply environment variables

### Step 5: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs:**
   ```
   https://YOUR_SUPABASE_PROJECT.supabase.co/auth/v1/callback
   ```
4. Add to **Authorized JavaScript origins:**
   ```
   https://your-app.vercel.app
   ```
5. Click **"Save"**

### Step 6: Update Supabase Settings

1. Go to your Supabase Dashboard
2. Navigate to **Authentication → URL Configuration**
3. Update **Site URL:** `https://your-app.vercel.app`
4. Add **Redirect URLs:** `https://your-app.vercel.app/**`
5. Click **"Save"**

### Step 7: Update README with URLs

1. Open `README.md`
2. Replace placeholders:
   ```markdown
   - **Live URL:** https://your-app.vercel.app
   - **GitHub Repository:** https://github.com/YOUR_USERNAME/smart-bookmark-app
   ```
3. Commit and push:
   ```bash
   git add README.md
   git commit -m "Add deployment URLs to README"
   git push
   ```

## ✅ Testing Checklist

After deployment, test these features:

- [ ] Visit your live Vercel URL
- [ ] Click "Sign In" button
- [ ] Sign in with Google account
- [ ] Add a new bookmark
- [ ] Verify bookmark appears instantly
- [ ] Delete a bookmark
- [ ] Verify deletion reflects immediately
- [ ] Open app in another tab
- [ ] Add bookmark in one tab, verify it appears in other tab
- [ ] Sign out and verify you're redirected to landing page

## 🔧 Troubleshooting

### Issue: OAuth redirect error

**Solution:** Verify Google OAuth redirect URIs match exactly (including https://)

### Issue: Database connection error

**Solution:** Check environment variables in Vercel are correct (no extra spaces)

### Issue: Changes not syncing

**Solution:** Verify Realtime is enabled for `bookmarks` table in Supabase

### Issue: Build fails on Vercel

**Solution:** Check build logs, ensure all dependencies are in package.json

## 📝 Submission

Once everything works, submit:

1. ✅ **Live Vercel URL:** `https://your-app.vercel.app`
2. ✅ **GitHub Repository:** `https://github.com/YOUR_USERNAME/smart-bookmark-app` (must be public)
3. ✅ **README.md:** Includes problems & solutions section

---

**Need help?** Check the main [README.md](README.md) for detailed setup instructions.
