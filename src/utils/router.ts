import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/verify-auth";

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/*", "/stores", "/stores/*"],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const authToken = req.cookies.get("authToken")?.value;

  const baseUrl = req.nextUrl.origin;

  if (config.matcher.includes(pathname)) {
    try {
      if (authToken && process.env.JWT_SECRET) {
        const user = await verifyAuth(authToken).catch((error) => {
          console.error("Error verifying token: ", error);
          return null;
        });

        if (user) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(`${baseUrl}/signin`);
        }
      } else {
        return NextResponse.redirect(`${baseUrl}/signin`);
      }
    } catch (error) {
      console.error("Error verifying token: ", error);
      return NextResponse.redirect(`/signin`);
    }
  }

  return NextResponse.next();
}