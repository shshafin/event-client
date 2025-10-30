import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const publicRoutes = ["/", "/login", "/register", "/events"];
const protectedRoutes = ["/my-bookings", "/profile"];
const adminRoutes = ["/add-event"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  // ✅ Public routes — no restriction
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Protected routes — only logged-in users
  if (protectedRoutes.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
    return NextResponse.next();
  }

  // ✅ Admin routes — only admin can access
  if (adminRoutes.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Default: allow other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/events",
    "/my-bookings",
    "/add-event",
    "/profile",
  ],
};
