import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import api from '../api';
import { Testimonial } from '../types';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Home: React.FC = () => {
  const [, setTestimonials] = useState<Testimonial[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    api
      .get('/api/testimonials')
      .then((r) => setTestimonials(r.data))
      .catch(() => {});
  }, []);

  const roles = [
    'Full-Stack Developer',
    'React Specialist',
    'Node.js Engineer',
    'Problem Solver',
  ] as const;

  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2500);

    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '6rem',
          position: 'relative',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 800 }}>
            {/* Top Label */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                color: '#374151',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',

                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 40,
                  height: 1,
                  background: '#111827',
                }}
              />

              Available for new projects
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                color: '#111827',
                marginBottom: '1rem',
              }}
            >
              Hi, I'm <br />

              <span className="gradient-text">
                Rija Arshad
              </span>
            </motion.h1>

            {/* Animated Roles */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              style={{
                marginBottom: '1.5rem',
                height: '2.2rem',
                overflow: 'hidden',
              }}
            >
              <motion.p
                key={roleIdx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                  fontWeight: 500,
                  color: '#374151',
                }}
              >
                {roles[roleIdx]}
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                maxWidth: 550,
                lineHeight: 1.8,
                marginBottom: '2.5rem',
              }}
            >
              I build fast, beautiful, and scalable web applications
              — from sleek frontends to robust backends. Let's turn
              your ideas into reality.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link
                to="/projects"
                className="btn-primary"
                style={{ fontSize: '0.95rem' }}
              >
                View My Work →
              </Link>

              <Link
                to="/contact"
                className="btn-outline"
                style={{ fontSize: '0.95rem' }}
              >
                Let's Talk
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              style={{
                display: 'flex',
                gap: '3rem',
                marginTop: '4rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { num: '20+', label: 'Projects Built' },
                { num: '2+', label: 'Years Experience' },
                { num: '100%', label: 'Client Satisfaction' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#111827',
                    }}
                  >
                    {num}
                  </div>

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating Decoration */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              right: '8%',
              top: '30%',

              width: 300,
              height: 300,

              background:
                'radial-gradient(circle, rgba(17,24,39,0.06) 0%, transparent 70%)',

              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />
        </div>
      </section>

      {/* ─── ABOUT PREVIEW SECTION ─── */}
      <section
        ref={ref}
        className="section"
        style={{
          paddingTop: '2rem',
        }}
      >
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
            style={{
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {/* Label */}
            <p
              className="section-label"
              style={{
                marginBottom: '1rem',
              }}
            >
              About Me
            </p>

            {/* Title */}
            <h2
              className="section-title"
              style={{
                marginBottom: '1.5rem',
              }}
            >
              Passionate About Building
              <span className="gradient-text">
                {' '}
                Modern Web Experiences
              </span>
            </h2>

            {/* Text */}
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                marginBottom: '1.5rem',
                maxWidth: 750,
              }}
            >
              I'm a Full-Stack Developer focused on creating
              responsive, scalable, and user-friendly applications
              using modern technologies like React, TypeScript,
              Node.js, and MongoDB.
            </p>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                marginBottom: '2rem',
                maxWidth: 750,
              }}
            >
              From frontend interfaces to backend APIs, I love solving
              real-world problems through code and continuously
              improving my skills by building impactful projects.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link
                to="/about"
                className="btn-outline"
              >
                Learn More About Me
              </Link>

              <Link
                to="/projects"
                className="btn-primary"
              >
                View Projects →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;