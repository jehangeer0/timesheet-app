import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { mockUsers } from "@/data/mockData";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("🔐 Authorize called with:", { email: credentials?.email });
        
        if (!credentials?.email || !credentials?.password) {
          // console.log("Missing credentials");
          return null;
        }

        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (user) {
          console.log("User found:", { id: user.id, email: user.email });
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // console.log("User not found");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      console.log("🔒 Authorized callback:", { hasAuth: !!auth });
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        console.log("🎫 JWT callback - adding user to token:", user.id);
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        console.log("👤 Session callback - adding token to session:", token.id);
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  debug: true,
});