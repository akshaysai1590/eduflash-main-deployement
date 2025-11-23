/**
 * Question service using Supabase
 * Handles fetching random questions from the database
 */

const supabase = require('./supabase');

// Valid topics
const VALID_TOPICS = ['general', 'math', 'science'];

/**
 * Get a random question for a given topic
 * @param {string} topic - The topic to fetch a question for
 * @returns {Promise<Object>} Question object
 */
async function getRandomQuestion(topic) {
    // Validate topic
    if (!VALID_TOPICS.includes(topic)) {
        throw new Error(`Invalid topic: ${topic}. Valid topics: ${VALID_TOPICS.join(', ')}`);
    }

    try {
        // Fetch all questions for the topic
        const { data, error } = await supabase
            .from('questions')
            .select('id, topic, question, options, correct_answer, explanation')
            .eq('topic', topic);

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(`Database error: ${error.message}`);
        }

        if (!data || data.length === 0) {
            throw new Error(`No questions found for topic: ${topic}`);
        }

        // Select a random question
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedQuestion = data[randomIndex];

        // Return question WITHOUT the correct answer (client shouldn't see it yet)
        return {
            id: selectedQuestion.id,
            topic: selectedQuestion.topic,
            question: selectedQuestion.question,
            options: selectedQuestion.options,
            // Don't include correct_answer or explanation yet
        };
    } catch (error) {
        console.error('Error fetching question:', error);
        throw error;
    }
}

/**
 * Get the correct answer and explanation for a question
 * @param {string} questionId - The question ID
 * @returns {Promise<Object>} Object with correct_answer and explanation
 */
async function getQuestionAnswer(questionId) {
    try {
        const { data, error } = await supabase
            .from('questions')
            .select('correct_answer, explanation')
            .eq('id', questionId)
            .single();

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(`Database error: ${error.message}`);
        }

        if (!data) {
            throw new Error(`Question not found: ${questionId}`);
        }

        return {
            correctAnswer: data.correct_answer,
            explanation: data.explanation
        };
    } catch (error) {
        console.error('Error fetching question answer:', error);
        throw error;
    }
}

/**
 * Get count of questions by topic
 * @returns {Promise<Object>} Object with counts per topic
 */
async function getQuestionCounts() {
    try {
        const counts = {};

        for (const topic of VALID_TOPICS) {
            const { count, error } = await supabase
                .from('questions')
                .select('*', { count: 'exact', head: true })
                .eq('topic', topic);

            if (error) {
                console.error(`Error counting ${topic}:`, error);
                counts[topic] = 0;
            } else {
                counts[topic] = count || 0;
            }
        }

        return counts;
    } catch (error) {
        console.error('Error getting question counts:', error);
        return {};
    }
}

module.exports = {
    getRandomQuestion,
    getQuestionAnswer,
    getQuestionCounts,
    VALID_TOPICS
};
