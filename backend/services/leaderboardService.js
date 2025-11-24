/**
 * Leaderboard service using Supabase
 * Persistent leaderboard with PostgreSQL backend
 */

const supabase = require('./supabase');

/**
 * Add a score to the leaderboard
 * @param {string} name - Player name
 * @param {number} score - Score value
 * @param {string} userId - Optional user ID for authenticated users
 */
async function addScore(name, score, userId = null) {
    // Validate inputs
    if (!name || typeof name !== 'string') {
        throw new Error('Name is required and must be a string');
    }

    if (name.length > 50) {
        throw new Error('Name must be 50 characters or less');
    }

    if (typeof score !== 'number' || score < 0) {
        throw new Error('Score must be a non-negative number');
    }

    try {
        const scoreEntry = {
            name: name.trim() || 'Anonymous', // Fallback for empty name
            score: score
        };

        // Add user_id if provided (for authenticated users)
        if (userId) {
            scoreEntry.user_id = userId;
        }

        try {
            // Try inserting with user_id first
            const { data, error } = await supabase
                .from('leaderboard')
                .insert([scoreEntry])
                .select();

            if (error) throw error;

            console.log(`✓ Score saved to leaderboard: ${name} - ${score}`);
            return data[0];
        } catch (insertError) {
            // If error is about missing column user_id, retry without it
            if (userId && insertError.message && insertError.message.includes('column "user_id" of relation "leaderboard" does not exist')) {
                console.warn('user_id column missing in leaderboard table, retrying without it...');
                delete scoreEntry.user_id;

                const { data, error } = await supabase
                    .from('leaderboard')
                    .insert([scoreEntry])
                    .select();

                if (error) throw error;

                console.log(`✓ Score saved (without user_id): ${name} - ${score}`);
                return data[0];
            }

            throw insertError;
        }
    } catch (error) {
        console.error('Error adding score:', error);
        throw new Error(`Database error: ${error.message}`);
    }
}

/**
 * Get top scores from the leaderboard
 * @param {number} limit - Maximum number of scores to return (default: 10)
 * @returns {Promise<Array>} Array of top score entries
 */
async function getTopScores(limit = 10) {
    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .select('name, score, timestamp')
            .order('score', { ascending: false })
            .order('timestamp', { ascending: true }) // Earlier timestamp wins ties
            .limit(limit);

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(`Database error: ${error.message}`);
        }

        // Add rank to each entry
        const rankedScores = (data || []).map((entry, index) => ({
            rank: index + 1,
            name: entry.name,
            score: entry.score,
            timestamp: entry.timestamp
        }));

        return rankedScores;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
}

/**
 * Get total number of scores
 * @returns {Promise<number>}
 */
async function getScoreCount() {
    try {
        const { count, error } = await supabase
            .from('leaderboard')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Supabase error:', error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Error getting score count:', error);
        return 0;
    }
}

/**
 * Clear all scores (useful for testing)
 */
async function clearScores() {
    try {
        const { error } = await supabase
            .from('leaderboard')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (PostgreSQL workaround)

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(`Database error: ${error.message}`);
        }

        console.log('✓ Leaderboard cleared');
    } catch (error) {
        console.error('Error clearing leaderboard:', error);
        throw error;
    }
}

module.exports = {
    addScore,
    getTopScores,
    getScoreCount,
    clearScores
};
