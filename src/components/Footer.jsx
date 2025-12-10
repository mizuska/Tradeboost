const Footer = () => {
  return (
    <footer style={{
      padding: '60px 40px',
      background: '#080810',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '15px',
        }}>
          <span style={{ fontSize: '28px' }}>📈</span>
          <span style={{ fontSize: '24px', fontWeight: 800 }}>
            Trade<span style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>Boost</span>
          </span>
        </div>
        
        <p style={{ color: '#888', marginBottom: '30px' }}>
          Finanziamo Personal Brand nel Trading & Affiliazioni
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '30px',
        }}>
          <a href="#" style={{ color: '#888', fontSize: '14px', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.target.style.color = '#00ff88'}
             onMouseLeave={(e) => e.target.style.color = '#888'}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: '#888', fontSize: '14px', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.target.style.color = '#00ff88'}
             onMouseLeave={(e) => e.target.style.color = '#888'}>
            Termini di Servizio
          </a>
          <a href="#" style={{ color: '#888', fontSize: '14px', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.target.style.color = '#00ff88'}
             onMouseLeave={(e) => e.target.style.color = '#888'}>
            Contatti
          </a>
        </div>
        
        <p style={{ fontSize: '14px', color: '#555' }}>
          © 2025 TradeBoost. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
