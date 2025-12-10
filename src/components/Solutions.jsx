import { motion } from 'framer-motion';

const solutions = [
  {
    number: '01',
    icon: '✍️',
    title: 'Copywriter Dedicato',
    description: 'Script persuasivi, caption che convertono, funnel email che stampano soldi. Tutto ottimizzato per il tuo tone of voice.',
    value: '€3,000/mese',
  },
  {
    number: '02',
    icon: '🎥',
    title: 'Video Editor Pro',
    description: 'Reel virali, YouTube shorts, contenuti long-form. Qualità cinematografica che spacca l\'algoritmo.',
    value: '€4,000/mese',
  },
  {
    number: '03',
    icon: '🧠',
    title: 'Strategia Completa',
    description: 'Piano editoriale, positioning, analisi competitor, ottimizzazione continua. Ogni mossa è calcolata.',
    value: '€5,000/mese',
  },
  {
    number: '04',
    icon: '💰',
    title: 'Budget Ads Illimitato*',
    description: 'Investiamo noi nelle tue campagne. Meta, TikTok, YouTube. Scale aggressive quando i numeri parlano.',
    value: '€10,000+/mese',
    featured: true,
  },
];

const Solutions = () => {
  return (
    <section style={{ padding: '120px 40px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          La <span style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>Soluzione</span>? Ti Finanziamo Tutto.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: '18px',
            color: '#c0c0c0',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 60px',
          }}
        >
          Non chiediamo soldi. Investiamo noi su di te. Tu pensi solo a creare contenuti e metterci la faccia.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 255, 136, 0.15)' }}
              style={{
                padding: '32px',
                background: solution.featured 
                  ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, #12121a 100%)' 
                  : '#12121a',
                borderRadius: '20px',
                border: solution.featured 
                  ? '1px solid #00ff88' 
                  : '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '48px',
                fontWeight: 900,
                color: 'rgba(255, 255, 255, 0.03)',
              }}>{solution.number}</span>
              
              <div style={{ fontSize: '40px', marginBottom: '20px' }}>{solution.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
                {solution.title}
              </h3>
              <p style={{ color: '#c0c0c0', fontSize: '15px', marginBottom: '20px' }}>
                {solution.description}
              </p>
              <span style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'rgba(0, 255, 136, 0.1)',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#00ff88',
              }}>
                Valore: {solution.value}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px',
            padding: '32px',
            background: '#12121a',
            borderRadius: '20px',
            border: '2px solid #00ff88',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            textAlign: 'center',
            boxShadow: '0 0 60px rgba(0, 255, 136, 0.2)',
          }}
        >
          <span style={{ fontSize: '18px' }}>Valore Totale Mensile:</span>
          <span style={{
            fontSize: '48px',
            fontWeight: 900,
            color: '#00ff88',
            textShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
          }}>€22,000+</span>
          <span style={{
            padding: '8px 20px',
            background: '#00ff88',
            color: '#0a0a0f',
            borderRadius: '50px',
            fontWeight: 700,
          }}>Costo per te: €0 upfront</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
