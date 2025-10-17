import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabaseClient";

export default function useAuth() {
    const [user, setUser] = useState<null | import('@supabase/supabase-js').User>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {

        supabase.auth.getSession().then(({data}) => {
            setUser(data.session?.user ?? null);
            setLoading(false);
        });
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })
        return () => sub.subscription.unsubscribe()
    }, [])
    return {user, loading}
}