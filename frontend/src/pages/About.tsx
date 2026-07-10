import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

// ✏️ EDIT ALL YOUR REAL INFO BELOW
const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Quaid-i-Azam University',
    period: '2022 – 2026',
    grade: 'CGPA: 3.2/4.0',
    desc: 'Focused on Software Engineering, Data Structures, Web Technologies, and Database Systems. Final year project: Full-stack E-Commerce Platform.',
    icon: '🎓',
  },
  {
    degree: 'FSc Pre-Engineering',
    institution: 'Islamabad Model College For Girls F7/2',
    period: '2020 – 2022',
    grade: 'Grade: A+',
    desc: 'Strong foundation in Mathematics and Physics. Developed interest in programming through elective Computer Science courses.',
    icon: '📚',
  },
  {
    degree: 'Matriculation (Science)',
    institution: 'The Guardian School and College Islamabad',
    period: '2016 – 2018',
    grade: 'Grade: A',
    desc: 'Completed secondary education with distinction in Sciences and Computer Science.',
    icon: '🏫',
  },
];

const certifications = [
  { title: 'Web developer Developer Certificate', issuer: 'TAJ Institute', year: '2023' },
  { title: 'Node.js Application Development', issuer: 'OpenJS Foundation', year: '2023' },
  { title: 'Digital Marketing', issuer: 'Dgskilss', year: '2024' },
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
];

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [refCert, inViewCert] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Hero */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '5rem', alignItems: 'center',
          }}>
            <div>
              <motion.p className="section-label" variants={fadeUp(0)} initial="hidden" animate="visible">
                Who I am
              </motion.p>
              <motion.h1 className="section-title" variants={fadeUp(0.1)} initial="hidden" animate="visible">
                Passionate <span className="gradient-text">Developer</span>, Creative Thinker
              </motion.h1>
              <motion.p variants={fadeUp(0.2)} initial="hidden" animate="visible"
                style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '1rem' }}>
                I'm a Full-Stack Developer based in Pakistan with 2+ years of experience building modern web applications.
                I love turning complex problems into simple, beautiful, and intuitive solutions.
              </motion.p>
              <motion.p variants={fadeUp(0.3)} initial="hidden" animate="visible"
                style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem', fontSize: '1rem' }}>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                or brewing the perfect cup of chai while planning my next project.
              </motion.p>
              <motion.div variants={fadeUp(0.4)} initial="hidden" animate="visible"
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">Hire Me →</Link>
                <a href="/resume.pdf" download className="btn-outline">Download CV ↓</a>
              </motion.div>
            </div>

            {/* Avatar/image area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{
                width: 340, height: 380,
                background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(245,158,11,0.1) 100%)',
                border: '1px solid var(--border-hover)',
                borderRadius: 16, position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {/* Replace this div with your <img src="photo.jpg" /> */}
                <img
  src="/myPhoto.png"
  alt="Profile"
  style={{
    width: 340,
    height: 380,
    objectFit: 'cover',
    borderRadius: 16,
  }}
/>
                {/* Corner accents */}
                <div style={{ position: 'absolute', top: 12, left: 12, width: 20, height: 20,
                  borderTop: '2px solid var(--amber-500)', borderLeft: '2px solid var(--amber-500)' }} />
                <div style={{ position: 'absolute', bottom: 12, right: 12, width: 20, height: 20,
                  borderBottom: '2px solid var(--amber-500)', borderRight: '2px solid var(--amber-500)' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="section" ref={ref} style={{ background: 'rgba(245,158,11,0.02)' }}>
        <div className="container">
          <motion.p className="section-label" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Academic Background
          </motion.p>
          <motion.h2 className="section-title"
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}>
            My <span className="gradient-text">Education</span>
          </motion.h2>

          <div style={{ position: 'relative', marginTop: '3rem' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute', left: 20, top: 0, bottom: 0,
              width: 1, background: 'linear-gradient(to bottom, var(--amber-500), transparent)',
            }} />

            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', paddingLeft: '1rem' }}
              >
                {/* Dot */}
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'var(--bg-card)', border: '2px solid var(--amber-500)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0,
                  boxShadow: '0 0 15px var(--glow)',
                }}>{edu.icon}</div>

                <div className="card" style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--amber-200)', fontWeight: 700 }}>
                        {edu.degree}
                      </h3>
                      <p style={{ color: 'var(--amber-500)', fontSize: '0.875rem', fontWeight: 500 }}>{edu.institution}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="tag">{edu.period}</span>
                      <p style={{ color: 'var(--amber-600)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{edu.grade}</p>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{edu.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section" ref={refCert}>
        <div className="container">
          <motion.p className="section-label"
            initial={{ opacity: 0 }} animate={inViewCert ? { opacity: 1 } : {}}>
            Credentials
          </motion.p>
          <motion.h2 className="section-title"
            initial={{ opacity: 0, y: 30 }} animate={inViewCert ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}>
            Certifications & <span className="gradient-text">Courses</span>
          </motion.h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem', marginTop: '2rem',
          }}>
            {certifications.map((cert, i) => (
              <motion.div key={i} className="card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inViewCert ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🏅</div>
                <h4 style={{ color: 'var(--amber-200)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {cert.title}
                </h4>
                <p style={{ color: 'var(--amber-600)', fontSize: '0.8rem' }}>{cert.issuer}</p>
                <span className="tag" style={{ marginTop: '0.75rem' }}>{cert.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default About;
