import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'bagco_employee_auth'

export function middleware(request: NextRequest) {
  const isAuthorized = request.cookies.get(COOKIE_NAME)?.value === 'ok'
  if (isAuthorized) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/employee-login'
  loginUrl.searchParams.set('next', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/quote-builder/:path*'],
}
