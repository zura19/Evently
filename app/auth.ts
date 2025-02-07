import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./authConfig";
import User from "@/models/userModel";
import { connectToDB } from "@/lib/connectToDB";

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (
          !user ||
          !(await bcrypt.compare(
            credentials.password as string,
            user?.password as string
          ))
        ) {
          return null;
        }
        return {
          name: user.username,
          image: user?.image,
          id: String(user._id),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add user ID to the session object
      // @ts-expect-error add id
      session.user.id = token.id;
      // @ts-expect-error add id
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Add user ID to the token object
        token.id = user.id;
        // @ts-expect-error add role
        token.role = user.role;
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin",
  },
});
