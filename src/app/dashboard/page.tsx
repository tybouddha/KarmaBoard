"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Flower } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20 px-6 "
      style={{ backgroundImage: "url('/img/mandala.png')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl max-w-2xl mx-auto p-10 flex flex-col items-center gap-6 text-center">
        {/* <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-10 max-w-md w-full relative z-10 border border-amber-300 shadow-amber-200"> */}
        <div className="flex justify-center mb-4">
          <Flower className="h-12 w-12 text-amber-500 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 font-lora text-center animate-fade-in">
          Bienvenue, {session.user?.name || session.user?.email} !
        </h1>
        <p className="text-gray-600 text-center mt-4">
          Voici votre tableau de bord KarmaBoard.
        </p>
        <p className="text-gray-600 text-center mt-2">
          Rôle : {session.user?.role}
        </p>
        <div className="mt-6 flex justify-center">
          <CustomButton
            variant="secondary"
            label="Se déconnecter"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2"
          >
            <Flower className="h-4 w-4" />
            Se déconnecter
          </CustomButton>
        </div>
        {/* </div> */}
      </div>
    </section>
  );
}
