import { NextResponse } from "next/server";
import apiClientServer from "./services/apiClientServer";

// Middleware function that runs on specified routes
export async function middleware(request) {
  // Get access token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // If no token exists, redirect to home page
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    // Verify token validity with backend API
    await apiClientServer.get("/auth/checkauth");
    // If valid, allow request to continue
    return NextResponse.next();
  } catch (error) {
    // If unauthorized (401), redirect to home page
    if (error.response?.status === 401) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // For other errors, still allow the request to proceed
    return NextResponse.next();
  }
}

// Configure which routes this middleware applies to
export const config = {
  matcher: ["/profile/:path*", "/shopping-cart"],
};
