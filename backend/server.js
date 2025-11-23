require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const explainProvider = require('./services/explainProvider');
const questionService = require('./services/questionService');
const leaderboardService = require('./services/leaderboardService');

// Function to create and configure the Express app
function createApp() {
  const app = express();

  // Middleware
  // CORS configuration - allow all origins for flexibility
  app.use(cors({
    origin: '*', // Allow all origins (can be restricted in production)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  }));

  // Handle preflight requests
  app.options('*', cors());

  app.use(express.json({ limit: '10mb' })); // Parse JSON with increased payload limit
  app.use(express.static(path.join(__dirname, '../frontend')));

  // API Routes

  // Get a random question
  app.get('/api/question', async (req, res) => {
    try {
      const topic = req.query.topic || 'general';

      // Get random question from Supabase
      const question = await questionService.getRandomQuestion(topic);

      console.log(`✓ Served question ${question.id} from topic: ${topic}`);
      res.json(question);
    } catch (error) {
      console.error('Error in /api/question:', error);

      if (error.message.includes('Invalid topic')) {
        return res.status(400).json({ error: error.message });
      }

      if (error.message.includes('No questions found')) {
        return res.status(404).json({ error: error.message });
      }

      res.status(500).json({ error: 'Internal server error while fetching question' });
    }
  });

  // Check answer and get explanation
  app.post('/api/check-answer', async (req, res) => {
    try {
      const { questionId, selectedAnswer, topic } = req.body;

      // Validate request body
      if (questionId === undefined || selectedAnswer === undefined) {
        return res.status(400).json({ error: 'Missing questionId or selectedAnswer' });
      }

      if (!questionId || (typeof questionId !== 'string')) {
        return res.status(400).json({ error: 'Invalid questionId format' });
      }

      if (typeof selectedAnswer !== 'number' || selectedAnswer < -1) {
        return res.status(400).json({ error: 'Invalid selectedAnswer format' });
      }

      // Get question answer from Supabase
      const questionData = await questionService.getQuestionAnswer(questionId);

      if (!questionData) {
        console.error(`Question not found: ${questionId}`);
        return res.status(404).json({ error: 'Question not found' });
      }

      const isCorrect = questionData.correctAnswer === selectedAnswer;

      // Get AI explanation (or use canned one)
      let explanation = '';
      try {
        explanation = await explainProvider.getExplanation(
          questionId,
          '', // Question text not needed for cache key
          '', // Correct answer text not needed
          questionData.explanation || ''
        );
      } catch (explanationError) {
        console.warn(`Failed to get AI explanation for ${questionId}:`, explanationError.message);
        // Use fallback explanation from database
        explanation = questionData.explanation || 'No explanation available.';
      }

      console.log(`✓ Answer checked for ${questionId}: ${isCorrect ? 'correct' : 'incorrect'}`);

      res.json({
        correct: isCorrect,
        correctAnswer: questionData.correctAnswer,
        explanation: explanation || questionData.explanation || ''
      });
    } catch (error) {
      console.error('Error in /api/check-answer:', error);
      res.status(500).json({ error: 'Internal server error while checking answer' });
    }
  });

  // Leaderboard endpoints
  app.post('/api/leaderboard', async (req, res) => {
    try {
      const { name, score } = req.body;

      if (!name || score === undefined) {
        return res.status(400).json({ error: 'Missing name or score' });
      }

      // Validate name
      if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid name format' });
      }

      if (name.length > 50) {
        return res.status(400).json({ error: 'Name must be 50 characters or less' });
      }

      // Validate score
      if (typeof score !== 'number' || score < 0 || !isFinite(score)) {
        return res.status(400).json({ error: 'Invalid score value' });
      }

      await leaderboardService.addScore(name.trim(), Math.floor(score));
      console.log(`✓ Added score to leaderboard: ${name.trim()} - ${Math.floor(score)}`);

      res.json({ success: true, message: 'Score added to leaderboard' });
    } catch (error) {
      console.error('Error in /api/leaderboard POST:', error);
      res.status(500).json({ error: 'Internal server error while adding score' });
    }
  });

  app.get('/api/leaderboard', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const topScores = await leaderboardService.getTopScores(limit);
      res.json(topScores);
    } catch (error) {
      console.error('Error in /api/leaderboard GET:', error);
      res.status(500).json({ error: 'Internal server error while fetching leaderboard' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 404 handler for API routes (must be before error handler)
  app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Error handling middleware (must be last)
  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  // Serve frontend
  app.get('/', (req, res) => {
    try {
      res.sendFile(path.join(__dirname, '../frontend/index.html'));
    } catch (error) {
      console.error('Error serving frontend:', error);
      res.status(500).send('Error loading application');
    }
  });

  return app;
}

// Export the app creator function for serverless environments
module.exports = createApp;

// Start server if running directly (not imported as a module)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 EduFlash server running on port ${PORT}`);
    console.log(`📚 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
    console.log(`\nAvailable topics: general, math, science\n`);
  });
}
