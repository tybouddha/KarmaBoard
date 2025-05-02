import { Button } from "./ui/button";

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
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20 px-6"
      style={{ backgroundImage: "url('/img/lotus.png')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl max-w-2xl mx-auto p-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">{titre}</h1>
        <h2 className="text-lg font-semibold text-gray-700">{soustitre}</h2>
        <p className="text-gray-600 font-medium">{description}</p>
        <Button>Se Connecter</Button>
      </div>
    </section>
  );
}
