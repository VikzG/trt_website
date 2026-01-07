import { motion, Variants } from "framer-motion";

const Footer = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-black text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      <motion.div
        className="max-w-[95%] mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Grille de liens - 4 colonnes sur LG, la première étant le Logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          
          {/* Colonne 1 : Identité */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h2 className="text-5xl font-Vogue leading-none tracking-tighter mb-4">
              L.A.S.
            </h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-light">
              Les Artisans <br /> Sonores
            </p>
          </motion.div>
            
          {/* Colonne 2 : Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-8">Services</h4>
            <ul className="space-y-4">
              {["Jingle", "ADN Sonore", "Musique événementielle", "Habillage vidéo personnalisé", "Musique d'attente personnalisée"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:tracking-widest font-light text-sm uppercase">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne 3 : Agence */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-8">Sections</h4>
            <ul className="space-y-4">
              {["Services", "Portfolio", "Présentation", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:tracking-widest font-light text-sm uppercase">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne 4 : Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-600 mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light uppercase tracking-wider">
              <li className="hover:text-white transition-colors cursor-default">Paris, France</li>
              <li>
                <a href="mailto:lesartisanssonores@gmail.com" className="hover:text-white transition-colors">
                  lesartisanssonores@gmail.com
                </a>
              </li>
              <li className="hover:text-white transition-colors">+33 6 31 51 65 17</li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright & Mentions */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 text-[10px] tracking-[0.3em] text-gray-600 uppercase"
        >
          <p>&copy; 2026 L.A.S. — Les Artisans Sonores</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Confidentialité</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;