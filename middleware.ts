import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "@/lib/auth/storage";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(cookieName)?.value;
  const userPermissions = request.cookies.get('USER_PERMISSIONS')?.value;

  // اگر توکن وجود دارد ولی پرمیشن‌ها وجود ندارند، ریدایرکت به صفحه لاگین
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('userPermissions', JSON.parse(userPermissions || '[]'));
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ]
}
