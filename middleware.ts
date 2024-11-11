import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "@/lib/auth/storage";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(cookieName)?.value;
  const { pathname } = request.nextUrl;
  const isAuthPage = 1;

  if (!accessToken && pathname.startsWith("/dashboard")) {
    const url = new URL(request.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // if (accessToken && isAuthPage) {
  //   const url = new URL(request.url);
    
  //   url.pathname = "/dashboard";
    
  //   return NextResponse.redirect(url);
    
  // }

  console.log(`Access granted to: ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/:path*"],
};
