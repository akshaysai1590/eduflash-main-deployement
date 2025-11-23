/**
 * Vercel Serverless Function Entry Point
 * This file wraps the Express app for Vercel's serverless architecture
 */

const path = require('path');
const fs = require('fs');

// Set up paths for serverless environment
process.env.BACKEND_PATH = path.join(__dirname, '..', 'backend');
process.env.QUESTIONS_PATH = path.join(__dirname, '..', 'backend', 'questions');

// Import the Express app from backend
const createApp = require('../backend/server');

// Create and export the app for Vercel
module.exports = createApp();
