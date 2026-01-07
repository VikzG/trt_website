import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const Presentation = () => {
  const containerRef = useRef(null);
  
  // Effet de parallaxe pour le halo lumineux
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yLight = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Délai entre chaque élément
        delayChildren: 0.3,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] // Cubic-bezier pour un mouvement fluide haut de gamme
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="présentation"
      className="py-40 bg-black text-white relative overflow-hidden"
    >
      {/* Halo lumineux avec Parallaxe */}
      <motion.div 
        style={{ y: yLight }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[800px] h-[800px] bg-white/5 rounded-full blur-[140px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20% 0px" }}
        >
          {/* Label Minimaliste */}
          <motion.div variants={textVariants} className="mb-16">
            <span className="text-xs uppercase tracking-[0.6em] text-gray-500 border-l border-r border-gray-800 px-6 py-2">
              Studio de Création
            </span>
          </motion.div>

          {/* Titre Principal : L'Impact Visuel */}
          <motion.h2 
            variants={textVariants}
            className="text-4xl md:text-7xl lg:text-[5.5rem] font-Vogue leading-[1.05] mb-16 tracking-tight"
          >
            L'excellence du <span className="text-white italic">conservatoire</span> <br /> 
            au service de votre <span className="text-white">identité sonore</span>.
          </motion.h2>

          {/* Description : La Mission */}
          <motion.p 
            variants={textVariants}
            className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed mb-20"
          >
            Nous forgeons des émotions acoustiques sur mesure. Des œuvres 
            <span className="text-white font-normal"> durables</span> pour ancrer votre marque, 
            ou <span className="text-white font-normal"> éphémères</span> pour sublimer vos lancements.
          </motion.p>

          {/* Signature Finale Cinématique */}
          <motion.div 
            variants={textVariants}
            className="flex flex-col items-center"
          >
            <div className="h-20 w-px bg-gradient-to-b from-gray-800 to-transparent mb-8" />
            <p className="text-white font-Vogue text-2xl tracking-widest opacity-60 uppercase">
              Les Artisans Sonores
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Presentation;