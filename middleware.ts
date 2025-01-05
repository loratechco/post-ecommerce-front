import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "@/lib/auth/storage";
// import dataNavMain from "@/app/dashboard/components/dataNavbarDashoard";

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
  // اگر تنظیمات نیاز به پرمیشن خاصی ندارد، اضافه نکنید.
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(cookieName)?.value;
  const userPermissions = request.cookies.get('USER_PERMISSIONS')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // پارس کردن پرمیشن‌ها
    const parsePermissions = JSON.parse(userPermissions || '[]');
    const accessPermissions = parsePermissions?.permissions
      ?.filter((prm: string) => permissionToUrlMap[prm])
      ?.map((prm) => permissionToUrlMap[prm]);

    console.info('accessPermissions=>>>>>>', accessPermissions);

    // بررسی اینکه کاربر در مسیر غیرمجاز است
    const isRestricted = accessPermissions?.some((path) =>
      request.nextUrl.pathname.startsWith(`/dashboard${path}`)
    );

    if (isRestricted) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ]
}
