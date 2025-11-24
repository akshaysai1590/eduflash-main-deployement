// Authentication Service using Supabase
// Handles login, registration, logout, and session management

// Initialize Supabase client (will be loaded from CDN in HTML)
let supabase = null;

// Initialize the auth service
function initAuth(supabaseUrl, supabaseKey) {
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase library not loaded. Make sure to include the Supabase CDN script.');
        return false;
    }

    supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    console.log('✓ Supabase auth initialized');
    return true;
}

// Check if user is authenticated
async function checkAuth() {
    if (!supabase) {
        console.error('Supabase not initialized');
        return null;
    }

    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Error checking auth:', error);
            return null;
        }

        return session;
    } catch (error) {
        console.error('Error in checkAuth:', error);
        return null;
    }
}

// Get current user data
async function getCurrentUser() {
    const session = await checkAuth();
    return session ? session.user : null;
}

// Get username from user metadata
async function getUsername() {
    const user = await getCurrentUser();
    if (!user) return null;

    // Try to get username from user metadata, fallback to email
    return user.user_metadata?.username || user.email?.split('@')[0] || 'User';
}

// Register with email and password
async function registerWithEmail(username, email, password) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    // Validate inputs
    if (!username || username.trim().length === 0) {
        throw new Error('Username is required');
    }

    if (username.length > 50) {
        throw new Error('Username must be 50 characters or less');
    }

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username.trim()
                }
            }
        });

        if (error) {
            console.error('Registration error:', error);
            throw new Error(error.message);
        }

        console.log('✓ Registration successful:', data);
        return data;
    } catch (error) {
        console.error('Error in registerWithEmail:', error);
        throw error;
    }
}

// Login with email and password
async function loginWithEmail(email, password) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Login error:', error);
            throw new Error(error.message);
        }

        console.log('✓ Login successful');
        return data;
    } catch (error) {
        console.error('Error in loginWithEmail:', error);
        throw error;
    }
}

// Login with Google OAuth
async function loginWithGoogle() {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/'
            }
        });

        if (error) {
            console.error('Google login error:', error);
            throw new Error(error.message);
        }

        console.log('✓ Redirecting to Google login');
        return data;
    } catch (error) {
        console.error('Error in loginWithGoogle:', error);
        throw error;
    }
}

// Logout
async function logout() {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error);
            throw new Error(error.message);
        }

        console.log('✓ Logout successful');
        return true;
    } catch (error) {
        console.error('Error in logout:', error);
        throw error;
    }
}

// Redirect to login page if not authenticated
async function requireAuth() {
    const session = await checkAuth();

    if (!session) {
        console.log('Not authenticated, redirecting to login...');
        window.location.href = '/login';
        return false;
    }

    return true;
}

// Setup auth state listener
function onAuthStateChange(callback) {
    if (!supabase) {
        console.error('Supabase not initialized');
        return null;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        callback(event, session);
    });

    return subscription;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAuth,
        checkAuth,
        getCurrentUser,
        getUsername,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
        requireAuth,
        onAuthStateChange
    };
}
