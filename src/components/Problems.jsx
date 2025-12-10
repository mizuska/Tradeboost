import { motion } from 'framer-motion';

const problems = [
  {
    icon: '💸',
    title: 'Zero Budget per le Ads',
    description: 'Sai che potresti esplodere, ma non hai i fondi per testare campagne pubblicitarie serie.',
  },
  {
    icon: '🎬',
    title: 'Contenuti Mediocri',
    description: 'I tuoi video non convertono perché ti manca un team professionale di editing.',
  },
  {
    icon: '📝',
    title: 'Copy che Non Vende',
    description: 'Le tue caption e i tuoi funnel non generano lead qualificati.',
  },
  {
    icon: '🎯',
    title: 'Nessuna Strategia',
    description: 'Posti a caso sperando che qualcosa funzioni. Spoiler: non funziona.',
  },
];

const Problems = () => {
  return (
    <section style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '60px',
            letterSpacing: '-0.5px',
          }}
        >
          <span style={{ color: '#ff3366', textShadow: '0 0 20px rgba(255, 51, 102, 0.3)' }}>Il Problema</span> che Blocca il 97% dei Trader
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: '#ff3366' }}
              style={{
                padding: '32px',
                background: '#12121a',
                borderRadius: '20px',
                border: '1px solid rgba(255, 51, 102, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>{problem.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
                {problem.title}
              </h3>
              <p style={{ color: '#c0c0c0', fontSize: '15px' }}>{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
