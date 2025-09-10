import { NextResponse } from 'next/server'
import { auth } from './lib/firebase'

// List of public paths that don't require authentication
const publicPaths = ['/login', '/signup', '/forgot-password']

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Skip middleware for API routes and static files
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api') || 
      pathname.startsWith('/static') ||
      pathname.includes('.')) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const session = request.cookies.get('session')?.value
  
  // If there's a session, verify it and add user to headers
  if (session) {
    try {
      // Verify the session token
      const decodedToken = await auth.verifySessionCookie(session, true)
      
      // Add the user to the request headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', decodedToken.uid)
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error('Error verifying session:', error)
      // Clear invalid session
      const response = NextResponse.next()
      response.cookies.delete('session')
      return response
    }
  }
  
  // No session found, continue with the request and let the page handle the auth state
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
