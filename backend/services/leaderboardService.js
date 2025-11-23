/**
 * Leaderboard service using Supabase
 * Persistent leaderboard with PostgreSQL backend
 */

const supabase = require('./supabase');

/**
 * Add a score to the leaderboard
 * @param {string} name - Player name
 * @param {number} score - Score value
 */
async function addScore(name, score) {
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
        const { data, error } = await supabase
            .from('leaderboard')
            .insert([
                {
                    name: name.trim(),
                    score: score
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(`Database error: ${error.message}`);
        }

        console.log(`✓ Score saved to leaderboard: ${name} - ${score}`);
        return data[0];
    } catch (error) {
        console.error('Error adding score:', error);
        throw error;
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
