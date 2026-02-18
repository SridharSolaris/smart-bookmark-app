#!/bin/bash

# Smart Bookmark Manager - Setup Script
# This script automates the Vercel deployment configuration

echo "🎉 Smart Bookmark Manager - Deployment Helper"
echo "=============================================="
echo ""

# Check if environment variables exist
if [ ! -f ".env.local" ]; then
  echo "⚠️  .env.local file not found!"
  echo ""
  echo "Please create .env.local with:"
  echo "  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
  echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key"
  echo "  NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000"
  echo ""
  exit 1
fi

echo "✅ Environment file found"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo "✅ Dependencies installed"
else
  echo "✅ Dependencies already installed"
fi

echo ""
echo "🏗️  Building application..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo ""
  echo "🚀 Ready to deploy!"
  echo ""
  echo "Next steps:"
  echo "1. Push to GitHub: git push"
  echo "2. Go to vercel.com"
  echo "3. Import your GitHub repository"
  echo "4. Add environment variables from .env.production"
  echo "5. Deploy!"
  echo ""
else
  echo "❌ Build failed. Please check errors above."
  exit 1
fi
