import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicPaths = ['/login', '/register']
  const isPublicPath = publicPaths.includes(path)
  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/list',
    '/profile',
    '/profile/:id',
  ]
}