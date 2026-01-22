import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // --- ÉTAT AUDIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Erreur play:", err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

useEffect(() => {
    const autoPlayAudio = () => {
      // On ne tente l'autoplay que si la musique ne joue pas DU TOUT
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            // UNE FOIS QUE ÇA JOUE, on supprime l'écouteur définitivement
            window.removeEventListener("click", autoPlayAudio);
          })
          .catch((err) => console.log("Attente interaction utilisateur..."));
      }
    };

    window.addEventListener("click", autoPlayAudio);
    return () => window.removeEventListener("click", autoPlayAudio);
  }, []); // On laisse le tableau de dépendances vide ici

  const menuVariants: Variants = {
    closed: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut", when: "afterChildren" } },
    opened: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], when: "beforeChildren" } },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 15, filter: "blur(4px)" },
    opened: (i: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const menuItems = ["Présentation", "Services", "Créations", "Contact"];

  return (
    <>
      {/* Élément Audio Invisible */}
      <audio
        ref={audioRef}
        src="/audio/ambiant_music.mp3"
        loop
      />

      <nav
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
          scrollY > 50 || isMenuOpen
            ? "py-4 bg-black/95 backdrop-blur-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[95%] mx-auto px-8 flex justify-between items-center">
          
          {/* Logo */}
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="text-2xl font-bold font-Vogue text-white tracking-[0.2em] cursor-pointer hover:opacity-70 transition-opacity"
          >
            L.A.S
          </div>

          <div className="flex items-center space-x-8">
            {/* --- WAVE AUDIO ICON --- */}
            <button 
              onClick={toggleAudio}
              className="flex items-end justify-center space-x-[3px] h-5 cursor-pointer group"
              title={isPlaying ? "Couper le son" : "Activer le son"}
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: isPlaying ? [10, 20, 10, 15, 8, 20] : 2,
                  }}
                  transition={{
                    duration: 0.6 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`w-[2px] bg-white group-hover:bg-gray-400 transition-colors ${!isPlaying && 'opacity-50'}`}
                />
              ))}
            </button>

            {/* Bouton Burger */}
            <button
              className="relative z-[70] w-10 h-10 text-white flex flex-col items-end justify-center group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="flex flex-col items-end space-y-2">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 5, width: "32px" } : { rotate: 0, y: 0, width: "32px" }}
                  className="h-px bg-white block"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -5, width: "32px" } : { rotate: 0, y: 0, width: "20px" }}
                  className="h-px bg-white block"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed" animate="opened" exit="closed" variants={menuVariants}
            className="fixed inset-0 bg-black z-[50] flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <div className="flex flex-col space-y-8 md:space-y-12 text-center relative z-10">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item} custom={i} variants={linkVariants}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className="text-4xl md:text-7xl font-Vogue text-white/60 hover:text-white transition-all duration-500 hover:tracking-[0.15em] group uppercase"
                >
                  <span className="relative">
                    {item}
                    <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-white transition-all duration-500 group-hover:w-full group-hover:left-0" />
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-12 text-white font-Vogue tracking-[0.6em] text-[10px] md:text-xs"
            >
              LES ARTISANS SONORES
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;