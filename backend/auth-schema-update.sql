-- EduFlash Authentication Schema Update
-- Run this in Supabase SQL Editor AFTER running supabase-schema.sql
-- This adds user authentication support to the leaderboard

-- Step 1: Add user_id column to leaderboard table
ALTER TABLE leaderboard
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Create index for faster user lookups
CREATE INDEX IF NOT EXISTS idx_leaderboard_user_id ON leaderboard(user_id);

-- Step 3: Update RLS policies for authenticated users
-- Drop the old "anyone can insert" policy
DROP POLICY IF EXISTS "Anyone can insert scores" ON leaderboard;

-- Create new policy: only authenticated users can insert their own scores
CREATE POLICY "Authenticated users can insert scores"
  ON leaderboard FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Note: The "Anyone can read leaderboard" policy remains unchanged
-- Users can still view the leaderboard without authentication

-- Step 4: Optional - Clean up test data without user_id
-- Uncomment if you want to remove old leaderboard entries
-- DELETE FROM leaderboard WHERE user_id IS NULL;
