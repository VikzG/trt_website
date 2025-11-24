import { useState } from "react";
import { Play } from "lucide-react";

interface PortfolioItem {
  coverImage: string;
  title: string;
  type: string;
  client: string;
}

interface PortfolioCardProps {
  item: PortfolioItem;
  onOpen: (item: PortfolioItem) => void;
}

export function PortfolioCard({ item, onOpen }: PortfolioCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      onClick={() => onOpen(item)}
    >
      {/* Skeleton de chargement */}
      {!loaded && (
        <div className="w-full h-64 rounded-2xl bg-neutral-800 animate-pulse" />
      )}

      {/* Image réelle */}
      <img
        src={item.coverImage}
        alt={item.title}
        className={`w-full h-64 object-cover rounded-2xl transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay Play */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <Play className="w-10 h-10 text-white opacity-90" />
      </div>

      {/* Infos en bas */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
        <p className="text-sm opacity-80">{item.type}</p>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-xs opacity-70">{item.client}</p>
      </div>
    </div>
  );
}
