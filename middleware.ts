import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en',
});

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;
  const localeMatch = pathname.match(/^\/(en|fr|ar)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'en';

  console.log(`Token: ${token}`);
  console.log(`Requested Path: ${pathname}`);

  const response = intlMiddleware(request);

  if ((!token && !pathname.startsWith(`/${locale}`)) || (!token && !pathname.startsWith(`/`))) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/', '/(fr|en|ar)/:path*'],
};
