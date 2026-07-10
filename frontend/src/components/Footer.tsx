import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socials = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/923001234567',
      color: '#25D366',
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/rija4_45',
      color: '#E1306C',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/rrijaarshad-create',
      color: '#111827',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rija-arshad-597805322/',
      color: '#0A66C2',
    },
  ];

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid #e5e7eb',
        background: '#ffffff',
        padding: '4rem 0 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, #111827, transparent)',
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: '#111827',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: '#ffffff',
                }}
              >
                RA
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: '#111827',
                  fontSize: '1.1rem',
                }}
              >
                Rija<span style={{ color: '#374151' }}>Arshad</span>
              </span>
            </div>

            <p
              style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              Full-Stack Developer crafting digital experiences with passion
              and precision.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#111827',
                marginBottom: '1rem',
              }}
            >
              Navigation
            </h4>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    color: '#4b5563',
                    fontSize: '0.875rem',
                    transition: '0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#111827')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#4b5563')
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#111827',
                marginBottom: '1rem',
              }}
            >
              Connect
            </h4>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {socials.map(({ label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  style={{
                    color: '#4b5563',
                    fontSize: '0.875rem',
                    transition: '0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = color)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = '#4b5563')
                  }
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#111827',
                marginBottom: '1rem',
              }}
            >
              Let's Work
            </h4>

            <p
              style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}
            >
              Got a project idea? I'd love to hear it.
            </p>

            <Link
              to="/contact"
              className="btn-primary"
              style={{
                fontSize: '0.8rem',
                padding: '0.6rem 1.25rem',
              }}
            >
              Start a Conversation →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              color: '#6b7280',
              fontSize: '0.8rem',
            }}
          >
            © {year} Rija Arshad. Built with React & Node.js
          </p>

          <p
            style={{
              color: '#6b7280',
              fontSize: '0.8rem',
            }}
          >
            Made with ♥ and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;