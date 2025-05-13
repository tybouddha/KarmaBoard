"use client";
import CustomButton from "./shared/CustomButton";
import { useRouter } from "next/navigation";

type HeroSectionPropsType = {
  titre: string;
  soustitre: string;
  description: string;
};

export default function HeroSection({
  titre,
  soustitre,
  description,
}: HeroSectionPropsType) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20 px-6"
      style={{ backgroundImage: "url('/img/lotus.png')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl max-w-2xl mx-auto p-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">{titre}</h1>
        <h2 className="text-lg font-semibold text-gray-700">{soustitre}</h2>
        <p className="text-gray-600 font-medium">{description}</p>

        <CustomButton
          variant="primary"
          onClick={handleClick}
          className="mt-6"
          label="Se Connecter"
        >
          Se Connecter
        </CustomButton>

        <CustomButton
          variant="secondary"
          onClick={() => console.log("En savoir plus")}
          className="mt-4 hover:scale-105"
        >
          En savoir plus
        </CustomButton>
      </div>
    </section>
  );
}
