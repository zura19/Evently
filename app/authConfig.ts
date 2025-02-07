import { NextRequest } from "next/server";

const authPages = ["/signup", "/login", "/resetPassword"];

const protectedRoutes = ["/create", "/profile"];

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // @ts-expect-error auth
    authorized({ auth, request }: { request: NextRequest }) {
      const user = auth?.user;
      const loggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      if (authPages.includes(pathname)) {
        if (loggedIn) {
          return Response.redirect(new URL("/", request.nextUrl));
        }
        return true;
      }

      if (protectedRoutes.includes(pathname) && !loggedIn) {
        return false;
      }

      if (protectedRoutes.includes(pathname) && user?.role === "user") {
        return false;
      }

      return true;
    },
  },
};
