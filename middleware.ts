import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en',
});

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const isAdmin = request.cookies.get('isAdmin')?.value;
  const { pathname } = request.nextUrl;
  const localeMatch = pathname.match(/^\/(en|fr|ar)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'en';
  const response = intlMiddleware(request);

  if (pathname.startsWith(`/${locale}/admin`)) {
    if (!isAdmin || !token) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname); 
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(fr|en|ar)/:path*'],
};