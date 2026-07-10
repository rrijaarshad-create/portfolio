import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ✏️ EDIT YOUR REAL SKILLS BELOW
const skillCategories = [
  {
    category: 'Frontend',
    icon: '',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'TypeScript', level: 82 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Framer Motion', level: 70 },
    ],
  },
  {
    category: 'Backend',
    icon: '',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 65 },
      { name: 'Socket.io', level: 72 },
    ],
  },
  {
    category: 'Database',
    icon: '',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'Redis', level: 60 },
      { name: 'Firebase', level: 78 },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 68 },
      { name: 'AWS (EC2, S3)', level: 65 },
      { name: 'CI/CD (GitHub Actions)', level: 70 },
      { name: 'Linux / Bash', level: 75 },
    ],
  },
];

const techIcons = [
  { name: 'React', icon: '⚛️' }, { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' }, { name: 'TypeScript', icon: '🔷' },
  { name: 'Next.js', icon: '▲' }, { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁️' }, { name: 'Git', icon: '🌿' },
  { name: 'PostgreSQL', icon: '🐘' }, { name: 'Redis', icon: '🔴' },
  { name: 'GraphQL', icon: '💜' }, { name: 'Linux', icon: '🐧' },
];

const SkillBar: React.FC<{ name: string; level: number; delay: number; inView: boolean }> = ({ name, level, delay, inView }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--amber-200)' }}>{name}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--amber-500)' }}>{level}%</span>
    </div>
    <div style={{
      height: 6, background: 'rgba(245,158,11,0.1)',
      borderRadius: 100, overflow: 'hidden',
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, var(--amber-600), var(--amber-400))`,
          borderRadius: 100,
          boxShadow: '0 0 8px rgba(245,158,11,0.4)',
        }}
      />
    </div>
  </div>
);

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [refIcons, inViewIcons] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div style={{ paddingTop: '6rem' }}>
      <section className="section">
        <div className="container">
          <motion.p className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            What I work with
          </motion.p>
          <motion.h1 className="section-title"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}>
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: 'var(--text-muted)', maxWidth: 540, lineHeight: 1.8, marginBottom: '3rem' }}>
            I work across the full stack — from crafting pixel-perfect UIs to designing scalable server architectures and databases.
          </motion.p>

          {/* Skill bars grid */}
          <div ref={ref} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {skillCategories.map((cat, ci) => (
              <motion.div key={cat.category} className="card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: ci * 0.1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '1.1rem', color: 'var(--amber-300)',
                  }}>{cat.category}</h3>
                </div>
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.3 + ci * 0.1 + si * 0.06}
                    inView={inView}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech icon cloud */}
      <section className="section" ref={refIcons} style={{ background: 'rgba(245,158,11,0.02)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p className="section-label"
            style={{ justifyContent: 'center', display: 'flex' }}
            initial={{ opacity: 0 }} animate={inViewIcons ? { opacity: 1 } : {}}>
            Tech Stack
          </motion.p>
          <motion.h2 className="section-title"
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }} animate={inViewIcons ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}>
            Tools I <span className="gradient-text">Love</span>
          </motion.h2>

          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: '1rem', justifyContent: 'center', marginTop: '2rem',
          }}>
            {techIcons.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inViewIcons ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 100, cursor: 'default',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--amber-500)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <span style={{ fontSize: '1.1rem' }}>{tech.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                  color: 'var(--amber-300)',
                }}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
