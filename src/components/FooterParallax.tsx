import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const FooterParallax = () => {
  const containerRef = useRef(null);

  // Tracking du scroll pour l'effet de dévoilement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Animations liées au scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  // Tes anciens Variants pour les éléments internes
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      ref={containerRef}
      className="sticky bottom-0 h-screen w-full bg-black z-10 overflow-hidden flex flex-col justify-end"
    >
      {/* BACKGROUND : L'image qui se dévoile */}
      <motion.div style={{ scale, opacity }} className="absolute inset-0">
        <img
          src="/cover/poster_hero.PNG"
          alt="Studio L.A.S."
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </motion.div>

      {/* CONTENU : Ta structure de liens fusionnée */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 w-[95%] mx-auto px-6 pb-12"
      >
        {/* Grille de liens - Intégralité de ton ancien contenu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-24 md:mb-32">
          {/* Colonne 1 : Identité */}
          <div className="flex flex-col">
            <h2 className="text-6xl md:text-8xl font-Vogue leading-none tracking-tighter mb-4 text-white">
              L.A.S
            </h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-light">
              Les Artisans <br /> Sonores
            </p>
          </div>

          {/* Colonne 2 : Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-8">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                "Jingle",
                "ADN Sonore",
                "Musique événementielle",
                "Habillage vidéo personnalisé",
                "Musique d'attente personnalisée",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:tracking-widest font-light text-sm uppercase"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Sections */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-8">
              Sections
            </h4>
            <ul className="space-y-4">
              {["Services", "Portfolio", "Présentation", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
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
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-8">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light uppercase tracking-wider">
              <li className="hover:text-white transition-colors cursor-default">
                Paris, France
              </li>
              <li>
                <a
                  href="mailto:lesartisanssonores@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  lesartisanssonores@gmail.com
                </a>
              </li>
              <li className="hover:text-white transition-colors">
                +33 6 31 51 65 17
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT : Ton ancien footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-12 text-[10px] tracking-[0.3em] text-gray-600 uppercase">
          <p>&copy; {new Date().getFullYear()} L.A.S — Les Artisans Sonores</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterParallax;
