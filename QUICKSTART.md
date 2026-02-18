# Smart Bookmark Manager - Quick Start

## 🚀 5-Minute Setup

### Prerequisites

- Node.js 18+
- Supabase account
- Google OAuth credentials

### Step 1: Supabase Setup (2 minutes)

1. Go to [supabase.com](https://supabase.com) → Create new project
2. In SQL Editor, run `supabase-setup.sql`
3. Go to Settings → API → Copy URL and anon key

### Step 2: Google OAuth (2 minutes)

1. [Google Cloud Console](https://console.cloud.google.com/) → Create project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add redirect URI: `http://localhost:3000/auth/callback`
5. Copy Client ID

### Step 3: Supabase OAuth Config (1 minute)

1. In Supabase: Settings → OAuth Providers → Enable Google
2. Paste your Google Client ID
3. Save

### Step 4: Local Development

```bash
# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000
EOF

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📦 Build for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## 🌐 Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables when prompted
```

### Option 2: GitHub + Vercel Dashboard

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Add environment variables
5. Deploy

### After Deployment

1. Update Supabase OAuth redirect URI with your Vercel URL
2. Update Google OAuth redirect URI with your Vercel URL
3. Test the app at your Vercel domain

## ✅ Features Checklist

- [x] Google OAuth Authentication
- [x] Add Bookmarks (title + URL)
- [x] Private Bookmarks (only visible to user)
- [x] Real-time Sync (no page refresh needed)
- [x] Delete Bookmarks
- [x] Responsive Design
- [x] Vercel Deployment Ready

## 🎯 Testing the Real-Time Feature

1. Open app in two browser tabs
2. Add a bookmark in one tab
3. See it appear instantly in the other tab (no refresh!)

## 🐛 Common Issues

| Issue                   | Solution                                 |
| ----------------------- | ---------------------------------------- |
| OAuth error             | Check redirect URIs match exactly        |
| Bookmarks not appearing | Verify Supabase RLS policies are created |
| API errors              | Check .env.local has correct values      |
| Blank page on Vercel    | Check environment variables in dashboard |

## 📚 Full Documentation

See [SETUP-GUIDE.md](./SETUP-GUIDE.md) for detailed instructions.

## 🎓 Code Structure

```
src/app/
├── page.js                    # Main page UI
├── layout.js                  # App layout with AuthProvider
├── providers.js               # Auth context
├── useBookmarks.js            # Bookmark state & real-time logic
├── auth/callback/route.js     # OAuth callback handler
├── components/
│   ├── AuthButtons.js         # Login/logout
│   ├── BookmarkForm.js        # Add new bookmark
│   └── BookmarkList.js        # Display bookmarks
└── globals.css                # Tailwind styles

src/lib/
└── supabase.js                # Supabase client
```

## 💡 Key Features Implemented

### Authentication

- Google OAuth via Supabase Auth
- Automatic session management
- Secure token handling

### Real-Time Sync

- Supabase Realtime subscriptions
- Instant updates across tabs
- No polling required

### Security

- Row-Level Security (RLS) policies
- Private bookmarks per user
- HTTPS encryption

### Styling

- Tailwind CSS 4.0
- Mobile responsive
- Modern UI components

## 🚢 Deployment Checklist

- [ ] Supabase project created
- [ ] Google OAuth configured
- [ ] Environment variables set
- [ ] App tested locally
- [ ] Code pushed to GitHub
- [ ] Vercel deployment linked
- [ ] Production environment variables set
- [ ] Production redirect URIs configured
- [ ] App working on Vercel URL

---

**Ready to go!** 🎉 Start adding bookmarks now!
