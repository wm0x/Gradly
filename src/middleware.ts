import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  // هنا لازم نتاكد من الحمايه ونحمي الموقع من الوصول الى الاماكن الحساسه
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = apiAuthPrefix.some((prefix) => nextUrl.pathname.startsWith(prefix)) || nextUrl.pathname === "/api/projects";  // Support multiple prefixes
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return undefined; 
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // we must be pass nextUrl => localhost:3000
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // if we not got any error 
  return undefined;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
