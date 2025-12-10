import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filterNiche, setFilterNiche] = useState('');
  const [filterFollowers, setFilterFollowers] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Password admin (cambiala con una tua password sicura!)
  const ADMIN_PASSWORD = 'tradeboost2025';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('tradeboost_admin_auth', 'true');
    } else {
      alert('Password sbagliata!');
    }
  };

  // Abilita il cursore normale nella dashboard
  useEffect(() => {
    document.body.style.cursor = 'auto';
    
    // Controlla se già autenticato
    const isAuth = localStorage.getItem('tradeboost_admin_auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    return () => {
      document.body.style.cursor = 'none';
    };
  }, []);

  useEffect(() => {
    // Carica i lead dal localStorage
    const savedLeads = JSON.parse(localStorage.getItem('tradeboost_leads') || '[]');
    setLeads(savedLeads);
    setFilteredLeads(savedLeads);
  }, []);

  useEffect(() => {
    let result = leads;

    if (filterNiche) {
      result = result.filter(lead => lead.niche === filterNiche);
    }

    if (filterFollowers) {
      result = result.filter(lead => lead.followers === filterFollowers);
    }

    if (searchTerm) {
      result = result.filter(lead => 
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.instagram?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(result);
  }, [leads, filterNiche, filterFollowers, searchTerm]);

  const exportCSV = () => {
    const headers = ['Nome', 'Email', 'Telefono', 'Instagram', 'Followers', 'Nicchia', 'Messaggio', 'Data'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.instagram,
        lead.followers,
        lead.niche,
        `"${(lead.message || '').replace(/"/g, '""')}"`,
        lead.date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_tradeboost_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const deleteLead = (index) => {
    if (confirm('Sei sicuro di voler eliminare questo lead?')) {
      const newLeads = leads.filter((_, i) => i !== index);
      setLeads(newLeads);
      localStorage.setItem('tradeboost_leads', JSON.stringify(newLeads));
    }
  };

  const clearAllLeads = () => {
    if (confirm('Sei sicuro di voler eliminare TUTTI i lead? Questa azione è irreversibile.')) {
      setLeads([]);
      setFilteredLeads([]);
      localStorage.setItem('tradeboost_leads', JSON.stringify([]));
    }
  };

  // Demo: aggiungi lead di test
  const addDemoLeads = () => {
    const demoLeads = [
      { name: 'Marco Rossi', email: 'marco@test.com', phone: '+39 333 1234567', instagram: '@marcotrader', followers: '10k-50k', niche: 'forex', message: 'Voglio scalare il mio brand', date: new Date().toLocaleString('it-IT') },
      { name: 'Giulia Bianchi', email: 'giulia@test.com', phone: '+39 340 9876543', instagram: '@giulia_fx', followers: '1k-10k', niche: 'crypto', message: 'Ho 8k followers su TikTok', date: new Date().toLocaleString('it-IT') },
      { name: 'Luca Verdi', email: 'luca@test.com', phone: '+39 328 5551234', instagram: '@lucainvest', followers: '50k+', niche: 'affiliate', message: 'Già faccio 5k/mese, voglio scalare', date: new Date().toLocaleString('it-IT') },
    ];
    const newLeads = [...leads, ...demoLeads];
    setLeads(newLeads);
    localStorage.setItem('tradeboost_leads', JSON.stringify(newLeads));
  };

  const getNicheLabel = (niche) => {
    const labels = {
      forex: 'Forex Trading',
      crypto: 'Crypto Trading',
      stocks: 'Stock Trading',
      affiliate: 'Affiliate Marketing',
      other: 'Altro'
    };
    return labels[niche] || niche;
  };

  const stats = {
    total: leads.length,
    forex: leads.filter(l => l.niche === 'forex').length,
    crypto: leads.filter(l => l.niche === 'crypto').length,
    affiliate: leads.filter(l => l.niche === 'affiliate').length,
    bigFollowers: leads.filter(l => l.followers === '50k+' || l.followers === '10k-50k').length,
  };

  // Se non autenticato, mostra form login
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#12121a',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(0,255,136,0.3)',
            boxShadow: '0 0 40px rgba(0,255,136,0.1)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
            Dashboard Admin
          </h2>
          <p style={{ color: '#888', marginBottom: '30px', fontSize: '14px' }}>
            Inserisci la password per accedere ai lead
          </p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password admin..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px 20px',
                background: '#0a0a0f',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                marginBottom: '20px',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                border: 'none',
                borderRadius: '12px',
                color: '#0a0a0f',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Accedi 🚀
            </button>
          </form>
          
          <a href="/" style={{
            display: 'inline-block',
            marginTop: '20px',
            color: '#888',
            fontSize: '14px',
          }}>
            ← Torna al sito
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      color: '#f0f0f0',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <header style={{
        padding: '20px 40px',
        background: 'rgba(18, 18, 26, 0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '28px' }}>📊</span>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>
            Trade<span style={{ color: '#00ff88' }}>Boost</span> Dashboard
          </h1>
        </div>
        <a href="/" style={{
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          fontSize: '14px',
          transition: 'background 0.2s',
        }}>
          ← Torna al sito
        </a>
      </header>

      <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05))',
              borderRadius: '16px',
              border: '1px solid rgba(0,255,136,0.3)',
            }}
          >
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Lead Totali</div>
            <div style={{ fontSize: '42px', fontWeight: 900, color: '#00ff88' }}>{stats.total}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              padding: '24px',
              background: '#12121a',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Forex</div>
            <div style={{ fontSize: '42px', fontWeight: 900 }}>{stats.forex}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: '24px',
              background: '#12121a',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Crypto</div>
            <div style={{ fontSize: '42px', fontWeight: 900 }}>{stats.crypto}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              padding: '24px',
              background: '#12121a',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>Affiliate</div>
            <div style={{ fontSize: '42px', fontWeight: 900 }}>{stats.affiliate}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(255,51,102,0.15), rgba(255,51,102,0.05))',
              borderRadius: '16px',
              border: '1px solid rgba(255,51,102,0.3)',
            }}
          >
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '8px' }}>10k+ Followers</div>
            <div style={{ fontSize: '42px', fontWeight: 900, color: '#ff3366' }}>{stats.bigFollowers}</div>
          </motion.div>
        </div>

        {/* Filters & Actions */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <input
            type="text"
            placeholder="🔍 Cerca per nome, email, instagram..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '14px 20px',
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
            }}
          />

          <select
            value={filterNiche}
            onChange={(e) => setFilterNiche(e.target.value)}
            style={{
              padding: '14px 20px',
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="">Tutte le nicchie</option>
            <option value="forex">Forex</option>
            <option value="crypto">Crypto</option>
            <option value="stocks">Stocks</option>
            <option value="affiliate">Affiliate</option>
            <option value="other">Altro</option>
          </select>

          <select
            value={filterFollowers}
            onChange={(e) => setFilterFollowers(e.target.value)}
            style={{
              padding: '14px 20px',
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="">Tutti i followers</option>
            <option value="0-1k">0 - 1k</option>
            <option value="1k-10k">1k - 10k</option>
            <option value="10k-50k">10k - 50k</option>
            <option value="50k+">50k+</option>
          </select>

          <button
            onClick={exportCSV}
            style={{
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
              border: 'none',
              borderRadius: '10px',
              color: '#0a0a0f',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📥 Esporta CSV
          </button>

          <button
            onClick={addDemoLeads}
            style={{
              padding: '14px 24px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ➕ Aggiungi Demo
          </button>

          {leads.length > 0 && (
            <button
              onClick={clearAllLeads}
              style={{
                padding: '14px 24px',
                background: 'rgba(255,51,102,0.2)',
                border: '1px solid #ff3366',
                borderRadius: '10px',
                color: '#ff3366',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🗑️ Elimina Tutti
            </button>
          )}
        </div>

        {/* Leads Table */}
        <div style={{
          background: '#12121a',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}>
          {filteredLeads.length === 0 ? (
            <div style={{
              padding: '60px',
              textAlign: 'center',
              color: '#888',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <p style={{ fontSize: '18px', marginBottom: '8px' }}>Nessun lead trovato</p>
              <p style={{ fontSize: '14px' }}>I lead appariranno qui quando qualcuno compilerà il form</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Nome</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Telefono</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Instagram</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Followers</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Nicchia</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Data</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{lead.name}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <a href={`mailto:${lead.email}`} style={{ color: '#00ff88' }}>{lead.email}</a>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <a href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`} target="_blank" style={{ color: '#25D366' }}>
                          {lead.phone}
                        </a>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <a href={`https://instagram.com/${lead.instagram?.replace('@', '')}`} target="_blank" style={{ color: '#E4405F' }}>
                          {lead.instagram}
                        </a>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '4px 10px',
                          background: lead.followers === '50k+' || lead.followers === '10k-50k' 
                            ? 'rgba(0,255,136,0.15)' 
                            : 'rgba(255,255,255,0.1)',
                          borderRadius: '20px',
                          fontSize: '12px',
                          color: lead.followers === '50k+' || lead.followers === '10k-50k' ? '#00ff88' : '#888',
                        }}>
                          {lead.followers}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '4px 10px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '20px',
                          fontSize: '12px',
                        }}>
                          {getNicheLabel(lead.niche)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#888' }}>{lead.date}</td>
                      <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                        <button
                          onClick={() => deleteLead(index)}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(255,51,102,0.1)',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#ff3366',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          🗑️
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Details - Message Preview */}
        {filteredLeads.some(lead => lead.message) && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>📝 Messaggi dei Lead</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}>
              {filteredLeads.filter(lead => lead.message).map((lead, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    background: '#12121a',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#0a0a0f',
                      fontSize: '14px',
                    }}>
                      {lead.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{lead.name}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{lead.instagram}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#c0c0c0', lineHeight: 1.6 }}>"{lead.message}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
