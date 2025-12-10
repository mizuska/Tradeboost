import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(target);
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>
      {Number.isInteger(parseFloat(target)) ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
};

const Hero = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 40px 80px',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      <div style={{ flex: 1, maxWidth: '750px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(0, 255, 136, 0.1)',
            border: '1px solid #00ff88',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#00ff88',
            marginBottom: '24px',
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            background: '#00ff88',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
          }} />
          Finanziamenti Attivi
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-1px',
          }}
        >
          Trasforma il Tuo{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00ff88, #00ffcc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Personal Brand</span>{' '}
          in un{' '}
          <span style={{ position: 'relative' }}>
            Business Milionario
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '30%',
              background: 'rgba(0, 255, 136, 0.3)',
              zIndex: -1,
              borderRadius: '4px',
            }} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '20px',
            color: '#c0c0c0',
            marginBottom: '40px',
            maxWidth: '550px',
          }}
        >
          Tu ci metti la faccia. Noi ci mettiamo <strong style={{ color: '#fff' }}>tutto il resto</strong>: 
          copywriter, video editor, strategie e budget per le ads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '40px',
            marginBottom: '40px',
            padding: '24px',
            background: '#12121a',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '36px', fontWeight: 800 }}>
              <AnimatedCounter target={127} />
            </span>
            <span style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Brand Finanziati</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '36px', fontWeight: 800 }}>
              <AnimatedCounter target={2.4} suffix="M€" />
            </span>
            <span style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>Budget Investito</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '36px', fontWeight: 800 }}>
              <AnimatedCounter target={340} suffix="%" />
            </span>
            <span style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>ROI Medio</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#cta"
            whileHover={{ y: -3, boxShadow: '0 15px 40px rgba(0, 255, 136, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: 600,
              color: '#0a0a0f',
              boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)',
            }}
          >
            <span>Candidati Ora</span>
            <span>→</span>
          </motion.a>
          <span style={{ fontSize: '14px', color: '#888' }}>Solo 5 posti disponibili questo mese</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
