// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ✅ যদি token না থাকে (user unauthorized)
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ যদি role অনুযায়ী redirect করতে চাও
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/user") && token.role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ✅ authorized হলে request allow করবে
  return NextResponse.next();
}

// ✅ কোন কোন route এ middleware চালবে তা define করো
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
