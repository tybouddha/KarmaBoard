"use client";

import HeroSection from "@/components/HeroSection";
import { LoginForm } from "@/components/login-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <p className="text-gray-800 font-lora">Patience...</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        titre="KarmaBoard"
        soustitre="Gérez vos projets avec sérénité"
        description="La première plateforme inspirée du bouddhisme pour booster votre productivité sans stress."
      />
      <LoginForm />
    </>
  );
}
