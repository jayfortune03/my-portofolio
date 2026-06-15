import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_FILE_PATTERN = /\.[a-zA-Z0-9]+$/;
const ALLOWED_EXACT_PATHS = new Set([
  "/",
  "/icon.svg",
  "/opengraph-image",
  "/twitter-image",
]);

const ALLOWED_PREFIXES = ["/api/", "/_next/", "/cv/", "/certificates/"];

function isAllowedPath(pathname: string) {
  return (
    ALLOWED_EXACT_PATHS.has(pathname) ||
    ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    PUBLIC_FILE_PATTERN.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAllowedPath(pathname)) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = "/";
  rewriteUrl.search = "";

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/:path*"],
};
