import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const publicRoutes = ["/login", "/register", "/colleges"];
const protectedRoutes = ["/admission", "/my-colleges"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (protectedRoutes.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/colleges", "/admission", "/my-colleges"],
};
