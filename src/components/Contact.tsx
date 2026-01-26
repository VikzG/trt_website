import { motion, Variants } from "framer-motion";

const Contact = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="contact"
      className="py-40 bg-black text-white relative overflow-hidden"
    >
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Label de section avec trait vertical */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mb-12"
        >
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-8xl font-Vogue mb-10 leading-[1.1] tracking-tighter"
        >
          Prêt à définir <br />
          <span>votre signature sonore ?</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-16"
        >
          Discutons ensemble de votre projet.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="relative inline-block group"
        >
          <a href="mailto:lesartisanssonores@gmail.com">
            {/* Bouton Cinématique : Blanc qui devient Noir au hover */}
            <button className="relative px-16 py-6 border border-white/30 overflow-hidden transition-colors duration-500 group-hover:text-black group-hover:border-white uppercase tracking-[0.3em] text-xs font-bold md:px-20">
              <span className="relative z-10">Démarrer un projet</span>

              {/* Le volet de remplissage Blanc */}
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-600 ease-[0.22,1,0.36,1]" />
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
