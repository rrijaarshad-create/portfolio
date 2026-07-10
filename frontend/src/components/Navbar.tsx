import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1rem 2rem',

        /* White navbar on scroll */
        background: scrolled
          ? 'rgba(255,255,255,0.95)'
          : 'transparent',

        backdropFilter: scrolled ? 'blur(20px)' : 'none',

        borderBottom: scrolled
          ? '1px solid #e5e7eb'
          : 'none',

        transition: 'all 0.4s ease',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
<Link
  to="/"
  style={{
    display: 'flex',
    alignItems: 'center',
  }}
>
  <img
   src="/coding.png"
    alt="Logo"
    style={{
      width: 45,
      height: 45,
      objectFit: 'cover',
      borderRadius: 8,
    }}
  />
</Link>
      {/* Desktop Navigation */}
      <div
        className="desktop-nav"
        style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}
      >
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.9rem',

              color:
                location.pathname === to
                  ? '#111827'
                  : '#4b5563',

              letterSpacing: '0.02em',
              position: 'relative',
              paddingBottom: '2px',

              transition: 'color 0.2s ease',
            }}
          >
            {label}

            {location.pathname === to && (
              <motion.div
                layoutId="nav-underline"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,

                  height: 2,
                  background: '#111827',
                  borderRadius: 2,
                }}
              />
            )}
          </Link>
        ))}

        {/* Resume Button */}
        <a
          href="/resume.pdf"
          download
          style={{
            padding: '0.55rem 1.25rem',
            background: '#111827',
            color: '#ffffff',

            fontWeight: 600,
            fontSize: '0.85rem',

            borderRadius: 6,
            border: 'none',

            letterSpacing: '0.02em',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1f2937';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#111827';
          }}
        >
          Resume ↓
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',

          color: '#111827',
          fontSize: '1.5rem',
        }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,

              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',

              borderBottom: '1px solid #e5e7eb',

              padding: '1.5rem 2rem',

              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  color:
                    location.pathname === to
                      ? '#111827'
                      : '#4b5563',

                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                {label}
              </Link>
            ))}

            <a
              href="/resume.pdf"
              download
              style={{
                color: '#111827',
                fontWeight: 600,
              }}
            >
              Download Resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;