import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split('/').filter(Boolean)[0]
  const locale = firstSegment === 'ne' ? 'ne' : 'en'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-saanjh-locale', locale)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
