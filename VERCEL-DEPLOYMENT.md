# Vercel Deployment Guide

## Prerequisites

- Code pushed to GitHub
- Vercel account
- Supabase project created with OAuth configured

## Step-by-Step Deployment

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Search for your GitHub repository
5. Click "Import"

### 2. Configure Environment Variables

In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_REDIRECT_URL=https://your-project.vercel.app
```

**Important:** Replace `your-project` with your actual Vercel project name.

### 3. Deploy

Click "Deploy" → Wait for deployment to complete → Get your live URL

### 4. Update OAuth Configurations

After deployment, update redirect URIs in both places:

#### Supabase (Settings > OAuth Providers > Google)

```
https://your-project.vercel.app/auth/callback
```

#### Google Cloud Console (OAuth 2.0 Consent Screen)

```
https://your-project.vercel.app/auth/callback
```

### 5. Test Deployment

1. Visit your Vercel URL
2. Click "Sign in with Google"
3. Add a bookmark
4. Delete a bookmark
5. Test real-time sync in two tabs

## Environment Variables Reference

| Variable                        | Purpose                   | Example                              |
| ------------------------------- | ------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL | `https://xxxxx.supabase.co`          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key    | `eyJ0eXAi...`                        |
| `NEXT_PUBLIC_REDIRECT_URL`      | OAuth callback base URL   | `https://smart-bookmarks.vercel.app` |

## Continuous Deployment

Vercel automatically deploys when you:

- Push to main branch
- Create and merge pull requests

## Monitoring Deployments

In Vercel Dashboard:

- View deployment logs
- Check build status
- Monitor page performance
- See error logs in real-time

## Troubleshooting Deployments

### Build Fails

- Check build logs in Vercel dashboard
- Verify environment variables are set
- Ensure all dependencies are in package.json

### Blank Page

- Open browser DevTools (F12)
- Check Console tab for errors
- Verify environment variables loaded: `NEXT_PUBLIC_*` should be visible

### OAuth Not Working

- Verify redirect URIs match exactly
- Check Supabase OAuth is enabled
- Ensure Google credentials are valid

### Bookmarks Not Syncing

- Check browser network tab
- Verify Supabase Realtime is enabled
- Check RLS policies created correctly

## Scaling Tips

### Performance

- Vercel automatically optimizes Next.js
- Images are optimized by default
- Use Vercel Analytics to monitor

### Limits

- Supabase free tier: 500MB storage, 2GB bandwidth
- Vercel free tier: No serverless execution time limit

## Custom Domain

1. In Vercel dashboard, go to Settings > Domains
2. Click "Add Domain"
3. Follow DNS configuration steps
4. Update OAuth redirect URIs with new domain

## Security Best Practices

✅ DO:

- Keep environment variables secret
- Use OAuth (never store passwords)
- Enable 2FA on accounts
- Review RLS policies

❌ DON'T:

- Commit .env files to git
- Share anon keys publicly
- Use development keys in production
- Disable RLS policies

## Rollback Deployment

If something breaks:

1. In Vercel dashboard, go to Deployments
2. Click on previous successful deployment
3. Click "Promote to Production"

## Advanced: Custom Build Configuration

Edit `vercel.json` if needed:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs

---

Your app is live! 🎉
