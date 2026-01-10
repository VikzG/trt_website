import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
}

function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,        // Intensité du lissage (0.1 = très fluide)
        duration: 1.5,     // Durée de l'inertie
        smoothWheel: true, 
        wheelMultiplier: 1, 
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll