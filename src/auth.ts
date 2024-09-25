import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import db from "@/lib/prisma";

declare module "next-auth" {
  interface User {
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return token;
    },

    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.sub as string;
      return session;
    },
  },
  providers: [Google, Github],
});
