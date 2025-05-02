import { Button } from "@/components/ui/button";
import HeroSection from "@/components/heroComponent";

export default function Home() {
  return (
    <>
      <HeroSection></HeroSection>

      <Button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">
        Se connecter
      </Button>
    </>
  );
}
