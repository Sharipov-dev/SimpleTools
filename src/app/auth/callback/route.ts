import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  
  // Log the callback for debugging
  console.log('Auth callback received:', requestUrl.toString());
  
  // Check if this is an email confirmation
  const type = requestUrl.searchParams.get('type');
  const token = requestUrl.searchParams.get('token');
  const refreshToken = requestUrl.searchParams.get('refresh_token');
  
  if (type === 'signup' && token) {
    // This is an email confirmation
    console.log('Email confirmation detected');
    // Redirect to confirmed page
    return NextResponse.redirect(`${requestUrl.origin}/auth/confirmed`);
  }
  
  // For other auth flows, redirect to home
  return NextResponse.redirect(`${requestUrl.origin}/`);
}
