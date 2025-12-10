import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Componente Timer Countdown 24h
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Recupera o imposta la scadenza nel localStorage
    let deadline = localStorage.getItem('tradeboost_deadline');
    
    if (!deadline) {
      deadline = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime();
      localStorage.setItem('tradeboost_deadline', deadline);
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = parseInt(deadline) - now;

      if (distance <= 0) {
        // Reset timer quando scade
        const newDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime();
        localStorage.setItem('tradeboost_deadline', newDeadline);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'rgba(255, 51, 102, 0.15)',
    borderRadius: '12px',
    minWidth: '70px',
  };

  const numberStyle = {
    fontSize: '32px',
    fontWeight: 900,
    color: '#ff3366',
    fontFamily: "'Courier New', monospace",
    textShadow: '0 0 20px rgba(255, 51, 102, 0.5)',
    lineHeight: 1,
  };

  const labelStyle = {
    fontSize: '11px',
    color: '#888',
    textTransform: 'uppercase',
    marginTop: '4px',
    letterSpacing: '1px',
  };

  const separatorStyle = {
    fontSize: '28px',
    fontWeight: 900,
    color: '#ff3366',
    padding: '0 4px',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(255, 51, 102, 0.1) 0%, rgba(255, 51, 102, 0.05) 100%)',
        border: '2px solid #ff3366',
        borderRadius: '20px',
        marginTop: '30px',
        boxShadow: '0 0 40px rgba(255, 51, 102, 0.2)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
      }}>
        <span style={{ fontSize: '24px' }}>🔥</span>
        <span style={{ 
          fontSize: '16px', 
          fontWeight: 700, 
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>
          Offerta Scade Tra
        </span>
        <span style={{ fontSize: '24px' }}>🔥</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={timeBoxStyle}>
          <span style={numberStyle}>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span style={labelStyle}>Ore</span>
        </div>
        <span style={separatorStyle}>:</span>
        <div style={timeBoxStyle}>
          <span style={numberStyle}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span style={labelStyle}>Min</span>
        </div>
        <span style={separatorStyle}>:</span>
        <div style={timeBoxStyle}>
          <motion.span 
            style={numberStyle}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {String(timeLeft.seconds).padStart(2, '0')}
          </motion.span>
          <span style={labelStyle}>Sec</span>
        </div>
      </div>

      <p style={{
        marginTop: '16px',
        fontSize: '14px',
        color: '#c0c0c0',
        textAlign: 'center',
      }}>
        ⚠️ Dopo questo timer, le candidature verranno chiuse
      </p>
    </motion.div>
  );
};

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    followers: '',
    niche: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Salva il lead su Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([formData]);
      
      if (error) {
        console.error('Errore nel salvare il lead:', error);
        alert('Errore nel salvare i dati. Riprova.');
        setIsSubmitting(false);
        return;
      }

      // Mantieni anche il localStorage per compatibilità
      const newLead = {
        ...formData,
        date: new Date().toLocaleString('it-IT'),
      };
      
      const existingLeads = JSON.parse(localStorage.getItem('tradeboost_leads') || '[]');
      existingLeads.push(newLead);
      localStorage.setItem('tradeboost_leads', JSON.stringify(existingLeads));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nel salvare i dati. Riprova.');
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: '#0a0a0f',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <section id="cta" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #0d0d14 0%, #0a0a0f 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 800,
              marginBottom: '20px',
              lineHeight: 1.2,
            }}>
              Pronto a Trasformare il Tuo Brand?
            </h2>
            <p style={{ fontSize: '18px', color: '#c0c0c0', marginBottom: '30px' }}>
              Compila il form. Se hai potenziale, ti contattiamo entro 48h per una call strategica gratuita.
            </p>
            
            <motion.div
              animate={{ boxShadow: ['0 0 0 0 rgba(255, 51, 102, 0.3)', '0 0 20px rgba(255, 51, 102, 0.3)', '0 0 0 0 rgba(255, 51, 102, 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 24px',
                background: 'rgba(255, 51, 102, 0.1)',
                border: '1px solid #ff3366',
                borderRadius: '12px',
                color: '#ff3366',
                fontSize: '15px',
              }}
            >
              <span style={{ fontSize: '28px' }}>🎰</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '18px', marginBottom: '4px' }}>
                  Solo 3 Fortunati Verranno Selezionati
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  Tra tutte le candidature, sceglieremo solo <strong>3 persone</strong> con il maggior potenziale
                </div>
              </div>
            </motion.div>

            {/* Timer Countdown */}
            <CountdownTimer />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              padding: '40px',
              background: '#12121a',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            {isSubmitted ? (
              <div style={{
                gridColumn: 'span 2',
                textAlign: 'center',
                padding: '40px 20px',
              }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '10px', color: '#00ff88' }}>
                  Candidatura Inviata!
                </h3>
                <p style={{ color: '#c0c0c0' }}>
                  Ti contatteremo entro 48h se sei tra i 3 fortunati selezionati.
                </p>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Il tuo nome"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff88';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="La tua email migliore"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff88';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Numero WhatsApp"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff88';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="text"
                  name="instagram"
                  placeholder="@tuoinstagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff88';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <select
                  name="followers"
                  required
                  value={formData.followers}
                  onChange={handleChange}
                  style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23888888\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10l-5 5z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff88';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Quanti follower hai?</option>
                  <option value="0-1k">0 - 1,000</option>
                  <option value="1k-10k">1,000 - 10,000</option>
                  <option value="10k-50k">10,000 - 50,000</option>
                  <option value="50k+">50,000+</option>
                </select>
                <select
                  name="niche"
                  required
                  value={formData.niche}
                  onChange={handleChange}
                  style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23888888\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10l-5 5z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff88';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">La tua nicchia</option>
                  <option value="forex">Forex Trading</option>
                  <option value="crypto">Crypto Trading</option>
                  <option value="stocks">Stock Trading</option>
                  <option value="affiliate">Affiliate Marketing</option>
                  <option value="other">Altro</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Parlaci brevemente del tuo brand e dei tuoi obiettivi..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, gridColumn: 'span 2', resize: 'vertical' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#00ff88';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -3, boxShadow: '0 15px 40px rgba(0, 255, 136, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    gridColumn: 'span 2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '20px 40px',
                    background: isSubmitting ? '#555' : 'linear-gradient(135deg, #00ff88, #00cc6a)',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0a0a0f',
                    border: 'none',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                  }}
                >
                  <span>{isSubmitting ? 'Invio in corso...' : '🍀 Tenta la Fortuna - Candidati Ora'}</span>
                  {!isSubmitting && <span>→</span>}
                </motion.button>
                <p style={{
                  gridColumn: 'span 2',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#888',
                  marginTop: '10px',
                }}>
                  🔒 I tuoi dati sono al sicuro. Zero spam, promesso.
                </p>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default CTA;
