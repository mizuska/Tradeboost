import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState(0);
  const [isPositive, setIsPositive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Simula i movimenti dell'equity
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.3) * 150; // Più probabilità positiva
      setValue(prev => {
        const newValue = prev + change;
        setIsPositive(change >= 0);
        return newValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Reset periodico per evitare numeri troppo grandi
  useEffect(() => {
    const resetInterval = setInterval(() => {
      setValue(Math.random() * 1000);
    }, 5000);

    return () => clearInterval(resetInterval);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: position.x - 35,
        y: position.y - 15,
        width: '70px',
        height: '30px',
        background: isPositive 
          ? 'rgba(0, 255, 136, 0.15)' 
          : 'rgba(255, 51, 102, 0.15)',
        border: `1px solid ${isPositive ? '#00ff88' : '#ff3366'}`,
        borderRadius: '4px',
        pointerEvents: 'none',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
        boxShadow: isPositive 
          ? '0 0 20px rgba(0, 255, 136, 0.3)' 
          : '0 0 20px rgba(255, 51, 102, 0.3)',
        opacity: isVisible ? 1 : 0,
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          color: isPositive ? '#00ff88' : '#ff3366',
          fontFamily: "'Courier New', monospace",
          textShadow: isPositive 
            ? '0 0 10px #00ff88' 
            : '0 0 10px #ff3366',
        }}
      >
        {isPositive ? '+' : ''}{value.toFixed(2)}
      </span>
    </motion.div>
  );
};

export default CustomCursor;
