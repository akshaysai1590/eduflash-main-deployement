# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `eduflash` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait ~2 minutes for provisioning

## Step 2: Run Database Schema

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Copy the entire contents of `backend/supabase-schema.sql`
4. Paste into the SQL editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. Verify tables created: Click **"Table Editor"** → You should see `questions` and `leaderboard` tables

## Step 3: Get API Credentials

1. Click **"Project Settings"** (gear icon in left sidebar)
2. Click **"API"** in the settings menu
3. Copy these two values:
   - **Project URL**: Under "Project URL" (looks like `https://xxxxx.supabase.co`)
   - **anon public key**: Under "Project API keys" → "anon public"

## Step 4: Configure Environment Variables

### For Local Development

Create/update `backend/.env`:

```env
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
```

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:
   - Key: `SUPABASE_URL`, Value: your project URL
   - Key: `SUPABASE_ANON_KEY`, Value: your anon key
4. Click **"Save"**
5. Redeploy your project

## Step 5: Migrate Existing Questions

Run the migration script to import your existing questions:

```bash
cd backend
npm run migrate
```

This will:
- Read all JSON question files
- Insert them into Supabase
- Preserve all question data (topics, options, explanations)

## Step 6: Verify Setup

Test your setup:

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Test question endpoint:
   ```bash
   curl http://localhost:3000/api/question?topic=general
   ```

3. You should see a question from Supabase!

## Troubleshooting

**Error: "Invalid API key"**
- Double-check you copied the **anon** key, not the service role key
- Verify no extra spaces in `.env` file

**Error: "relation does not exist"**
- SQL schema didn't run successfully
- Go back to Step 2 and run the schema again

**Error: "Failed to connect"**
- Check your internet connection
- Verify SUPABASE_URL is correct (include `https://`)

## Security Notes

- ✅ **anon key is safe** to use in frontend (it has Row Level Security)
- ⚠️ **Never expose service_role key** (only use in trusted backend)
- 🔒 Current setup uses anon key for backend queries (safe for read operations)

## Next Steps

- Add more questions via Supabase Table Editor
- Set up Row Level Security policies if needed
- Monitor usage in Supabase dashboard
