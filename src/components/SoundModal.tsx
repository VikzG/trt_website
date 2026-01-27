import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalData {
  videoFile: string;
  soundFile: string;
  title: string;
  client: string;
  type: string;
}

interface SoundModalProps {
  data: ModalData | null;
  isOpen: boolean;
  onClose: () => void;
}

const SoundModal: React.FC<SoundModalProps> = ({ data, isOpen, onClose }) => {
// Gestion des effets secondaires à l'ouverture/fermeture
  useEffect(() => {
    if (isOpen) {
      // 1. Bloquer le scroll
      document.body.style.overflow = "hidden";
      // 2. Couper la musique de fond
      window.dispatchEvent(new Event("portfolioPlay"));
    } else {
      // 3. Rétablir le scroll
      document.body.style.overflow = "unset";
      // 4. Relancer la musique de fond
      window.dispatchEvent(new Event("portfolioPause"));
    }

    // Nettoyage de sécurité si le composant est supprimé brusquement
    return () => {
      document.body.style.overflow = "unset";
      window.dispatchEvent(new Event("portfolioPause"));
    };
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-4 md:p-10"
        >
          {/* Bouton Fermer */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-[110] text-white/50 hover:text-white transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <span className="text-[10px] uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-all">
                Fermer
              </span>
              <X className="w-8 h-8 stroke-1" />
            </div>
          </button>

          <div className="w-full max-w-6xl flex flex-col items-center">
            {/* Conteneur Vidéo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-video bg-zinc-900 shadow-2xl overflow-hidden"
            >
              <video
                key={data.videoFile} // Important pour recharger la vidéo quand on change de projet
                src={data.videoFile}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full object-contain"
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </motion.div>

            {/* Infos du projet sous la vidéo */}
            <div className="mt-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl md:text-6xl font-Vogue text-white mb-4 tracking-tight">
                  {data.title}
                </h2>
                <div className="flex space-x-6 text-[10px] uppercase tracking-[0.4em] text-gray-500 font-medium">
                  <span>Client: {data.client || "Studio"}</span>
                  <span className="text-gray-800">|</span>
                  <span>Type: {data.type || "Sound Design"}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="hidden md:block"
              >
                <div className="h-px w-32 bg-white/20 mb-4" />
                <p className="text-[10px] uppercase tracking-[0.6em] text-white/40">
                  Les Artisans Sonores — Studio
                </p>
              </motion.div>
            </div>
          </div>

          {/* Background Decor (Lignes de fréquence subtiles ou halo) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute top-full left-0 w-full h-[50vh] bg-gradient-to-t from-white/10 to-transparent blur-3xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SoundModal;
