import { motion } from 'framer-motion';

const StickyCTAMobile = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, type: 'spring', stiffness: 100 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 20px',
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0, 255, 136, 0.2)',
        display: 'none',
        zIndex: 9998,
      }}
      className="sticky-cta-mobile"
    >
      <style>{`
        @media (max-width: 768px) {
          .sticky-cta-mobile {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
        }
      `}</style>
      
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
          Solo 3 posti rimasti
        </div>
        <div style={{ fontSize: '12px', color: '#888' }}>
          Candidati ora e trasforma il tuo brand
        </div>
      </div>
      
      <motion.a
        href="#cta"
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '14px 24px',
          background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 700,
          color: '#0a0a0f',
          whiteSpace: 'nowrap',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
        }}
      >
        Candidati 🚀
      </motion.a>
    </motion.div>
  );
};

export default StickyCTAMobile;