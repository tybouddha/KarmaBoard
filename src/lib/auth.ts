import NextAuth from "next-auth";
import { authOptions } from "@/authOptions";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authOptions,
});
