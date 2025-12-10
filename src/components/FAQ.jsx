import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Quanto costa?',
    answer: '€0 upfront. Lavoriamo in revenue share: guadagniamo solo quando guadagni tu. Il nostro successo dipende dal tuo.',
  },
  {
    question: 'Devo avere già un seguito?',
    answer: 'Non necessariamente. Cerchiamo potenziale, non numeri. Se hai carisma e competenza, possiamo costruire insieme da zero.',
  },
  {
    question: 'Quanto tempo ci vuole per vedere risultati?',
    answer: 'I primi risultati arrivano in 30-60 giorni. La crescita esponenziale tipicamente inizia dal mese 3-4.',
  },
  {
    question: 'Cosa devo fare io concretamente?',
    answer: 'Creare contenuti (ti diciamo noi cosa), rispondere ai DM importanti, e fare le call con i lead qualificati. Tutto il resto lo gestiamo noi.',
  },
];

const FAQ = () => {
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
          Domande Frequenti
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ borderColor: 'rgba(0, 255, 136, 0.3)' }}
              style={{
                padding: '32px',
                background: '#12121a',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '12px',
                color: '#00ff88',
              }}>
                {faq.question}
              </h3>
              <p style={{ fontSize: '15px', color: '#c0c0c0', lineHeight: 1.7 }}>
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
