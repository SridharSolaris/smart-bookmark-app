# Smart Bookmark App

A simple and clean bookmark management application built with Next.js and Supabase.

## 🔗 Live Demo & Repository

- **Live URL:** [Add your Vercel deployment URL here]
- **GitHub Repository:** [Add your GitHub repo URL here]

## Features

- **Google OAuth Authentication** - Sign in with Google account
- **Bookmark Management** - Create, view, and delete bookmarks
- **Real-time Sync** - Changes sync instantly across all tabs/devices
- **Private Bookmarks** - Each user can only see their own bookmarks
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **Authentication:** Google OAuth via Supabase
- **Deployment:** Vercel

## Problems Encountered & Solutions

### 1. **Input Text Visibility Issue**

**Problem:** Text typed in input fields was very light and barely visible, causing poor user experience.

**Solution:**

- Added `text-gray-900` class to all input fields for dark, readable text
- Applied `placeholder:text-gray-400` for lighter placeholder text
- Ensured proper contrast between input text and background

### 2. **Real-time Updates Not Working Instantly**

**Problem:** When adding or deleting bookmarks, the UI required manual page reload to show changes.

**Solution:**

- Implemented **optimistic UI updates** in `useBookmarks.js`
- `addBookmark` now immediately updates state after successful database insert
- `deleteBookmark` removes item from UI before database operation completes
- Added duplicate prevention logic in real-time subscription handler
- Enabled Supabase Realtime subscriptions for cross-tab/device sync

### 3. **Code Complexity**

**Problem:** Code had complex patterns (Proxy patterns, inline styles, Material UI hex codes) that would be hard for a mentor to understand.

**Solution:**

- Simplified Supabase client to use direct initialization instead of Proxy pattern
- Added comprehensive JSDoc comments to every function and component
- Replaced Material UI hex colors with semantic Tailwind classes
- Organized code with clear separation of concerns (data layer, business logic, UI)

### 4. **Syntax Errors**

**Problem:** Malformed syntax statements caused compilation errors

**Solution:**

- Fixed comment to be on separate line
- Removed duplicate event handler code that was causing conflicts
- Properly structured the `useEffect` cleanup function

### 5. **Build Warnings**

**Problem:** CSS warnings for `@theme` rule and `appearance` property.

**Solution:**

- Warnings are non-critical (Tailwind 4 features)
- Don't affect functionality or build success
- Left as-is since they don't impact production deployment

## Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── AuthButtons.js   # Sign in/out buttons
│   │   ├── BookmarkForm.js  # Add bookmark form
│   │   └── BookmarkList.js  # Display bookmarks
│   ├── auth/
│   │   └── callback/        # OAuth callback handler
│   │       └── route.js
│   ├── page.js             # Main page
│   ├── layout.js           # App layout
│   ├── providers.js        # Auth context provider
│   ├── useBookmarks.js     # Bookmarks hook
│   └── globals.css         # Global styles
└── lib/
    └── supabase.js         # Supabase client
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own bookmarks
CREATE POLICY "Users can view own bookmarks"
ON bookmarks FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own bookmarks
CREATE POLICY "Users can insert own bookmarks"
ON bookmarks FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
ON bookmarks FOR DELETE
USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
```

### 4. Configure Google OAuth

1. Go to Google Cloud Console
2. Create OAuth credentials
3. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-supabase-url.supabase.co/auth/v1/callback`
4. Add credentials to Supabase Dashboard → Authentication → Providers → Google

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

### Authentication Flow

1. User clicks "Sign In" button
2. Redirects to Google OAuth
3. Google redirects back to `/auth/callback`
4. Callback route exchanges code for session
5. User is logged in and redirected to home

### Bookmark Operations

1. **Create:** Form validates input → inserts to database → real-time updates list
2. **Read:** Fetches user's bookmarks on mount → subscribes to real-time changes
3. **Delete:** Confirms deletion → removes from database → real-time updates list

### Real-time Sync

- Uses Supabase Realtime subscriptions
- Listens for INSERT, UPDATE, DELETE events
- Automatically updates UI when data changes
- Works across multiple tabs/devices

## Development Best Practices

- **Component Organization:** Each component has a single responsibility
- **Clear Comments:** Every function and section is documented
- **Error Handling:** Try-catch blocks with user-friendly error messages
- **Loading States:** Visual feedback during async operations
- **Security:** Row Level Security ensures data privacy

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit - Smart Bookmark App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/smart-bookmark-app.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project settings

3. **Add Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add the following:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     NEXT_PUBLIC_REDIRECT_URL=https://your-app.vercel.app
     ```

4. **Update Google OAuth Settings:**
   - Go to Google Cloud Console → Credentials
   - Add authorized redirect URI:
     - `https://your-supabase-project.supabase.co/auth/v1/callback`
   - Add authorized origin:
     - `https://your-app.vercel.app`

5. **Update Supabase Redirect URLs:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add Site URL: `https://your-app.vercel.app`
   - Add Redirect URL: `https://your-app.vercel.app/**`

6. **Deploy:**
   - Vercel will automatically deploy on push to main branch
   - Your app will be live at `https://your-app.vercel.app`

### Testing Your Deployed App

Once deployed, test the following:

- ✅ Google OAuth login works
- ✅ Bookmarks can be added
- ✅ Bookmarks can be deleted
- ✅ Changes sync across multiple browser tabs
- ✅ Each user only sees their own bookmarks

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
