import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // if (req.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL('/marketplace', req.url))
  // }
  // if (req.nextUrl.pathname === "/swap") {
  //   return NextResponse.redirect(new URL('/marketplace', req.url))
  // }
  // if (req.nextUrl.pathname === "/pool") {
  //   return NextResponse.redirect(new URL('/marketplace', req.url))
  // }
  // if (req.nextUrl.pathname === "/earn") {
  //   return NextResponse.redirect(new URL('/marketplace', req.url))
  // }
  
  return res
}

export const config = {
  matcher: [
    '/',
    '/swap',
    '/pool',
    '/earn',
    '/add',
    '/remove',
    '/find',
    '/info/:path*',
  ],
}
