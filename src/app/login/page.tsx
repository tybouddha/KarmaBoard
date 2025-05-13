"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Flower } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import CustomButton from "@/components/shared/CustomButton";
import Link from "next/link";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="flex items-center gap-2">
          <Flower className="h-6 w-6 text-amber-500 animate-pulse" />
          <p className="text-gray-800 font-lora">Patience...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white relative">
      <div
        className="absolute inset-0 opacity-10 animate-spin-slow"
        style={{ backgroundImage: "url('/img/mandala.png')" }}
      />
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-10 max-w-md w-full relative z-10 border border-amber-300 shadow-amber-200">
        <div className="flex justify-center mb-4">
          <Flower className="h-12 w-12 text-amber-500 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 font-lora text-center animate-fade-in">
          Connexion à KarmaBoard
        </h1>
        <LoginForm className="mt-6" />
        <div className="mt-6 flex justify-center gap-4">
          <CustomButton
            variant="secondary"
            onClick={() => signIn("google")}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147.933-2.933 1.6-5.053 1.6-4.067 0-7.52-3.333-7.52-7.52 0-4.187 3.453-7.52 7.52-7.52 1.867 0 3.52.667 4.8 1.867l2.773-2.773C19.013 2.027 15.947 0 12.48 0 5.867 0 0 5.867 0 12.48s5.867 12.48 12.48 12.48c6.613 0 12.48-5.867 12.48-12.48 0-.827-.08-1.653-.24-2.453h-12.24z"
              />
            </svg>
            Google
          </CustomButton>
          <CustomButton
            variant="secondary"
            onClick={() => signIn("github")}
            className="flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            GitHub
          </CustomButton>
        </div>
        <p className="text-gray-600 text-center mt-4">
          Pas de compte ?{" "}
          <Link href="/signup" className="text-amber-600 hover:underline">
            Inscription
          </Link>
        </p>
      </div>
    </section>
  );
}
