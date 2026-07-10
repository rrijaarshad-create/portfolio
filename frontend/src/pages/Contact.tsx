import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await api.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.9rem 1.25rem',
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: 6, color: 'var(--amber-100)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.3s',
  };

  const contactInfo = [
    { icon: '', label: 'Email', value: 'rijaarshadr@gmail.com', href: 'mailto:rijaarshadr@gmail.com' },
    { icon: '', label: 'WhatsApp', value: '+92 300 1234567', href: 'https://wa.me/923001234567' },
    { icon: '', label: 'Instagram', value: 'rija4_45', href: 'https://instagram.com/rija4_45' },
    { icon: '📍', label: 'Location', value: 'Pakistan 🇵🇰', href: undefined },
  ];

  return (
    <div style={{ paddingTop: '6rem' }}>
      <section className="section">
        <div className="container">
          <motion.p className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Get in touch
          </motion.p>
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}>
            Let's <span className="gradient-text">Explore Ideas</span> Together
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: 'var(--text-muted)', maxWidth: 540, lineHeight: 1.8, marginBottom: '3rem' }}>
            Have a project in mind? Looking for a collaborator? Or just want to say hi?
            My inbox is always open — I'll get back within 24 hours.
          </motion.p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.5fr',
            gap: '4rem', alignItems: 'start',
          }}>
            {/* Left: contact info */}
            <div>
              <div style={{ marginBottom: '2.5rem' }}>
                {contactInfo.map((info, i) => (
                  <motion.div key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem', marginBottom: '0.75rem',
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      borderRadius: 8, transition: 'all 0.3s',
                    }}
                    whileHover={{ borderColor: 'rgba(251,191,36,0.35)', x: 4 }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: 8,
                      background: 'rgba(245,158,11,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.2rem', flexShrink: 0,
                    }}>{info.icon}</div>
                    <div>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {info.label}
                      </p>
                      {info.href ? (
                        <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          style={{ color: 'var(--amber-300)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber-400)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--amber-300)')}
                        >{info.value}</a>
                      ) : (
                        <p style={{ color: 'var(--amber-300)', fontWeight: 500, fontSize: '0.9rem' }}>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Availability badge */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                style={{
                  padding: '1.25rem', background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.2)', borderRadius: 8,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                    boxShadow: '0 0 8px #22c55e', animation: 'pulse 2s infinite',
                  }} />
                  <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.85rem' }}>Available for work</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Open to freelance projects, full-time roles, and collaborations.
                </p>
              </motion.div>
            </div>

            {/* Right: contact form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}>
              <div className="card" style={{ padding: '2.5rem' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                  color: 'var(--amber-200)', marginBottom: '1.75rem', fontWeight: 700,
                }}>Send me a message</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--amber-600)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                      Name *
                    </label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Your Name" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--amber-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--amber-600)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                      Email *
                    </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="you@email.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--amber-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--amber-600)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                    Subject
                  </label>
                  <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--amber-500)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  >
                    <option value="">Select a topic...</option>
                    <option value="freelance">Freelance Project</option>
                    <option value="fulltime">Full-time Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--amber-600)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                    Message *
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project, idea, or just say hello..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                    onFocus={e => (e.target.style.borderColor = 'var(--amber-500)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '1rem', background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.25)', borderRadius: 6,
                      color: '#4ade80', fontSize: '0.875rem', marginBottom: '1rem',
                    }}>
                    ✅ Message sent! I'll get back to you within 24 hours.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '1rem', background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6,
                      color: '#f87171', fontSize: '0.875rem', marginBottom: '1rem',
                    }}>
                    ❌ {errorMsg}
                  </motion.div>
                )}

                <button onClick={handleSubmit} disabled={status === 'loading'}
                  className="btn-primary"
                  style={{
                    width: '100%', justifyContent: 'center', fontSize: '0.95rem',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}>
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
