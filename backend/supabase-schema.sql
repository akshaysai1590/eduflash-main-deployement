-- EduFlash Database Schema for Supabase
-- Run this in Supabase SQL Editor to create all tables

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL CHECK (correct_answer >= 0),
  explanation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on topic for faster filtering
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic);

-- Create leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(name) <= 50 AND length(name) > 0),
  score INTEGER NOT NULL CHECK (score >= 0),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on timestamp for faster sorting
CREATE INDEX IF NOT EXISTS idx_leaderboard_timestamp ON leaderboard(timestamp DESC);

-- Create index on score for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);

-- Enable Row Level Security (optional, for production)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
-- Questions: anyone can read
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  USING (true);

-- Leaderboard: anyone can read
CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard FOR SELECT
  USING (true);

-- Leaderboard: anyone can insert scores
CREATE POLICY "Anyone can insert scores"
  ON leaderboard FOR INSERT
  WITH CHECK (true);

-- Optional: Add some sample data for testing
-- Uncomment to insert test questions
/*
INSERT INTO questions (topic, question, options, correct_answer, explanation) VALUES
  ('general', 'What is the capital of France?', '["London", "Berlin", "Paris", "Madrid"]', 2, 'Paris is the capital and largest city of France.'),
  ('math', 'What is 2 + 2?', '["3", "4", "5", "6"]', 1, 'Basic addition: 2 + 2 equals 4.'),
  ('science', 'What is H2O?', '["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"]', 2, 'H2O is the chemical formula for water.');
*/
