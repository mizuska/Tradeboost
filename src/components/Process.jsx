import { motion } from 'framer-motion';

const steps = [
  { number: 1, title: 'Candidatura', description: 'Compila il form e raccontaci del tuo brand. Analizziamo il tuo potenziale in 48h.' },
  { number: 2, title: 'Call Strategica', description: 'Se sei idoneo, ti chiamiamo per una sessione di 30 minuti. Capiamo se c\'è fit.' },
  { number: 3, title: 'Onboarding', description: 'Firmi l\'accordo, conosci il tuo team dedicato e partiamo. Fast.' },
  { number: 4, title: 'Crescita Esplosiva', description: 'Tu crei contenuti, noi scaliamo. Revenue share solo quando guadagni.' },
];

const Process = () => {
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
          }}
        >
          Come Funziona
        </motion.h2>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '0',
          flexWrap: 'wrap',
        }}>
          {steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  maxWidth: '220px',
                  padding: '20px',
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                  borderRadius: '50%',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#0a0a0f',
                  marginBottom: '20px',
                  boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)',
                }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#c0c0c0' }}>{step.description}</p>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #00ff88, transparent)',
                  marginTop: '50px',
                  display: 'none',
                  '@media (min-width: 900px)': { display: 'block' },
                }} className="process-line" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @media (min-width: 900px) {
          .process-line { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default Process;
