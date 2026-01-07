import { motion, Variants, AnimatePresence } from "framer-motion";
import { Music, Mic, Radio, Headphones, Play } from "lucide-react";
import { useState } from "react";

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const services = [
    { icon: <Music className="w-12 h-12" />, title: "Jingle", description: "Court motif sonore entre 5 et 10 secondes qui rend votre marque immédiatement identifiable grâce à une mélodie reconnaissable." },
    { icon: <Headphones className="w-12 h-12" />, title: "ADN Sonore", description: "Morceaux de musique entièrement personnalisés de 2 à 5 minutes, hymne officiel de votre marque adaptable à tous vos contenus et événements." },
    { icon: <Radio className="w-12 h-12" />, title: "Musique Événementielle", description: "Composition et arrangement spécialement créés pour vos événements : meetings, spectacles, campagnes, soirées, remises de diplôme." },
    { icon: <Play className="w-12 h-12" />, title: "Habillage Vidéo Personnalisé", description: "Composition sur mesure pour vidéos promotionnelles, réseaux sociaux, brand content, reportages, interviews et formations internes." },
    { icon: <Mic className="w-12 h-12" />, title: "Musique d'Attente Personnalisée", description: "Boucle musicale d'environ 30 secondes pour faire patienter vos clients lors d'appels téléphoniques, lives ou meetings." },
  ];

  return (
    <section id="services" className="py-32 bg-[#fafafa] overflow-hidden">
      <div className="max-w-[90%] mx-auto px-6">
        
        {/* --- Header Asymétrique Justifié à Droite --- */}
        <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-end mb-24 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:text-right"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gray-400 mb-4 block">
              Expertise
            </span>
            <h2 className="text-5xl md:text-8xl font-Vogue text-gray-900 leading-[0.9] tracking-tighter">
              Nos <br /> Services
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-sm"
          >
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              Des solutions acoustiques sur mesure, façonnées pour l'excellence et l'émotion.
            </p>
            <div className="h-px w-24 bg-black" />
          </motion.div>
        </div>

        {/* --- Grille de Services --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="group relative p-10 bg-white rounded-sm border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] cursor-none overflow-hidden w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-2.5rem)]"
            >
              {/* Effet de remplissage au survol */}
              <div className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1] z-0" />
              
              <div className="relative z-10 mix-blend-difference text-white">
                <div className="mb-8 transform transition-transform duration-500 group-hover:scale-110 origin-left">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">
                  {service.title}
                </h3>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 leading-relaxed font-light border-t border-white/20 text-gray-300">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 flex items-center text-[10px] uppercase tracking-[0.4em] opacity-70 group-hover:opacity-100">
                  <span>{openIndex === index ? "Fermer" : "Détails"}</span>
                  <span className={`ml-4 transform transition-transform duration-300 ${openIndex === index ? 'rotate-90' : ''}`}>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;