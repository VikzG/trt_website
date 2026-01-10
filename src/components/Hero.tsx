import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- ANIMATIONS DU TITRE AU SCROLL ---
// Le titre commence à monter dès le début et finit sa course à 40% du scroll
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  
  // L'opacité reste pleine jusqu'à 10%, puis disparaît totalement à 35%
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.35], [1, 1, 0]);
  
  // Le flou arrive très vite après le début du scroll
  const textBlur = useTransform(scrollYProgress, [0, 0.15, 0.4], ["blur(0px)", "blur(0px)", "blur(12px)"]);

  // --- ANIMATIONS DE L'INDICATEUR (plus rapides) ---
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const scrollLineScale = useTransform(scrollYProgress, [0, 0.1, 0.3], [1, 1, 0]);

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        delay: custom,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const scrollLineVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 48,
      transition: { delay: 2.8, duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Vidéo */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-[1.05]"
          poster="/cover/poster_hero.PNG"
        >
          <source
            src="https://res.cloudinary.com/dynpasxkm/video/upload/v1767965303/video_hero_jqm9fn.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 backdrop-blur-[1px]"></div>
      </div>

      {/* Visualiseur de Son Discret */}
      <div className="absolute inset-0 z-[5] flex items-end justify-center pointer-events-none opacity-20">
        <div className="flex w-full max-w-[1200px] h-32 md:h-48 px-8 items-end justify-between">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{
                height: [
                  `${Math.random() * 80 + 20}%`,
                  `${Math.random() * 80 + 20}%`,
                  `${Math.random() * 80 + 20}%`,
                ],
              }}
              transition={{
                duration: Math.random() * 3 + 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.05,
              }}
              className="w-px md:w-[2px] bg-white/50 rounded-full mx-[1px]"
            />
          ))}
        </div>
      </div>

      {/* Contenu Textuel - AVEC PARALLAX STYLE */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity, filter: textBlur }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center"
      >
        <div className="overflow-visible py-2">
          <motion.span
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            custom={2.2}
            className="block text-xs md:text-sm uppercase tracking-[1em] text-white/50 mb-4 font-light ml-[1em]"
          >
            Les
          </motion.span>
        </div>

        <div className="overflow-visible py-4">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            custom={2.4}
            className="text-7xl md:text-[11rem] lg:text-[13rem] text-white font-Vogue leading-[1] md:leading-[0.85] tracking-[-0.02em] uppercase"
          >
            Artisans
          </motion.h1>
        </div>

        <div className="overflow-visible py-2">
          <motion.p
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            custom={2.7}
            className="text-xl md:text-4xl text-white font-Vogue tracking-[1.2em] uppercase opacity-70 ml-[1.2em]"
          >
            Sonores
          </motion.p>
        </div>
      </motion.div>

{/* Indicateur de Scroll Animé - Version ULTIME CENTRAGE */}
      <motion.div 
        style={{ 
          opacity: scrollIndicatorOpacity,
          y: scrollIndicatorY 
        }}
        // On utilise left-0 right-0 pour occuper TOUTE la largeur et forcer le centrage
        className="absolute bottom-36 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-20 md:bottom-52"
      >
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            // On compense le tracking avec une marge négative à droite au lieu de l'indentation
            className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-4 mr-[-0.5em] text-center whitespace-nowrap"
          >
            Découvrir
          </motion.p>
          
          <motion.div
            variants={scrollLineVariants}
            initial="hidden"
            animate="visible"
            style={{ scaleY: scrollLineScale }}
            className="w-px h-12 bg-gradient-to-b from-white to-transparent origin-top"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;