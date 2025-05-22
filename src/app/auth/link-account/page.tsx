"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "@/components/shared/CustomButton";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Lotus } from "@/components/icons/lotus";
import { Flower } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function LinkAccountPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const email = searchParams.get("email");
  const provider = searchParams.get("provider");
  const providerAccountId = searchParams.get("providerAccountId");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/link-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, provider, providerAccountId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la soumission");
      }
      if (data.action === "created") {
        const signInResult = await signIn("credentials", {
          email,
          provider,
          providerAccountId,
          redirect: false,
        });
        console.log("signIn result:", signInResult);
      }
      toast(data.action === "linked" ? "Compte lié" : "Compte créé", {
        className: "bg-amber-500 text-white font-lora flex items-center gap-2",
        icon: <Flower className="h-4 w-4 animate-pulse-slow" />,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(data.redirect);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };
  if (!email || !provider || !providerAccountId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
          <a
            href="/"
            className="absolute top-4 left-4 text-amber-700 hover:text-amber-500"
          >
            <Lotus className="h-6 w-6 animate-pulse-slow" />
          </a>
          <p className="text-red-600 bg-red-100 p-2 rounded">
            Données manquantes
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <a
          href="/"
          className="absolute top-4 left-4 text-amber-700 hover:text-amber-500"
        >
          <Lotus className="h-6 w-6 animate-pulse-slow" />
        </a>
        <h1 className="text-2xl font-lora text-amber-700 mb-4">
          Lier votre compte
        </h1>
        <CustomButton
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleJoinAccount}
          disabled={loading}
        >
          <span className="flex items-center gap-2">
            <Flower className="h-4 w-4 animate-pulse-slow" />
            OUI
          </span>
        </CustomButton>
        <CustomButton
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white"
          onClick={handleCancel}
          disabled={loading}
        >
          <span className="flex items-center gap-2">
            <Flower className="h-4 w-4 animate-pulse-slow" />
            NON
          </span>
        </CustomButton>
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mt-4">{error}</p>
        )}
        <Toaster />
      </div>
    </div>
  );
}
