import { auth } from '@heimdall-logs/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAuth = req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/login')

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return null
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
    )
  }
})

export const config = {
  matcher: [
    '/logs/:path*',
    '/uptime/:path*',
    '/dashboard/:path*',
    '/insights/:path*',
    '/login',
  ],
}
