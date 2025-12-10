import { motion } from 'framer-motion';

const testimonials = [
  {
    initials: 'MR',
    name: 'Marco R.',
    role: 'Forex Trader',
    result: '+€47k/mese',
    quote: 'Da 2k follower a 180k in 4 mesi. Il team è una macchina da guerra. Non dovevo pensare a nulla, solo creare contenuti.',
    stats: ['📈 180k followers', '💰 €47k MRR'],
  },
  {
    initials: 'SB',
    name: 'Sara B.',
    role: 'Trading Coach',
    result: '+€28k/mese',
    quote: 'Ero scettica all\'inizio. Ora ho un team di 5 persone che lavora per me e un business che si scala da solo.',
    stats: ['📈 95k followers', '💰 €28k MRR'],
  },
  {
    initials: 'LA',
    name: 'Luca A.',
    role: 'Affiliate Marketer',
    result: '+€63k/mese',
    quote: 'Il budget per le ads ha cambiato tutto. Potevo finalmente testare senza rischiare i miei soldi. Game changer totale.',
    stats: ['📈 220k followers', '💰 €63k MRR'],
  },
];

const Testimonials = () => {
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
            marginBottom: '60px',
          }}
        >
          Chi Ha Già <span style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>Scalato</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                padding: '32px',
                background: '#12121a',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#0a0a0f',
                }}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{testimonial.name}</h4>
                  <span style={{ fontSize: '14px', color: '#888' }}>{testimonial.role}</span>
                </div>
                <span style={{
                  marginLeft: 'auto',
                  padding: '8px 16px',
                  background: 'rgba(0, 255, 136, 0.1)',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#00ff88',
                }}>
                  {testimonial.result}
                </span>
              </div>
              
              <p style={{
                fontSize: '15px',
                color: '#c0c0c0',
                fontStyle: 'italic',
                marginBottom: '20px',
                lineHeight: 1.7,
              }}>
                "{testimonial.quote}"
              </p>
              
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#888' }}>
                {testimonial.stats.map((stat, i) => (
                  <span key={i}>{stat}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
