"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Flower } from "lucide-react";
import { SignupForm } from "@/components/signUp-form";
import Link from "next/link";

export default function SignupPage() {
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
          Inscription à KarmaBoard
        </h1>
        <SignupForm className="mt-6" />
        <p className="text-gray-600 text-center mt-4">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-amber-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
}
