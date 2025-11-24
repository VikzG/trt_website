import { useState, useEffect } from "react";
import LightRays from "./components/LightRays";
import { Music, Mic, Radio, Headphones, Menu, X, Play } from "lucide-react";
import portfolioData from "./components/portfolioData";
import { PortfolioCard } from "./components/PortfolioCard";
import { SoundModal } from "./components/SoundModal";

interface ModalData {
  videoFile: string;
  soundFile: string;
  title: string;
  client: string;
  type: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (item: any) => {
    // Normalize incoming PortfolioItem (or similar) into ModalData shape
    const data: ModalData = {
      videoFile: item.videoFile ?? item.video ?? "",
      soundFile: item.audioFile ?? item.audio ?? "",
      title: item.title ?? item.name ?? "",
      client: item.client ?? "",
      type: item.type ?? "",
    };
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalData(null), 300);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  const services = [
    {
      icon: <Music className="w-12 h-12" />,
      title: "Jingle",
      description:
        "Court motif sonore entre 5 et 10 secondes qui rend votre marque immédiatement identifiable grâce à une mélodie reconnaissable.",
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: "ADN Sonore",
      description:
        "Morceaux de musique entièrement personnalisés de 2 à 5 minutes, hymne officiel de votre marque adaptable à tous vos contenus et événements.",
    },
    {
      icon: <Radio className="w-12 h-12" />,
      title: "Musique Événementielle",
      description:
        "Composition et arrangement spécialement créés pour vos événements : meetings, spectacles, campagnes, soirées, remises de diplôme.",
    },
    {
      icon: <Play className="w-12 h-12" />,
      title: "Habillage Vidéo Personnalisé",
      description:
        "Composition sur mesure pour vidéos promotionnelles, réseaux sociaux, brand content, reportages, interviews et formations internes.",
    },
    {
      icon: <Mic className="w-12 h-12" />,
      title: "Musique d'Attente Personnalisée",
      description:
        "Boucle musicale d'environ 30 secondes pour faire patienter vos clients lors d'appels téléphoniques, lives ou meetings.",
    },
  ];

  return (
    <div className="min-h-screen bg-white cursor-none">
      <div
        className="sound-cursor"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-black/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold font-Vogue text-white tracking-tight hover:scale-110 transition-transform duration-300">
              L.A.S.
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["Services", "Portfolio", "Présentation", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-white/90 hover:text-white transition-colors duration-300 font-medium"
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 space-y-3">
              {["Services", "Portfolio", "Présentation", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-white/90 hover:text-white transition-colors duration-300 w-full text-left"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ zIndex: 20 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#FFFFFF"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div>
            <h1 className="text-6xl md:text-8xl font-Vogue text-white mb-6 leading-tight animate-scale-in">
              L.A.S.
            </h1>
            <p className="text-3xl md:text-4xl text-gray-300 mb-8 font-light font-Vogue animate-fade-in-up delay-200">
              Les Artisans Sonores
            </p>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Affirmez vos valeurs grâce à nos créations musicales sur mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <button
                onClick={() => scrollToSection("contact")}
                className="group px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Démarrer un projet
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="px-8 py-4 bg-transparent text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 border border-white/40 hover:border-white/80"
              >
                Écouter nos créations
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
        </div>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-Vogue text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des services de création musicale adaptés à tous vos projets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-black transition-all duration-500 hover:shadow-2xl animate-fade-in-up cursor-pointer hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-black mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="text-center mb-16">
          {" "}
          <h2 className="text-5xl text-gray-900 mb-4 font-Vogue">
            {" "}
            Nos Créations{" "}
          </h2>{" "}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {" "}
            Découvrez quelques exemples de nos compositions sonores{" "}
          </p>{" "}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-20 px-8">
          {portfolioData.map((item) => (
            <PortfolioCard key={item.id} item={item} onOpen={openModal} />
          ))}
        </div>
      </section>
      {/* MODALE */}
      <SoundModal data={modalData} isOpen={isModalOpen} onClose={closeModal} />

      <section
        id="présentation"
        className="py-24 bg-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-Vogue mb-6">Présentation</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Nous mettons à votre service nos années d'apprentissage au sein de
              conservatoires, ainsi que notre expérience dans l'industrie
              musicale, pour vous proposer des créations personnalisées et
              adaptées à vos besoins.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="animate-scale-in delay-300 bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 hover:bg-white/10 transition-all duration-500">
              <h3 className="text-3xl font-bold mb-8 text-center">
                Notre mission
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg animate-fade-in delay-400">
                Ces compositions ont pour but de renforcer votre image de marque
                et d'apporter un coup d'éclat à un moment clé.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg animate-fade-in delay-500">
                Nous proposons à la fois des{" "}
                <span className="font-semibold text-white">
                  services durables
                </span>
                , pensés pour coller à l'identité de votre marque et
                réutilisables à l'infini, ainsi que des{" "}
                <span className="font-semibold text-white">
                  services éphémères
                </span>{" "}
                correspondant à un besoin ou une action précise de votre marque,
                limitée dans le temps.
              </p>
              <div className="bg-white/5 rounded-2xl p-6 mt-8 border border-white/10 animate-fade-in delay-1000 hover:border-white/20 transition-all duration-300">
                <p className="text-gray-400 leading-relaxed italic text-center">
                  Saisons, campagnes de promotion, événements, lancements de
                  produits... Nous nous adaptons à vos besoins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 bg-white text-black relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-black rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div>
            <h2 className="text-5xl font-Vogue mb-6 animate-fade-in-up">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl mb-12 text-gray-700 animate-fade-in-up delay-200">
              Contactez-nous pour discuter de vos besoins et obtenir un devis
              personnalisé
            </p>
            <button className="px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 animate-scale-in delay-400 hover:shadow-2xl">
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">L.A.S.</div>
              <p className="text-gray-400 text-sm">Les Artisans Sonore</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Composition
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Production
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sound Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Identité Sonore
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Agence</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Paris, France</li>
                <li>lesartisanssonores@gmail.com</li>
                <li>+33 6 31 51 65 17</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 L.A.S. - Les Artisans Sonores. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
