/**
 * Authentication service using Supabase Auth
 * Handles user signup, login, logout, and session management
 */

const supabase = require('./supabase');

/**
 * Sign up a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} displayName - Optional display name
 * @returns {Promise<Object>} User data and session
 */
async function signUp(email, password, displayName = null) {
    // Validate inputs
    if (!email || !email.includes('@')) {
        throw new Error('Valid email is required');
    }

    if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password,
            options: {
                data: {
                    username: displayName || email.split('@')[0],
                    display_name: displayName || email.split('@')[0] // Keep for backward compatibility
                }
            }
        });

        if (error) {
            console.error('Supabase signup error:', error);
            throw new Error(`Signup failed: ${error.message}`);
        }

        if (!data.user) {
            throw new Error('Signup failed: No user data returned');
        }

        console.log(`✓ User signed up: ${data.user.email}`);
        return {
            user: {
                id: data.user.id,
                email: data.user.email,
                username: data.user.user_metadata?.username || data.user.user_metadata?.display_name || email.split('@')[0],
                displayName: data.user.user_metadata?.display_name || data.user.user_metadata?.username || email.split('@')[0]
            },
            session: data.session
        };
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
}

/**
 * Sign in existing user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data and session
 */
async function signIn(email, password) {
    // Validate inputs
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password
        });

        if (error) {
            console.error('Supabase login error:', error);
            throw new Error(`Login failed: ${error.message}`);
        }

        if (!data.user || !data.session) {
            throw new Error('Login failed: Invalid credentials');
        }

        console.log(`✓ User logged in: ${data.user.email}`);
        return {
            user: {
                id: data.user.id,
                email: data.user.email,
                username: data.user.user_metadata?.username || data.user.user_metadata?.display_name || data.user.email.split('@')[0],
                displayName: data.user.user_metadata?.display_name || data.user.user_metadata?.username || data.user.email.split('@')[0]
            },
            session: data.session
        };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

/**
 * Sign out the current user
 * @param {string} accessToken - User's access token
 * @returns {Promise<void>}
 */
async function signOut(accessToken) {
    try {
        const { error } = await supabase.auth.signOut(accessToken);

        if (error) {
            console.error('Supabase logout error:', error);
            throw new Error(`Logout failed: ${error.message}`);
        }

        console.log('✓ User logged out');
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}

/**
 * Verify and get user from access token
 * @param {string} accessToken - Access token to verify
 * @returns {Promise<Object>} User data
 */
async function getUserFromToken(accessToken) {
    if (!accessToken) {
        throw new Error('Access token is required');
    }

    try {
        const { data, error } = await supabase.auth.getUser(accessToken);

        if (error) {
            console.error('Supabase token verification error:', error);
            throw new Error(`Token verification failed: ${error.message}`);
        }

        if (!data.user) {
            throw new Error('Invalid or expired token');
        }

        return {
            id: data.user.id,
            email: data.user.email,
            username: data.user.user_metadata?.username || data.user.user_metadata?.display_name || data.user.email.split('@')[0],
            displayName: data.user.user_metadata?.display_name || data.user.user_metadata?.username || data.user.email.split('@')[0],
            emailVerified: data.user.email_confirmed_at !== null
        };
    } catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
}

/**
 * Middleware to verify authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
async function authMiddleware(req, res, next) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No authorization token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token and get user
        const user = await getUserFromToken(token);

        // Attach user to request
        req.user = user;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    getUserFromToken,
    authMiddleware
};
