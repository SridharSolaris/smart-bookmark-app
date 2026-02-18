# Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER'S BROWSER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         React Components (Client-Side)                   │  │
│  │                                                           │  │
│  │   ┌─────────────────────────────────────────────────┐   │  │
│  │   │  Page.js (Main)                                │   │  │
│  │   │  ├─ AuthButtons (Sign in/out)                 │   │  │
│  │   │  ├─ BookmarkForm (Add bookmark)               │   │  │
│  │   │  └─ BookmarkList (Display bookmarks)          │   │  │
│  │   └─────────────────────────────────────────────────┘   │  │
│  │                      ↓                                    │  │
│  │   ┌─────────────────────────────────────────────────┐   │  │
│  │   │  Hooks & Context                               │   │  │
│  │   │  ├─ useAuth() - authentication state           │   │  │
│  │   │  ├─ useBookmarks() - bookmark state            │   │  │
│  │   │  ├─ Realtime subscriptions                     │   │  │
│  │   │  └─ Form validation                            │   │  │
│  │   └─────────────────────────────────────────────────┘   │  │
│  │                      ↓                                    │  │
│  │   ┌─────────────────────────────────────────────────┐   │  │
│  │   │  Tailwind CSS Styling                          │   │  │
│  │   │  ├─ responsive design                          │   │  │
│  │   │  ├─ mobile first                               │   │  │
│  │   │  └─ modern UI                                  │   │  │
│  │   └─────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
        │                                           │
        │ HTTP/HTTPS                                │ Realtime
        ↓                                           ↓
┌──────────────────────────────────────────────────────────────────┐
│                  NEXT.JS SERVER (App Router)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Routes                                                  │   │
│  │  ├─ / (Main page)                                       │   │
│  │  ├─ /auth/callback (OAuth callback)                     │   │
│  │  └─ API routes (reserved for future APIs)               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                      ↓                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Middleware                                              │   │
│  │  ├─ Session validation                                  │   │
│  │  ├─ User authentication                                 │   │
│  │  └─ Error handling                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
        │                                           │
        │ HTTPS                                     │ Realtime
        ↓                                           ↓
┌──────────────────────────────────────────────────────────────────┐
│              SUPABASE (Backend + Database)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Authentication                                          │   │
│  │  ├─ Google OAuth 2.0                                    │   │
│  │  ├─ Session management                                  │   │
│  │  └─ User profiles                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                      ↓                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database                                     │   │
│  │  ├─ bookmarks table                                      │   │
│  │  │  ├─ id (primary key)                                │   │
│  │  │  ├─ user_id (FK to auth.users)                      │   │
│  │  │  ├─ title (text)                                    │   │
│  │  │  ├─ url (text)                                      │   │
│  │  │  ├─ created_at (timestamp)                          │   │
│  │  │  └─ updated_at (timestamp)                          │   │
│  │  │                                                      │   │
│  │  └─ Row-Level Security (RLS)                            │   │
│  │     ├─ SELECT policy                                    │   │
│  │     ├─ INSERT policy                                    │   │
│  │     ├─ UPDATE policy                                    │   │
│  │     └─ DELETE policy                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                      ↓                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Realtime Engine                                         │   │
│  │  ├─ Database webhooks                                   │   │
│  │  ├─ WebSocket connections                               │   │
│  │  └─ Change subscriptions                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

## User Interaction Flow

