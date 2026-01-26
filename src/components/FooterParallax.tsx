import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FooterParallaxProps {
  scrollToSection: (sectionId: string) => void;
}

const FooterParallax = ({ scrollToSection }: FooterParallaxProps) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Fonction locale pour gérer le clic
  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id.toLowerCase());
  };

  return (
    <footer
      ref={containerRef}
      className="sticky bottom-0 h-screen w-full bg-black z-10 overflow-hidden flex flex-col justify-end"
    >
      {/* BACKGROUND */}
      <motion.div style={{ scale, opacity }} className="absolute inset-0">
        <img
          src="/cover/poster_hero.png"
          alt="Studio L.A.S."
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </motion.div>

      {/* CONTENU */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 w-[95%] mx-auto px-6 pb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mb-10 md:mb-32">
          
          {/* Colonne 1 : Identité (Cachée mobile) */}
          <div className="hidden lg:flex flex-col">
            <h2 className="text-6xl md:text-8xl font-Vogue leading-none tracking-tighter mb-4 text-white">
              L.A.S
            </h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-light">
              Les Artisans <br /> Sonores
            </p>
          </div>

          {/* Colonne 2 : Services (Tous pointent vers #services) */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-6 md:mb-8">
              Services
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                "Jingle",
                "ADN Sonore",
                "Musique événementielle",
                "Habillage vidéo personnalisé",
                "Musique d'attente personnalisée",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    onClick={(e) => handleLinkClick(e, "services")}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:tracking-widest font-light text-sm uppercase"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Sections (Pointent vers leurs IDs respectifs) */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-6 md:mb-8">
              Sections
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {["Services", "Créations", "Présentation", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => handleLinkClick(e, link === "Présentation" ? "presentation" : link.toLowerCase())}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:tracking-widest font-light text-sm uppercase"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-6 md:mb-8">
              Contact
            </h4>
            <ul className="space-y-3 md:space-y-4 text-sm text-gray-400 font-light uppercase tracking-wider">
              <li>Paris, France</li>
              <li>
                <a
                  href="mailto:lesartisanssonores@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  lesartisanssonores@gmail.com
                </a>
              </li>
              <li>+33 6 31 51 65 17</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-[10px] tracking-[0.3em] text-gray-600 uppercase">
          <p>&copy; {new Date().getFullYear()} L.A.S — Les Artisans Sonores</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterParallax;