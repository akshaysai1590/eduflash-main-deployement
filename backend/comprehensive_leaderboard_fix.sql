-- ===================================================================
-- COMPREHENSIVE LEADERBOARD FIX
-- Run this entire script in your Supabase SQL Editor
-- ===================================================================

-- STEP 1: Clear all existing leaderboard data
-- ===================================================================
TRUNCATE TABLE leaderboard;

-- STEP 2: Ensure user_id column exists and is properly configured
-- ===================================================================
-- Add user_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leaderboard' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE leaderboard 
        ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
        
        CREATE INDEX IF NOT EXISTS idx_leaderboard_user_id ON leaderboard(user_id);
    END IF;
END $$;

-- STEP 3: Fix Row Level Security Policies
-- ===================================================================
-- Enable RLS
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can read leaderboard" ON leaderboard;
DROP POLICY IF EXISTS "Authenticated users can insert scores" ON leaderboard;
DROP POLICY IF EXISTS "Allow authenticated score inserts" ON leaderboard;
DROP POLICY IF EXISTS "Anyone can insert scores" ON leaderboard;

-- Create new policies
-- 1. Everyone can read the leaderboard
CREATE POLICY "leaderboard_select_policy"
  ON leaderboard FOR SELECT
  USING (true);

-- 2. Authenticated users can insert scores
-- This allows the backend to insert on behalf of users
CREATE POLICY "leaderboard_insert_policy"
  ON leaderboard FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- STEP 4: Verify the setup
-- ===================================================================
-- Check that the table exists and has the right structure
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'leaderboard'
ORDER BY ordinal_position;

-- Show current policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'leaderboard';

-- Confirm table is empty
SELECT COUNT(*) as row_count FROM leaderboard;
