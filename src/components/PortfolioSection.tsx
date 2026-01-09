import React from "react";
import { motion, Variants } from "framer-motion";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioSectionProps {
  portfolioData: any[];
  openModal: (item: any) => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolioData,
  openModal,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#fafafa]">
      <div className="max-w-[95%] mx-auto px-6">
        
        {/* --- Header Corrigé --- */}
        {/* On utilise items-start par défaut (mobile) et items-end sur desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-auto"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gray-400 mb-4 block">
              Projets
            </span>
            {/* Taille ajustée pour mobile (text-5xl) vs desktop (text-8xl) */}
            <h2 className="text-5xl md:text-8xl font-Vogue text-gray-900 leading-[0.9] tracking-tighter">
              Nos <br /> Créations
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 font-light max-w-sm text-left md:text-right leading-relaxed"
          >
            Une immersion dans nos dernières signatures acoustiques et
            compositions sur mesure.
          </motion.p>
        </div>

        {/* Grille Flexbox */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-y-12 md:gap-y-16 gap-x-8"
        >
          {portfolioData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]"
            >
              <PortfolioCard item={item} onOpen={openModal} />
            </motion.div>
          ))}
        </motion.div>

        {/* Note de bas de page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 md:mt-32 pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start gap-6"
        >
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 max-w-2xl font-light italic leading-loose">
            * Les vidéos présentées sur cette page sont utilisées uniquement à
            des fins de démonstration. Tous les droits reviennent à leurs
            auteurs respectifs.
          </p>
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-300 whitespace-nowrap">
            © 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;