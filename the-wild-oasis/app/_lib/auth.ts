import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { config } from "../utils/config";

export const authConfig = {
  providers: [
    Google({
      clientId: config.AUTH_GOOGLE_ID,
      clientSecret: config.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: Request }) {
      return auth?.user ? true : false;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
