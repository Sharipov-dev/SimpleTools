import { supabase } from './supabaseClient';

// Get the redirect URL - use environment variable or fallback to localhost
const getRedirectUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003';
  // Use the callback route to handle the auth flow properly
  const redirectUrl = `${baseUrl}/auth/confirmed`;
  console.log('Email redirect URL:', redirectUrl);
  return redirectUrl;
};

export async function signIn(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email, password
    });
    if (error) throw error;
    return data;
}
export async function signUp(email: string, password: string) {
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: getRedirectUrl()
        }
    });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const {error} = await supabase.auth.signOut();
    if (error) throw error;
}