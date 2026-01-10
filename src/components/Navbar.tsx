import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Gestion du scroll pour le changement de background
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquer le scroll du corps de la page quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

const menuVariants: Variants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren",
      },
    },
    opened: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
      },
    },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20, filter: "blur(10px)" }, // Légère remontée et flou
    opened: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const menuItems = ["Présentation","Services", "Créations", "Contact"];

return (
    <>
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
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black z-[50] flex flex-col justify-center items-center"
          >
            {/* Décoration d'arrière-plan (Effet Spectacle que nous avons fait avant) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <div className="flex flex-col space-y-8 md:space-y-12 text-center relative z-10">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item}
                  custom={i}
                  variants={linkVariants}
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

            {/* Signature Bas de Page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }} // Ajout d'un exit propre
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
