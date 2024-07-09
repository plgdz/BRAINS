import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {auth} from "@/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.redirect(new URL('/login', req.url));
  if (req.nextUrl.pathname === '/dashboard') return NextResponse.redirect(new URL('/dashboard/calendar', req.url));
  return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
}
