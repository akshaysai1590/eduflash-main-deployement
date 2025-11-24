-- Fix for Row Level Security policy issue
-- Run this in your Supabase SQL Editor

-- The issue: The current RLS policy requires user_id to match auth.uid()
-- But the backend uses the anon key and passes user_id in the data
-- Solution: Update the policy to allow authenticated inserts OR allow service role

-- 1. Drop the existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can insert scores" ON leaderboard;

-- 2. Create a new policy that allows inserts with user_id
-- This allows the backend to insert scores on behalf of authenticated users
CREATE POLICY "Allow authenticated score inserts"
  ON leaderboard FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 3. Keep the read policy
DROP POLICY IF EXISTS "Anyone can read leaderboard" ON leaderboard;
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard FOR SELECT
  USING (true);

-- 4. Optional: If you want to ensure user_id matches the authenticated user
-- Uncomment the following instead of the policy in step 2:
/*
CREATE POLICY "Allow authenticated score inserts"
  ON leaderboard FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
*/
