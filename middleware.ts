import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "@/lib/auth/storage";
// import { fetchPermissions, permissionCookieName } from "./lib/user-permissions/fetchPermissions";

export async function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get(cookieName)?.value;
  const userPermissions: string | undefined = request.cookies.get('USER_PERMISSIONS')?.value;
  console.log('User permissions:', JSON.parse(userPermissions as string | undefined || '[]'));
  // const { pathname } = request.nextUrl;

  // // بررسی صفحات احراز هویت
  // const isAuthPage = pathname === '/login' || pathname === '/register';

  // if (!accessToken && pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (accessToken && isAuthPage) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // // // دریافت و ذخیره پرمیشن‌ها
  // // if (accessToken && !request.cookies.get(permissionCookieName)) {
  // //   console.log('Fetching permissions from middleware');
  // //   const permissionResponse = await fetchPermissions(request);
  // //   console.log('Permissions response received');
  // //   return permissionResponse;
  // // }

  // // بررسی دسترسی‌ها برای مسیرهای داشبورد
  // if (pathname.startsWith("/dashboard")) {
  //   // const permissions = request.cookies.get(permissionCookieName)?.value;
  //   // const userPermissions = permissions ? JSON.parse(permissions) : [];

  //   // اینجا منطق بررسی دسترسی را قرار دهید
  //   // const hasAccess = checkPermissionForPath(pathname, userPermissions);

  //   if (!hasAccess) {
  //     console.log(`Access denied to: ${pathname}`);
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   }
  //   console.log(`Access granted to: ${pathname}`);
  // }

  // return NextResponse.next();
}

function checkPermissionForPath(pathname: string, permissions: any[]) {
  // پیاده‌سازی منطق بررسی دسترسی بر اساس مسیر
  return true; // فعلاً همیشه true برمی‌گرداند
}

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/register"]
// };
