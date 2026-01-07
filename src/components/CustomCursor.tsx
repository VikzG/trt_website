import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // On cache au début pour éviter le flash en haut à gauche
  const [enabled, setEnabled] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Détection simplifiée : On active le curseur SEULEMENT si c'est un écran large (> 1024px)
    // ET qu'on n'est pas uniquement sur un mode tactile
    const checkDevice = () => {
      const isDesktop = window.innerWidth > 1024;
      setEnabled(isDesktop);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true); // On affiche dès le premier mouvement
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, enabled, isVisible]);

  // Si on est sur mobile ou tablette, on ne rend rien
  if (!enabled || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {/* POINT CENTRAL : Gris foncé avec bordure blanche pour contraste total */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-1.5 h-1.5 bg-zinc-800 border border-white/50 rounded-full shadow-sm"
      />

      {/* ANNEAU : Mix-blend-difference */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? "rgba(255,255,255,1)" : "rgba(150,150,150,0.5)",
        }}
        className="w-8 h-8 border rounded-full mix-blend-difference"
      />
    </div>
  );
};

export default CustomCursor;