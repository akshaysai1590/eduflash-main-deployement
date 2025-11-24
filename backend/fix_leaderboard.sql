-- Run this in your Supabase SQL Editor to fix the leaderboard error

-- 1. Add user_id column to leaderboard table
ALTER TABLE leaderboard 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Create index for performance
CREATE INDEX IF NOT EXISTS idx_leaderboard_user_id ON leaderboard(user_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- 4. Allow authenticated users to insert their own scores
DROP POLICY IF EXISTS "Authenticated users can insert scores" ON leaderboard;
CREATE POLICY "Authenticated users can insert scores"
  ON leaderboard FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 5. Allow everyone to read the leaderboard
DROP POLICY IF EXISTS "Anyone can read leaderboard" ON leaderboard;
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard FOR SELECT
  USING (true);
