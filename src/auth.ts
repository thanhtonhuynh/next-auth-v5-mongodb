import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.sub!;
      return session;
    },

    jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return token;
    },
  },
  providers: [Google, Github],
});
