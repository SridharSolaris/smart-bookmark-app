# Smart Bookmark Manager

A modern, real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS. Save, organize, and sync your favorite links across all your devices instantly.

## Features

✨ **Authentication**

- Google OAuth sign-in (no email/password required)
- Secure session management

📍 **Bookmarks**

- Add bookmarks with title and URL
- Delete your own bookmarks
- Private bookmarks (only visible to you)

⚡ **Real-Time Sync**

- Bookmarks update across all tabs/devices instantly
- Open multiple tabs and see changes live
- No page refresh needed

🎨 **Modern UI**

- Clean, intuitive interface
- Tailwind CSS styling
- Mobile-responsive design

🔒 **Privacy & Security**

- End-to-end encryption via Supabase
- Row-level security (RLS) policies
- Your data is private and secure

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Google OAuth application credentials
- Vercel account (for deployment)

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Copy your project URL and anon key
4. Go to SQL Editor and run the SQL from `supabase-setup.sql`

### 2. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.vercel.app/auth/callback`
6. Copy the Client ID

### 3. Configure Supabase OAuth

1. In Supabase dashboard, go to Settings > OAuth Providers
2. Enable Google
3. Paste your Google Client ID
4. Save

### 4. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd smart-bookmark-app

# Install dependencies
npm install

# Create .env.local
```

### 5. Configure Environment Variables

Create `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_REDIRECT_URL=https://your-domain.vercel.app`
5. Click Deploy

### 3. Update Supabase OAuth Redirect URI

In Supabase settings, add your production URL:
`https://your-vercel-domain.vercel.app/auth/callback`

### 4. Update Google OAuth Redirect URI

In Google Cloud Console, add:
`https://your-vercel-domain.vercel.app/auth/callback`

## Project Structure

```
smart-bookmark-app/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── callback/route.js      # OAuth callback handler
│   │   ├── components/
│   │   │   ├── AuthButtons.js         # Login/logout buttons
│   │   │   ├── BookmarkForm.js        # Add bookmark form
│   │   │   └── BookmarkList.js        # Display bookmarks
│   │   ├── layout.js                   # Root layout with auth provider
│   │   ├── page.js                     # Main page
│   │   ├── providers.js                # Auth context provider
│   │   ├── useBookmarks.js             # Bookmark management hook
│   │   └── globals.css                 # Global styles
│   └── lib/
│       └── supabase.js                 # Supabase client
├── public/                             # Static files
├── supabase-setup.sql                  # Database schema
├── .env.local                          # Local environment variables
├── .env.production                     # Production environment variables
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.js
└── vercel.json
```

## How It Works

### Authentication Flow

1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. After approval, redirected to `/auth/callback`
4. Supabase exchanges authorization code for session
5. Session stored in browser

### Real-Time Bookmark Sync

1. When user adds/deletes bookmark, it's saved to Supabase
2. Supabase broadcasts change via Realtime channel
3. All connected clients receive update
4. UI automatically updates without refresh

### Privacy & Security

- Each user can only see their own bookmarks (RLS policies)
- Sessions are secure and encrypted
- All data transmitted over HTTPS

## Database Schema

```sql
table bookmarks {
  id: bigint (primary key)
  user_id: uuid (references auth.users)
  title: text (required)
  url: text (required)
  created_at: timestamp
  updated_at: timestamp
}
```

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:** Make sure `.env.local` file exists and has correct values:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000
```

### Issue: Google OAuth not working

**Solution:**

- Verify redirect URLs match exactly in Google Console and Supabase
- Check that Google+ API is enabled
- Ensure Client ID is correct

### Issue: Bookmarks not appearing in real-time

**Solution:**

- Check browser console for errors
- Verify Realtime is enabled in Supabase
- Try refreshing the page (should still work without refresh)

### Issue: Deployed app shows blank page

**Solution:**

- Check Vercel logs for errors
- Verify environment variables in Vercel dashboard
- Ensure production redirect URLs are configured correctly

## Tech Stack

- **Frontend:** Next.js 16 with App Router, React 19
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Google OAuth)
- **Styling:** Tailwind CSS 4
- **Real-time:** Supabase Realtime
- **Deployment:** Vercel

## License

MIT

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review Supabase documentation: https://supabase.com/docs
3. Check Next.js documentation: https://nextjs.org/docs

## Future Enhancements

- [ ] Bookmark categories/tags
- [ ] Search and filter functionality
- [ ] Export bookmarks as HTML/JSON
- [ ] Dark mode toggle
- [ ] Bookmark descriptions
- [ ] Sharing bookmarks with other users
- [ ] Browser extension
- [ ] Mobile app

---

Built with ❤️ using Next.js and Supabase
