import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// You need to extract the auth info from cookies or headers
// Example: assuming you have a session cookie named "session"
function getSession(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token) return null;

  // Normally you'd verify the token here, e.g., JWT
  // For mock/demo, assume any token means logged in
  return { user: { name: "Demo User" } };
}

const PUBLIC_PATHS = ["/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API routes, static files, images, favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const session = getSession(req);
  const isAuthenticated = !!session?.user;
  const isPublicRoute = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // Redirect authenticated users away from login
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
