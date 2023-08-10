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
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/static") || // exclude static files
    pathname.startsWith("/api") // exclude API routes
  )
    return NextResponse.next();
    const token= req.cookies.get("jwtToken")?.value

    // const decoded = jwt.verify(token, process.env.jwtkey)
    
 
    // return NextResponse.rewrite(new URL("/auth/login", req.url));
  console.log("**********")

  return NextResponse.next();
}