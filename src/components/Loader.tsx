import { useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ finishLoading }: { finishLoading: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 2500); 
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <motion.div
      // Animation de fondu : on part de 1 vers 0
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }} // Ease in out doux
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animation d'onde circulaire */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-64 h-64 border border-white/20 rounded-full"
      />
      
      <div className="relative overflow-hidden flex flex-col items-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-Vogue text-white tracking-[0.3em] mb-4"
        >
          L.A.S
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/40">
            Les Artisans Sonores
          </span>
          
          <div className="mt-8 w-12 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-white"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.div>
  );
};

export default Loader;