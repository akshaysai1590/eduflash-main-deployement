# EduFlash Authentication Setup Guide

## 🔧 Configuration Steps

### Step 1: Update Supabase Credentials

You need to replace the placeholder values in these files with your actual Supabase credentials:

#### Files to Update:
1. **Frontend - login.html** (around line 235)
2. **Frontend - register.html** (around line 376)
3. **Frontend - script.js** (around line 18)

**Find this:**
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

**Replace with your actual values from Supabase dashboard:**
```javascript
const SUPABASE_URL = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Step 2: Run Database Schema Update

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Open the file: `backend/auth-schema-update.sql`
4. Copy and paste the SQL into Supabase SQL Editor
5. Click **Run** to execute

This will:
- Add `user_id` column to leaderboard table
- Create indexes for performance
- Update Row Level Security policies

### Step 3: Configure Authentication Providers (Supabase Dashboard)

#### Enable Email/Password (Required):
1. Go to **Authentication → Providers**
2. Email should be enabled by default
3. **Optional**: Disable email confirmations for testing
   - Under Email provider settings
   - Uncheck "Enable email confirmations"

#### Enable Google OAuth (Optional but Recommended):
1. Go to **Authentication → Providers**
2. Find **Google** and click to expand
3. Enable the provider
4. Follow instructions to create Google OAuth credentials:
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Create/select project
   - Enable Google+ API  
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret to Supabase

#### Configure Redirect URLs:
1. Go to **Authentication → URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3000`
   - `http://localhost:3000/index.html`
   - Add your production URL when deploying

### Step 4: Verify Backend Environment Variables

Make sure your `backend/.env` file has:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
PORT=3000
```

---

## 🚀 Testing Your Setup

### 1. Start the Backend
```bash
cd backend
npm start
```

You should see:
```
🚀 EduFlash server running on port 3000
📚 Frontend: http://localhost:3000
🔌 API: http://localhost:3000/api
```

### 2. Open the App
Navigate to: `http://localhost:3000`

You should be **redirected to login page** (this means auth check works!)

### 3. Test Registration
1. Click "Create Account"
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Create Account"
4. Should redirect to quiz page with "Welcome, testuser!" in header

### 4. Test Quiz & Leaderboard
1. Select a topic
2. Click "Start Quiz"
3. Answer questions
4. Click "Finish Quiz"
5. Score should **automatically appear in leaderboard with your username**
6. **No manual name input** should be shown

### 5. Test Logout
1. Click the "🚪 Logout" button in top right
2. Should redirect to login page
3. Session should be cleared

### 6. Test Login
1. On login page, enter:
   - Email: `test@example.com`
   - Password: `password123`
2. Click "Sign In"
3. Should redirect back to quiz page

### 7. Test Google OAuth (if configured)
1. On login/register page
2. Click "Sign in with Google"
3. Complete Google authentication
4. Should redirect to quiz page
5. Username auto-populated from Google profile

---

## ✅ What Changed

### Frontend:
- ✅ **login.html** - Beautiful login page matching EduFlash design
- ✅ **register.html** - Registration page with username, email, password
- ✅ **auth.js** - Authentication service using Supabase
- ✅ **index.html** - Added user header with logout button
- ✅ **style.css** - Added styles for auth pages and user header
- ✅ **script.js** - Auth checks, auto-submission, logout handler

### Backend:
- ✅ **server.js** - JWT authentication middleware
- ✅ **server.js** - Updated leaderboard endpoint to use auth
- ✅ **auth-schema-update.sql** - Database schema for auth

### User Experience:
- ✅ Users must login/register before accessing quiz
- ✅ Username displayed in header
- ✅ Logout button visible
- ✅ Scores auto-submitted with username (no manual input)
- ✅ Session persists across page refreshes

---

## 🐛 Troubleshooting

### "Missing or invalid authorization header" error:
- Make sure you're logged in
- Check browser console for auth errors
- Verify Supabase credentials are correct

### Google OAuth not working:
- Verify redirect URI matches exactly
- Check Google Cloud Console credentials
- Ensure domain is authorized

### Can't access quiz page:
- This is expected! You need to login first
- Auth-gate is working correctly

### Leaderboard not showing scores:
- Check browser console for errors
- Verify database schema was updated
- Check backend logs for errors

---

## 📝 Next Steps

After testing locally:
1. Update production URLs in auth configuration
2. Add your production domain to Supabase redirect URLs
3. Deploy and test in production environment

Enjoy your secure, authenticated EduFlash app! 🎓✨
