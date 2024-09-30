import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const requireAuth: string[] = ["/"];
const disableAuth: string[] = [
  "/api/auth",
  "/api/mobile",
  "/api/coba",
  "/login",
  "/template",
  "/tema",
  "/_next",
  "/favicon.ico",
];

const loginPath: string = "/login";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });


  if (token) {

    // Redirect if trying to access login page while authenticated
    if (pathname.match(loginPath)) {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }

    // Role-based redirect
    if (pathname.startsWith("/superadmin") && token.role !== "Superadmin") {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/admin") && token.role !== "Admin") {
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  } else {
    if (disableAuth.some((x) => pathname.startsWith(x))) {
      return res;
    }

    // Redirect to login if no token
    if (requireAuth.some((path) => pathname.startsWith(path))) {
      const url = new URL("/login", request.url);
      return NextResponse.redirect(url);
    }

  }

  return res;
}
