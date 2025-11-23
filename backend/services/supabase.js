/**
 * Supabase client initialization
 * Provides a singleton Supabase client for database operations
 */

const { createClient } = require('@supabase/supabase-js');

// Validate environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('⚠️ Missing Supabase credentials!');
    console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file');
    console.error('See docs/supabase-setup.md for instructions');
    throw new Error('Supabase configuration missing');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false // Don't need session persistence for server-side
    }
});

console.log('✓ Supabase client initialized');

module.exports = supabase;
