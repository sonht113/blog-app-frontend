import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROUTE } from "@constants/route";

/**
 * Public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
  ROUTE.HOME, // Home page is accessible to everyone
  ROUTE.LOGIN,
  ROUTE.SIGN_UP,
  ROUTE.NOT_FOUND,
  ROUTE.ABOUT,
  ROUTE.CONTACT,
];

/**
 * Auth routes - if user is already authenticated, redirect to home
 */
const AUTH_ROUTES = [
  ROUTE.LOGIN,
  ROUTE.SIGN_UP,
];

/**
 * API routes that should be excluded from proxy
 */
const API_ROUTES = [
  "/api/auth",
];

/**
 * Static files and Next.js internals to exclude
 */
const EXCLUDED_PATHS = [
  "/_next",
  "/favicon.ico",
  "/public",
];

/**
 * Check if the path matches any of the patterns
 */
function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some(pattern => pathname.startsWith(pattern));
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for API routes, static files, and Next.js internals
  if (matchesPath(pathname, [...API_ROUTES, ...EXCLUDED_PATHS])) {
    return NextResponse.next();
  }

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAuthRoute = matchesPath(pathname, AUTH_ROUTES);
  const isPublicRoute = matchesPath(pathname, PUBLIC_ROUTES);

  // If user is authenticated and trying to access auth pages (sign-in, sign-up)
  // Redirect to home
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTE.HOME, request.url));
  }

  // If user is not authenticated and trying to access protected routes
  // Redirect to sign-in
  if (!isAuthenticated && !isPublicRoute) {
    const signInUrl = new URL(ROUTE.LOGIN, request.url);
    // Store the original URL to redirect back after sign-in
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - API routes (handled separately)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
