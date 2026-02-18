@echo off
REM Smart Bookmark Manager - Setup Script for Windows
REM This script helps prepare for deployment

echo.
echo ========================================
echo Smart Bookmark Manager - Setup Helper
echo ========================================
echo.

REM Check if .env.local exists
if not exist ".env.local" (
  echo.
  echo WARNING: .env.local file not found!
  echo.
  echo Please create .env.local with:
  echo   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  echo   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  echo   NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000
  echo.
  pause
  exit /b 1
)

echo [OK] Environment file found

REM Check if node_modules exists
if not exist "node_modules" (
  echo.
  echo [INFO] Installing dependencies...
  echo.
  call npm install
  echo.
  echo [OK] Dependencies installed
) else (
  echo [OK] Dependencies already installed
)

echo.
echo [INFO] Building application...
echo.
call npm run build

if %errorlevel% equ 0 (
  echo.
  echo [OK] Build successful!
  echo.
  echo [INFO] Ready to deploy!
  echo.
  echo Next steps:
  echo   1. Push to GitHub: git push
  echo   2. Go to vercel.com
  echo   3. Import your GitHub repository
  echo   4. Add environment variables from .env.production
  echo   5. Deploy!
  echo.
  pause
) else (
  echo.
  echo [ERROR] Build failed. Please check errors above.
  echo.
  pause
  exit /b 1
)
