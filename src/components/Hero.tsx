import { motion, Variants } from "framer-motion";

const Hero = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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
          {/* Génération de barres animées */}
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
                duration: Math.random() * 3 + 1, // Durée aléatoire entre 1 et 4s
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.05, // Délai progressif pour un effet d'onde
              }}
              className="w-px md:w-[2px] bg-white/50 rounded-full mx-[1px]" // Barre très fine
            />
          ))}
        </div>
      </div>

{/* Contenu Textuel - Structure HIÉRARCHIQUE */}
<div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center">
  
  {/* "Les" - Correction : overflow-visible et padding */}
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

  {/* "ARTISANS" - Correction : py-4 pour laisser respirer les hautes de casses */}
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

  {/* "SONORES" - Correction : overflow-visible */}
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
</div>

      {/* Indicateur de Scroll */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex flex-col items-center md:bottom-52">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-4"
        >
          Découvrir
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