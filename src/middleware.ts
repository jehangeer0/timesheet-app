import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const publicRoutes = ['/login', '/'];
const apiRoutes = ['/api/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith('/api/');

  try {
    const session = await auth();
    const isAuthenticated = !!session?.user;

    if (isAuthenticated && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isAuthenticated && !isPublicRoute && !isApiRoute) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};