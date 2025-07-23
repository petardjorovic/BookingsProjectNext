import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { config } from "../utils/config";

export const authConfig = {
  providers: [
    Google({
      clientId: config.AUTH_GOOGLE_ID,
      clientSecret: config.AUTH_GOOGLE_SECRET,
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
