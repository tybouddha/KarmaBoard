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
  provider?: string;
  providerAccountId?: string;
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
        password: { label: "Password", type: "password", optional: true },
        provider: { label: "Provider", type: "text", optional: true },
        providerAccountId: {
          label: "Provider Account ID",
          type: "text",
          optional: true,
        },
      },
      async authorize(credentials) {
        const { email, password, provider, providerAccountId } = credentials;

        if (!email) {
          throw new Error("Email requis");
        }

        await connectDB();

        if (password) {
          // Logique existante pour email/mot de passe
          const user = (await User.findOne({
            email,
          }).exec()) as MongooseUserType | null;
          if (!user || !user.password) {
            throw new Error("Utilisateur ou mot de passe invalide");
          }
          if (typeof password !== "string") {
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
            provider: user.provider,
            providerAccountId: user.providerAccountId,
          };
        } else if (provider && providerAccountId) {
          // Logique pour OAuth
          const user = await User.findOne({
            email,
            provider,
            providerAccountId,
          }).exec();
          if (!user) {
            throw new Error("Utilisateur non trouvé");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            provider: user.provider,
            providerAccountId: user.providerAccountId,
          };
        }

        throw new Error("Données d’authentification manquantes");
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
        token.role = user.role as string;
        token.provider = user.provider as string;
        token.providerAccountId = user.providerAccountId as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider as string;
        session.user.providerAccountId = token.providerAccountId as string;
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
    async signIn({ user, account }) {
      // console.log("signIn:", { user, account, profile });
      if (account?.provider === "google" || account?.provider === "github") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // L’utilisateur sera créé dans /api/auth/link-account
          return true;
        }
      }
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
