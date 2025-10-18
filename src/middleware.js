import apiClientServer from "./services/apiClientServer";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    await apiClientServer.get("/customer");
    return NextResponse.next();
  } catch (error) {
    if (error.response?.status === 401) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/profile/:path*",
};
