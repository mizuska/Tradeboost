import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 40px',
        background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <nav style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>📈</span>
          <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Trade<span style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>Boost</span>
          </span>
        </div>
        <motion.a
          href="#cta"
          whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)' }}
          style={{
            padding: '12px 28px',
            background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
            borderRadius: '8px',
            fontWeight: 600,
            color: '#0a0a0f',
          }}
        >
          Inizia Ora
        </motion.a>
      </nav>
    </motion.header>
  );
};

export default Header;