```
1. AUTHENTICATION
   ┌─────────────┐
   │ User        │
   │ Opens App   │
   └──────┬──────┘
          │
          ↓
   ┌─────────────────────────┐
   │ Check Auth Status       │
   │ (useAuth)               │
   └──────┬──────────────────┘
          │
          ├─ Logged In ──────→ Show Bookmark App
          │
          └─ Not Logged In ──→ ┌──────────────────────┐
                              │ Google OAuth Button  │
                              └──────┬───────────────┘
                                     │
                                     ↓
                              ┌──────────────────────┐
                              │ Google Consent      │
                              │ Screen              │
                              └──────┬───────────────┘
                                     │
                                     ↓
                              ┌──────────────────────┐
                              │ /auth/callback       │
                              │ (Exchange Code)      │
                              └──────┬───────────────┘
                                     │
                                     ↓
                              ┌──────────────────────┐
                              │ Show Bookmark App    │
                              └──────────────────────┘

2. ADD BOOKMARK
   ┌─────────────────────────┐
   │ User Enters Title & URL │
   │ Clicks "Add Bookmark"   │
   └──────┬──────────────────┘
          │
          ↓
   ┌─────────────────────────┐
   │ Form Validation         │
   │ - Title required?       │
   │ - URL valid?            │
   └──────┬──────────────────┘
          │
          ├─ Invalid ──→ Show Error Message
          │
          └─ Valid ────→ ┌────────────────────────┐
                        │ Insert into Database   │
                        │ (RLS checks user_id)   │
                        └──────┬─────────────────┘
                               │
                               ↓
                        ┌────────────────────────┐
                        │ Database Webhook Fires │
                        │ (Realtime)             │
                        └──────┬─────────────────┘
                               │
                               ↓
                        ┌────────────────────────┐
                        │ All Connected Clients  │
                        │ Receive Update         │
                        └──────┬─────────────────┘
                               │
                               ↓
                        ┌────────────────────────┐
                        │ UI Updates (No Refresh)│
                        │ Bookmark Appears       │
                        └────────────────────────┘

3. DELETE BOOKMARK
   ┌─────────────────────────┐
   │ User Clicks Delete      │
   └──────┬──────────────────┘
          │
          ↓
   ┌─────────────────────────┐
   │ Show Confirmation       │
   │ Dialog                  │
   └──────┬──────────────────┘
          │
          ├─ Cancel ──→ No action
          │
          └─ Confirm ─→ ┌────────────────────────┐
                        │ Delete from Database   │
                        │ (RLS checks user_id)   │
                        └──────┬─────────────────┘
                               │
                               ↓
                        ┌────────────────────────┐
                        │ Database Webhook Fires │
                        │ (Realtime)             │
                        └──────┬─────────────────┘
                               │
                               ↓
                        ┌────────────────────────┐
                        │ All Connected Clients  │
                        │ Receive Update         │
                        └──────┬─────────────────┘
                               │
                               ↓
                        ┌────────────────────────┐
                        │ UI Updates (No Refresh)│
                        │ Bookmark Removed       │
                        └────────────────────────┘

4. REAL-TIME SYNC (Multiple Tabs)
   Tab 1: User adds bookmark
          │
          ├─→ Supabase Database ←─┬─ Tab 2
          │                        │
          ├─ Realtime Webhook      │
          │                        │
          ├─ WebSocket message     │
          │                        │
          └─ Tab 1 UI updates ←───┘
             Tab 2 UI updates ←─────┘
```

## Component Dependency Tree

```
root (RootLayout)
│
├─ AuthProvider (providers.js)
│  │
│  └─ Page (page.js)
│     │
│     ├─ AuthButtons (components/AuthButtons.js)
│     │  └─ useAuth()
│     │
│     ├─ BookmarkForm (components/BookmarkForm.js)
│     │  └─ useBookmarks()
│     │     ├─ addBookmark()
│     │     └─ useAuth()
│     │
│     └─ BookmarkList (components/BookmarkList.js)
│        └─ useBookmarks()
│           ├─ bookmarks (array)
│           └─ deleteBookmark()
│
└─ Auth Callback (/auth/callback)
   └─ OAuth Handler
```

## Data Flow Diagram

```
User Input
    │
    ├─ Sign In Button
    │  └─→ signInWithGoogle()
    │      └─→ Supabase Auth
    │          └─→ Google OAuth
    │              └─→ /auth/callback
    │                  └─→ Set Session
    │
    ├─ Add Bookmark Form
    │  └─→ addBookmark(url, title)
    │      └─→ Supabase Insert
    │          └─→ Trigger Realtime
    │              └─→ WebSocket to all clients
    │
    └─ Delete Bookmark Button
       └─→ deleteBookmark(id)
           └─→ Supabase Delete
               └─→ Trigger Realtime
                   └─→ WebSocket to all clients
                       └─→ Update UI
```

## Security Flow

```
User Request
    │
    ├─ Client-side validation
    │  └─ Form validation completed?
    │
    ├─ Send to Supabase
    │
    ├─ Server-side checks
    │  ├─ User authenticated?
    │  └─ Valid session?
    │
    ├─ RLS Policy Evaluation
    │  ├─ Can SELECT? (auth.uid() == user_id)
    │  ├─ Can INSERT? (auth.uid() == user_id)
    │  ├─ Can UPDATE? (auth.uid() == user_id)
    │  └─ Can DELETE? (auth.uid() == user_id)
    │
    ├─ Database Operation
    │  ├─ INSERT → create bookmark
    │  ├─ DELETE → remove bookmark
    │  └─ SELECT → fetch bookmarks
    │
    └─ Response to Client
       └─ Only user's data returned
```

## Deployment Flow

```
Development
    │ (npm run dev)
    │
    ├─ Local Testing
    │  ├─ Supabase Dev Instance
    │  └─ Local Environment
    │
    ├─ Staging (Push to GitHub)
    │  ├─ Code Review
    │  └─ Test Build
    │
    └─ Production (Vercel Deploy)
       ├─ GitHub Push
       ├─ Vercel Build
       │  ├─ Install dependencies
       │  └─ npm run build
       ├─ Deploy to CDN
       └─ Live at vercel.app URL
           ├─ Production Supabase
           └─ Production Database
```

---

**Architecture built with:**

- Next.js App Router for routing
- React Hooks for state management
- Supabase for backend
- Tailwind CSS for styling
- PostgreSQL with RLS for security
