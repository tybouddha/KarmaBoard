export default function HeroSection() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20 px-6"
      style={{ backgroundImage: "url('/img/lotus.png')" }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl max-w-2xl mx-auto p-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Bienvenue sur Karma Board
        </h1>
        <h2 className="text-lg font-semibold text-gray-700">
          Gérez vos projets avec sérénité
        </h2>
        <p className="text-gray-600 font-medium">
          La première plateforme inspirée du bouddhisme pour booster votre
          productivité sans stress.
        </p>
      </div>
    </section>
  );
}
