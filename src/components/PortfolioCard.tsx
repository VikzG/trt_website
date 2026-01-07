import React from "react";
import { motion } from "framer-motion";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  coverImage: string;
  client?: string;
  type?: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
  onOpen: (item: PortfolioItem) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  onOpen,
}) => {
  return (
    <div className="group cursor-none w-full" onClick={() => onOpen(item)}>
      {/* Conteneur de l'image / Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 mb-6">
        {/* L'image avec effet de zoom lent au hover */}
        <motion.img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110"
        />

        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
          {/* Bouton Play Minimaliste */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 border border-white/50 rounded-full flex items-center justify-center text-white"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold italic pl-1">
                Play
              </span>
            </motion.div>
          </div>
        </div>

        {/* Badge de catégorie discret en haut à gauche */}
        <div className="absolute top-6 left-6 overflow-hidden">
          <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-white opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            {item.type || "Studio Project"}
          </span>
        </div>
      </div>

      {/* Informations sous l'image */}
      <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight transition-colors duration-300 group-hover:text-zinc-500 uppercase">
            {item.title}
          </h3>
          <div className="flex items-center mt-2 space-x-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              {item.category}
            </p>
            <span className="w-1 h-1 bg-zinc-200 rounded-full" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              {item.client || "L.A.S."}
            </p>
          </div>
        </div>

        {/* Numérotation stylisée (utilise l'ID ou l'index) */}
        <div className="text-xs font-Vogue text-zinc-300 group-hover:text-black transition-colors duration-500 pt-1">
          / 0{item.id}
        </div>
      </div>
    </div>
  );
};
