import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log("Middleware:", {
    path: nextUrl.pathname,
    isLoggedIn,
    hasAuth: !!req.auth,
    user: req.auth?.user?.email
  });

  const isAuthPage = nextUrl.pathname === "/login";
  const isRootPage = nextUrl.pathname === "/";

  if (isLoggedIn && isAuthPage) {
    console.log("Redirecting logged-in user to dashboard");
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (!isLoggedIn && !isAuthPage && !isRootPage) {
    console.log("Redirecting non-logged-in user to login");
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  console.log("Allowing request to proceed");
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};