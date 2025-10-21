// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

// evita que intercepte assets y api
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
