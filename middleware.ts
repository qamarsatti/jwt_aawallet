import { jwtVerify, type JWTPayload } from "jose";
import { NextResponse, NextRequest } from "next/server";
const jwt = require('jsonwebtoken');

interface TokenInterface {
  user: {
    email: string;
    name: string;
    userId: number;
  };
}

// The token to verify
const token = 'your-jwt-token';



export async function middleware(req: NextRequest) {
  // for public routes, we don't need to check for a token
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/home") ||
    pathname.startsWith("/signup")||
    pathname.startsWith("/login")
  ) {
    return NextResponse.rewrite(new URL(pathname, req.url));
  }
  const token = req.cookies.get("jwtToken")?.value
  if (token) {
    const jwdecode = jwt.decode(token, process.env.jwtkey)
    const now = new Date();
    var jwtdatetime = new Date(jwdecode.exp*1000)

    const a = 90
    if (jwtdatetime > now) {
      return NextResponse.next();
    }
  }

  // const decoded = jwt.verify(token, process.env.jwtkey)


  // return NextResponse.rewrite(new URL("/auth/login", req.url));
  return NextResponse.rewrite(new URL("/home", req.url));
}