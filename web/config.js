// Supabase Configuration
// Get your keys from: https://app.supabase.com/project/[your-project]/settings/api

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

// Initialize Supabase client
const supabase = supabase_lib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase initialized:', SUPABASE_URL ? '✓' : '✗');
