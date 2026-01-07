import { motion, Variants } from "framer-motion";

const Hero = () => {
  // Animation pour le titre (effet de dévoilement vers le haut + flou)
  const titleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(10px)" 
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        delay: custom,
        ease: [0.22, 1, 0.36, 1], // Même courbe élégante que la présentation
      }
    })
  };

  // Animation pour la ligne verticale en bas
  const scrollLineVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 48, // 12 unités Tailwind (h-12)
      transition: { delay: 2.5, duration: 1, ease: "easeInOut" } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Vidéo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover"
          src="https://www.youtube.com/embed/KVxyGSPnfXo?autoplay=1&mute=1&loop=1&playlist=KVxyGSPnfXo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: "none" }}
        ></iframe>

        {/* Overlay progressif (noir vers transparent-ish) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 backdrop-blur-[1px]"></div>
      </div>

      {/* Contenu Textuel */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="overflow-hidden mb-2">
          <motion.p
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="text-3xl md:text-6xl text-white font-Vogue tracking-[0.2em] uppercase opacity-90"
          >
            Les Artisans
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <motion.p
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="text-7xl md:text-[9rem] text-white font-Vogue leading-none tracking-tighter"
          >
            Sonores
          </motion.p>
        </div>
      </div>

      {/* Indicateur de Scroll Cinématique */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-4"
        >
          Scroll
        </motion.p>
        <motion.div
          variants={scrollLineVariants}
          initial="hidden"
          animate="visible"
          className="w-px bg-gradient-to-b from-white to-transparent origin-top"
        />
      </div>
    </section>
  );
};

export default Hero;