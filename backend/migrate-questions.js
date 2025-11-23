/**
 * Migration script to import existing JSON questions into Supabase
 * Run this once to populate your Supabase database with existing questions
 * 
 * Usage: npm run migrate
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const supabase = require('./services/supabase');

// Topics to migrate
const TOPICS = ['general', 'math', 'science'];

async function migrateQuestions() {
    console.log('\n🚀 Starting question migration to Supabase...\n');

    let totalMigrated = 0;
    let totalErrors = 0;

    for (const topic of TOPICS) {
        const filePath = path.join(__dirname, 'questions', `${topic}.json`);

        try {
            // Check if file exists
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️  File not found: ${filePath}`);
                continue;
            }

            // Read JSON file
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const questions = JSON.parse(fileContent);

            console.log(`📚 Migrating ${questions.length} questions from ${topic}.json...`);

            // Prepare questions for insert
            const questionsToInsert = questions.map(q => ({
                topic: topic,
                question: q.question,
                options: q.options, // PostgreSQL JSONB handles arrays natively
                correct_answer: q.correctAnswer,
                explanation: q.explanation || 'No explanation provided.'
            }));

            // Insert into Supabase
            const { data, error } = await supabase
                .from('questions')
                .insert(questionsToInsert)
                .select();

            if (error) {
                console.error(`❌ Error migrating ${topic}:`, error.message);
                totalErrors += questions.length;
            } else {
                console.log(`✓ Successfully migrated ${data.length} ${topic} questions`);
                totalMigrated += data.length;
            }

        } catch (error) {
            console.error(`❌ Error processing ${topic}:`, error.message);
            totalErrors++;
        }

        console.log(''); // Blank line for readability
    }

    // Summary
    console.log('═══════════════════════════════════════');
    console.log(`✅ Migration complete!`);
    console.log(`   Total migrated: ${totalMigrated} questions`);
    if (totalErrors > 0) {
        console.log(`   ⚠️  Errors: ${totalErrors}`);
    }
    console.log('═══════════════════════════════════════\n');

    // Verify counts
    console.log('📊 Verifying database counts...\n');
    for (const topic of TOPICS) {
        const { count, error } = await supabase
            .from('questions')
            .select('*', { count: 'exact', head: true })
            .eq('topic', topic);

        if (error) {
            console.log(`   ${topic}: Error - ${error.message}`);
        } else {
            console.log(`   ${topic}: ${count} questions`);
        }
    }

    console.log('\n✓ Migration script finished!\n');
    process.exit(0);
}

// Handle errors
process.on('unhandledRejection', (error) => {
    console.error('\n❌ Unhandled error:', error.message);
    console.error('\nMake sure:');
    console.error('1. You have set SUPABASE_URL and SUPABASE_ANON_KEY in .env');
    console.error('2. You have run the SQL schema in Supabase');
    console.error('3. Your internet connection is working\n');
    process.exit(1);
});

// Run migration
migrateQuestions();
