import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const { pathname } = req.nextUrl
  if (pathname === '/login') {
    return NextResponse.redirect(new URL('/diaries', req.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    '/login',
    '/diaries',
    '/',
  ],
}
