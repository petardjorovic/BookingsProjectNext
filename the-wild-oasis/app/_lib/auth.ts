import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { config } from "../utils/config";
import { createGuest, getGuest } from "./data-service";

export const authConfig = {
  providers: [
    Google({
      clientId: config.AUTH_GOOGLE_ID,
      clientSecret: config.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return auth?.user ? true : false;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user?.email || "");

        if (!existingGuest) {
          await createGuest({
            email: user.email || "",
            fullName: user.name || "",
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest?.id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
