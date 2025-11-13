import { useState, useEffect, useRef } from "react";
import {
  Music,
  Mic,
  Radio,
  Headphones,
  Menu,
  X,
  Play,
  Volume2,
  Pause,
  RotateCcw,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string>("");
  const [audioDurations, setAudioDurations] = useState<{
    [key: string]: string;
  }>({});
  const [audioProgress, setAudioProgress] = useState<number>(0);

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

  const loadAudioDuration = (audioFile: string) => {
    if (audioDurations[audioFile]) return;

    // Créer un nouvel élément audio temporaire
    const tempAudio = new Audio();

    const handleMetadata = () => {
      const minutes = Math.floor(tempAudio.duration / 60);
      const seconds = Math.floor(tempAudio.duration % 60);
      const formatted =
        tempAudio.duration < 60
          ? `${seconds} sec`
          : `${minutes}:${seconds.toString().padStart(2, "0")}`;

      setAudioDurations((prev) => ({ ...prev, [audioFile]: formatted }));
      tempAudio.removeEventListener("loadedmetadata", handleMetadata);
    };

    tempAudio.addEventListener("loadedmetadata", handleMetadata);
    tempAudio.src = audioFile;
    tempAudio.load();
  };

  const handlePlayPause = (index: number, audioFile: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      setAudioProgress(0);
    } else {
      if (currentAudioSrc !== audioFile) {
        audio.src = audioFile;
        setCurrentAudioSrc(audioFile);
        setAudioProgress(0);
      }
      audio.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
      setPlayingIndex(index);
    }
  };

  const handleRestart = (index: number, audioFile: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentAudioSrc !== audioFile) {
      audio.src = audioFile;
      setCurrentAudioSrc(audioFile);
    }

    audio.currentTime = 0;
    setAudioProgress(0);
    audio.play().catch((err) => {
      console.warn("Audio playback failed:", err);
    });
    setPlayingIndex(index);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAudioEnd = () => {
      setPlayingIndex(null);
      setAudioProgress(0);
    };

    const handleTimeUpdate = () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
      }
    };

    audio.addEventListener("ended", handleAudioEnd);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

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
            <div className="text-2xl font-bold text-white tracking-tight hover:scale-110 transition-transform duration-300">
              L.A.S.
            </div>

            <div className="hidden md:flex space-x-8">
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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight animate-scale-in">
              L.A.S.
            </h1>
            <p className="text-3xl md:text-4xl text-gray-300 mb-8 font-light animate-fade-in-up delay-200">
              Les Artisans Sonore
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
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Nos Créations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez quelques exemples de nos compositions sonores
            </p>
          </div>

          <audio ref={audioRef} />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              const sounds = [
                {
                  title: "ADN Sonore 1",
                  client: "Entreprise Tech",
                  audioFile: "/audio/ADN_sonore_1.wav",
                  type: "ADN Sonore",
                },
                {
                  title: "ADN Sonore 2",
                  client: "Entreprise Tech",
                  audioFile: "/audio/ADN_sonore_2.wav",
                  type: "ADN Sonore",
                },
                {
                  title: "ADN Sonore 3",
                  client: "Entreprise Tech",
                  audioFile: "/audio/ADN_sonore_3.wav",
                  type: "ADN Sonore",
                },
                {
                  title: "ADN Sonore Electro",
                  client: "Campagne Digitale",
                  audioFile: "/audio/ADN_sonore_electro.wav",
                  type: "ADN Sonore",
                },
                                {
                  title: "ADN Sonore Funk",
                  client: "Campagne Digitale",
                  audioFile: "/audio/ADN_sonore_funk.wav",
                  type: "ADN Sonore",
                },
                {
                  title: "Jingle",
                  client: "Service Client",
                  audioFile: "/audio/jingle.wav",
                  type: "Jingle",
                },
                {
                  title: "Musique pour Défilé",
                  client: "Startup Innovation",
                  audioFile: "/audio/musique_pour_defile.wav",
                  type: "musique événementielle",
                },
                {
                  title: "Musique boucle Planant",
                  client: "Startup Innovation",
                  audioFile: "/audio/boucle_planant.wav",
                  type: "musique événementielle",
                },
              ];

              return sounds.map((sound, index) => {
                // Charger la durée au montage du composant
                if (!audioDurations[sound.audioFile]) {
                  loadAudioDuration(sound.audioFile);
                }

                return (
                  <div
                    key={sound.title}
                    className="group relative rounded-2xl p-8 border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-2xl overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-black transition-all duration-100"
                      style={{
                        clipPath:
                          playingIndex === index
                            ? `inset(0 ${100 - audioProgress}% 0 0)`
                            : "inset(0 100% 0 0)",
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                            playingIndex === index ? "bg-white" : "bg-black"
                          }`}
                        >
                          <Volume2
                            className={`w-8 h-8 transition-colors duration-300 ${
                              playingIndex === index
                                ? "text-black"
                                : "text-white"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors duration-300 ${
                            playingIndex === index
                              ? "bg-white text-black"
                              : "text-gray-500 bg-gray-100"
                          }`}
                        >
                          {sound.type}
                        </span>
                      </div>

                      <h3
                        className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                          playingIndex === index
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {sound.title}
                      </h3>
                      <p
                        className={`mb-3 transition-colors duration-300 ${
                          playingIndex === index
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {sound.client}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            playingIndex === index
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          {audioDurations[sound.audioFile] || "--:--"}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleRestart(index, sound.audioFile)
                            }
                            className="transition-all duration-300"
                          >
                            <RotateCcw className="w-6 h-6 mix-blend-difference" />
                          </button>
                          <button
                            onClick={() =>
                              handlePlayPause(index, sound.audioFile)
                            }
                            className="transition-all duration-300"
                          >
                            {playingIndex === index ? (
                              <Pause className="w-8 h-8" />
                            ) : (
                              <Play className="w-8 h-8" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      <section
        id="présentation"
        className="py-24 bg-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-6">Présentation</h2>
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
            <h2 className="text-5xl font-bold mb-6 animate-fade-in-up">
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
                <li>contact@lesartisanssonore.com</li>
                <li>+33 1 23 45 67 89</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 L.A.S. - Les Artisans Sonore. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
