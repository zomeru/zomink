import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const {url} = req;
  const loggedIn = req.cookies.get('access');

  const noUserRoutes = ['/auth/login', '/auth/register'];
  const isUrlNoUserRoute = noUserRoutes.some((route) =>
    url.includes(route)
  );

  try {
    if (url.includes('/dashboard')) {
      if (loggedIn) {
        return NextResponse.next();
      } 
        return NextResponse.redirect(new URL('/auth/login', url));
      
    }

    if (isUrlNoUserRoute) {
      if (loggedIn) {
        return NextResponse.redirect(new URL('/dashboard', url));
      } 
        return NextResponse.next();
      
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/', url));
  }

  return NextResponse.next();
}
