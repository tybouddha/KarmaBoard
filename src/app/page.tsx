import HeroSection from "@/components/HeroSection";
import CustomButton from "@/components/shared/CustomButton";

export default function Home() {
  return (
    <>
      <HeroSection
        titre="Karma Board"
        soustitre="Gérez vos projets avec sérénité"
        description="La première plateforme inspirée du bouddhisme pour booster votre
          productivité sans stress."
      ></HeroSection>
      <CustomButton>Se Connecter</CustomButton>
    </>
  );
}
