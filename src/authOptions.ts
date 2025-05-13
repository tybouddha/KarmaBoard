import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { verifyPassword } from "@/utils/password";
import User from "@/models/User";
import connectDB from "@/db/db";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import mongoose from "mongoose";

type MongooseUserType = {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name?: string;
  role: string;
};

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Typage explicite des credentials
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error("Email et mot de passe requis");
        }

        await connectDB();

        const user = (await User.findOne({
          email,
        }).exec()) as MongooseUserType | null;

        if (!user) {
          throw new Error("Utilisateur non trouvé");
        }

        if (!user.password || typeof user.password !== "string") {
          throw new Error("Mot de passe invalide");
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Mot de passe incorrect");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirige vers /dashboard après connexion
      if (url.includes("/api/auth/callback")) {
        return `${baseUrl}/dashboard`;
      }
      // Si l'utilisateur est déjà connecté, redirige vers /dashboard
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
