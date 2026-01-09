import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const Presentation = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yLight = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="présentation"
      className="py-32 md:py-48 bg-black text-white relative overflow-hidden"
    >
      {/* Halo de fond interactif */}
      <motion.div
        style={{ y: yLight }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30"
      >
        <div className="w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[160px]" />
      </motion.div>

      <div className="max-w-[95%] mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* TITRE PRINCIPAL */}
          <div className="mb-32">
            <motion.div variants={textVariants} className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.8em] text-gray-500 font-light">
                Studio de Création
              </span>
            </motion.div>

            <motion.h2
              variants={textVariants}
              className="text-4xl md:text-7xl lg:text-8xl font-Vogue leading-[1.1] tracking-tighter max-w-6xl"
            >
              Donnez une voix à vos valeurs grâce à nos créations musicales sur mesure.
            </motion.h2>
          </div>

          {/* SECTION MISSION (DÉBUT DU TEXTE) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <motion.div variants={textVariants} className="md:col-span-4">
              <h3 className="text-xs uppercase tracking-[0.4em] text-white font-bold mb-4">
                Notre mission
              </h3>
              <div className="h-px w-12 bg-white/30" />
            </motion.div>
            
            <motion.div variants={textVariants} className="md:col-span-8">
              <p className="text-2xl md:text-4xl font-light leading-snug text-gray-200">
                Construire l’environnement sonore qui reflète avec fidélité les valeurs de votre marque. 
                Nous sommes persuadés que la musique est un moyen universel de créer une connexion profonde avec les autres.
              </p>
            </motion.div>
          </div>

          {/* SECTION ARGUMENTAIRE (CORPS DU TEXTE) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
            <motion.div variants={textVariants} className="md:col-start-5 md:col-span-7 space-y-12">
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                Par ce biais, nous pouvons communiquer nos sentiments et partager des expériences qui nous rassemblent. 
                Elle donne des informations subtiles mais puissantes sur ce qui anime votre entreprise et les messages qu’elle souhaite faire passer à ses différents interlocuteurs.
              </p>

              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l border-white/10 pl-8">
                C’est dans cette optique que nous mettons à votre disposition nos années d’apprentissage au sein de conservatoires, 
                ainsi que notre expérience dans l’industrie musicale, afin de vous proposer des créations personnalisées et adaptées à vos besoins. 
                Ce savoir-faire a pour but de renforcer votre image de marque et/ou d’apporter un coup d’éclat à un moment clé.
              </p>

              <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed bg-white/5 p-8 rounded-sm">
                Nous proposons à la fois des <span className="text-white">services durables</span>, pensés pour correspondre à l’identité de votre marque et réutilisables à l’infini, 
                ainsi que des <span className="text-white italic">services éphémères</span>, répondant à un besoin ou à une action précise de votre marque, 
                limités dans le temps (saison, campagne de promotion, événement, etc.).
              </p>
            </motion.div>
          </div>

          {/* SIGNATURE FINALE */}
          <motion.div
            variants={textVariants}
            className="flex flex-col items-center pt-20"
          >
            <div className="h-20 w-px bg-gradient-to-b from-gray-800 to-transparent mb-10" />
            <p className="text-white font-Vogue text-xl md:text-2xl tracking-[0.6em] uppercase opacity-40">
              Les Artisans Sonores
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Presentation;