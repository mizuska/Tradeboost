import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const GummyCandle = ({ delay, x, isGreen }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -20, 0, -10, 0],
        scaleY: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: 'absolute',
        left: x,
        bottom: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Stoppino superiore */}
      <div style={{
        width: '2px',
        height: '15px',
        background: isGreen ? '#00ff88' : '#ff3366',
        borderRadius: '2px',
      }} />
      
      {/* Corpo candela gommosa */}
      <motion.div
        animate={{
          scaleX: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: '24px',
          height: '50px',
          background: isGreen 
            ? 'linear-gradient(180deg, #00ff88, #00cc6a)' 
            : 'linear-gradient(180deg, #ff3366, #cc2952)',
          borderRadius: '6px',
          boxShadow: isGreen 
            ? '0 0 20px rgba(0, 255, 136, 0.5)' 
            : '0 0 20px rgba(255, 51, 102, 0.5)',
        }}
      />
      
      {/* Stoppino inferiore */}
      <div style={{
        width: '2px',
        height: '10px',
        background: isGreen ? '#00ff88' : '#ff3366',
        borderRadius: '2px',
      }} />
    </motion.div>
  );
};

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onLoadingComplete?.();
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0a0a0f',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
          }}
        >
          {/* Candele gommose animate */}
          <div style={{
            position: 'relative',
            width: '280px',
            height: '150px',
            marginBottom: '40px',
          }}>
            <GummyCandle delay={0} x="20px" isGreen={true} />
            <GummyCandle delay={0.2} x="60px" isGreen={false} />
            <GummyCandle delay={0.4} x="100px" isGreen={true} />
            <GummyCandle delay={0.6} x="140px" isGreen={true} />
            <GummyCandle delay={0.8} x="180px" isGreen={false} />
            <GummyCandle delay={1} x="220px" isGreen={true} />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '32px',
              fontWeight: 800,
              marginBottom: '30px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Trade<span style={{ color: '#00ff88' }}>Boost</span>
          </motion.div>

          {/* Progress bar */}
          <div style={{
            width: '200px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00ff88, #00cc6a)',
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
              }}
            />
          </div>

          {/* Percentage */}
          <motion.div
            style={{
              marginTop: '15px',
              fontSize: '14px',
              color: '#888',
              fontFamily: "'Courier New', monospace",
            }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;