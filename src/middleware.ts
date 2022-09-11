import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import fetcher from './utils/fetcher';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('access');
  const { url } = req;
  const noUserRoutes = ['/auth/login', '/auth/register'];
  const isUrlNoUserRoute = noUserRoutes.some((route) =>
    url.includes(route)
  );
  try {
    if (url.includes('/dashboard')) {
      const response = await fetcher(`/auth/access/${token}`, 'POST');
      if (response.status === 'success') {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/auth/login', url));
    }
    if (isUrlNoUserRoute) {
      const response = await fetcher(`/auth/access/${token}`, 'POST');
      if (response.status === 'success') {
        return NextResponse.redirect(new URL('/dashboard', url));
      }
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/', url));
  }
  return NextResponse.next();
}
