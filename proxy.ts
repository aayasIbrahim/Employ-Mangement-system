import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;
  const { pathname } = req.nextUrl;

  // এই রুটগুলো শুধু লগইন করা ইউজারের জন্য
  const protectedRoutes = [
    "/", 
    "/attendance",
    "/tasks",
    "/leave",
    "/profile",
  ];

  // যদি ইউজার লগইন না করে protected route এ আসে → /login এ redirect
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // যদি token থাকে → ধরি ইউজার হলো 'user'
  if (token) {
    return NextResponse.next();
  }

  // অন্য কোন public route → কোন সমস্যা নাই
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/attendance",
    "/tasks",
    "/leave",
    "/profile",
  ],
};
