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


          {/* SECTION MISSION (DÉBUT DU TEXTE) */}
          <div className="flex flex-col gap-12 mb-24">
            <motion.div variants={textVariants} className="md:col-span-4">
              <h3 className="text-xs uppercase tracking-[0.4em] text-white font-bold mb-4">
                Présentation
              </h3>
              <div className="h-px w-12 bg-white/30" />
            </motion.div>

            <motion.div variants={textVariants} className="md:col-span-8">
              <p className="text-2xl md:text-5xl font-light leading-snug text-gray-200">
                Nous sommes <em className="font-normal">Les Artisans Sonores</em>, un <em className="font-normal">studio de création musicale </em>
                dédié à donner une <em className="font-normal">voix unique</em> à votre <em className="font-normal">marque</em>.<br/>Nous mettons
                notre <em className="font-normal">passion</em> et notre <em className="font-normal">savoir-faire</em> au service de <em className="font-normal">créations
                sonores sur mesure</em>, conçues pour <em className="font-normal">renforcer votre image de marque </em>
                et <em className="font-normal">sublimer les moments clés</em> de <em className="font-normal">votre histoire</em>.
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
