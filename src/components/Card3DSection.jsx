import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Card3DSection = ({ children, index, zIndex = 10 }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  // Effetto scala - la carta si ingrandisce leggermente mentre entra
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  
  // Effetto rotazione 3D - la carta ruota mentre entra
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  
  // Effetto opacità
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]);
  
  // Effetto ombra dinamica
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        rotateX,
        opacity,
        y,
        position: 'relative',
        zIndex: zIndex + index,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transformOrigin: 'center top',
        willChange: 'transform',
      }}
    >
      <div style={{
        background: '#0a0a0f',
        borderRadius: index > 0 ? '40px 40px 0 0' : '0',
        boxShadow: index > 0 ? '0 -20px 60px rgba(0, 0, 0, 0.5), 0 -5px 20px rgba(0, 255, 136, 0.1)' : 'none',
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card3DSection;