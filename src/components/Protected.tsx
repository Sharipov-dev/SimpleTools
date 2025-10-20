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
    const isPublicRoute = publicRoutes.includes(pathname);
    
    useEffect(() => {
        if (!loading && !user && !isPublicRoute) {
            // Redirect to login if not authenticated
            router.push("/login");
        } else if (!loading && user && isPublicRoute) {
            // Redirect to home if authenticated and on public route
            router.push("/");
        }
    }, [user, loading, router, isPublicRoute]);

    // Don't protect public routes
    if (isPublicRoute) {
        return <>{children}</>;
    }

    if (loading) return <div>Loading...</div>
    if (!user) return null
    return <>{children}</>
}