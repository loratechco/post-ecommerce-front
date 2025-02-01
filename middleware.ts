/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookieName } from "@/lib/auth/storage";

const permissionToUrlMap = {
  'see-user-wallet': '/wallet',
  'change-default-percentage': '/profile',
  'users-list': '/users-management',
  'tickets-list': '/ticketing',
  'change-group-permissions': '/groups',
  'promocode-create': '/coupons',
  'promocode-disable': '/coupons',
  'promocode-enable': '/coupons',
  'promocode-edit': '/coupons',
};

const authRoute = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(cookieName)?.value;
  const userPermissions = request.cookies.get('USER_PERMISSIONS')?.value;

 
  // if (!accessToken) {
  
  //   const isAuthRoute = authRoute.some((path) =>
  //     request.nextUrl.pathname.startsWith(path)
  //   );
  //   if (isAuthRoute) {
  //     return NextResponse.next(); 
  //   }

  //   if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //     console.info('No access token, redirecting to landing page');
  //     return NextResponse.redirect(new URL('/', request.url)); 
  //   }

  //   return NextResponse.next(); 
  // }

  // const isAuthRoute = authRoute.some((path) =>
  //   request.nextUrl.pathname.startsWith(path)
  // );
  // if (isAuthRoute) {
  //   console.info('Authenticated user, redirecting to dashboard');
  //   return NextResponse.redirect(new URL('/dashboard', request.url)); 
  // }

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   const parsePermissions = JSON.parse(userPermissions || '[]');
  //   const accessPermissions = parsePermissions?.permissions
  //     ?.filter((prm: string) => permissionToUrlMap[prm])
  //     ?.map((prm) => permissionToUrlMap[prm]);

  //   console.info('accessPermissions=>>>>>>', accessPermissions);

  //   const isRestricted = accessPermissions?.some((path) =>
  //     request.nextUrl.pathname.startsWith(`/dashboard${path}`)
  //   );

  //   if (isRestricted) {
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   }
  //   return NextResponse.next();

  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:path*',
    // '/dashboard/:path*', 
    // '/login',
    // '/register',
    // '/forgot-password',
    // '/dashboard',
  ],
};
