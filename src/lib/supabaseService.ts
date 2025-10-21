import { supabase } from './supabaseClient';

const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirmed`;

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
            emailRedirectTo: redirectTo
        }
    });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const {error} = await supabase.auth.signOut();
    if (error) throw error;
}