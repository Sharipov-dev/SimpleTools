'use client'

import useAuth from "@/hooks/useAuth";
import {useRouter, usePathname} from "next/navigation";
import {useEffect} from "react";

export default function Protected({children}: {children: React.ReactNode}){
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    
    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/auth', '/signup', '/auth/confirmed'];
    // Routes that should redirect authenticated users to home
    const authRedirectRoutes = ['/login', '/signup'];
    const isPublicRoute = publicRoutes.includes(pathname);
    const shouldRedirectIfAuth = authRedirectRoutes.includes(pathname);
    
    useEffect(() => {
        if (!loading && !user && !isPublicRoute) {
            // Redirect to login if not authenticated
            router.push("/login");
        } else if (!loading && user && shouldRedirectIfAuth) {
            // Only redirect from login/signup pages when authenticated
            // Allow access to other public routes like /auth/confirmed
            router.push("/");
        }
    }, [user, loading, router, isPublicRoute, shouldRedirectIfAuth]);

    // Don't protect public routes
    if (isPublicRoute) {
        return <>{children}</>;
    }

    if (loading) return <div>Loading...</div>
    if (!user) return null
    return <>{children}</>
}