import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Project } from '../types';

// ✅ CLEAN DEMO PROJECTS
const demoProjects: Project[] = [
  {
    title: 'Human Pose Detection',
    description: 'Real-time AI pose detection using OpenCV and MediaPipe with webcam tracking.',
    techStack: ['Python', 'OpenCV', 'MediaPipe'],
    githubUrl: 'https://github.com/rrijaarshad-create/HumanPose-detection',
    icon: '/posedetction.png',
    featured: true,
  },
  {
    title: 'AI Resume Generator',
    description: 'AI-powered resume builder with dynamic templates and PDF export.',
    techStack: ['Python', 'Flask', 'AI'],
    githubUrl: 'https://github.com/rrijaarshad-create/ai_based_resume_generator',
    icon: '/image.png',
    featured: true,
  },
  {
    title: 'Alibaba Clone',
    description: 'E-commerce UI clone with responsive product listing design.',
    techStack: ['React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/rrijaarshad-create/alibaba-clone',
    icon: '/alibaba.png',
    featured: false,
  },
  {
    title: 'Attendance Tracker',
    description: 'Student attendance system with tracking and management features.',
    techStack: ['React', 'Node.js'],
    githubUrl: 'https://github.com/rrijaarshad-create/attendance-tracker',
    icon: '/tracker.png',
    featured: false,
  },
  {
    title: 'Spotify Clone',
    description: 'Music streaming UI clone with modern responsive design.',
    techStack: ['React', 'CSS'],
    githubUrl: 'https://github.com/rrijaarshad-create/spotify',
    icon: '/image.png',
    featured: false,
  },
  {
    title: 'Fiverr Clone',
    description: 'Freelancer marketplace UI inspired by Fiverr platform.',
    techStack: ['React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/rrijaarshad-create/fiverr-clone',
    icon: '/fiver.png',
    featured: false,
  }
];

// ✅ CARD COMPONENT
const ProjectCard: React.FC<{ project: Project; index: number; inView: boolean }> =
  ({ project, index, inView }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* IMAGE — full width cover */}
      <div style={{
        width: '100%',
        height: 180,
        position: 'relative',
        background: '#111',
      }}>
        <img
          src={project.icon}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {project.featured && (
          <span style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'var(--primary)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: 10,
            fontWeight: 700,
          }}>
            Featured
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ padding: 20 }}>
        <h3 style={{ color: '#f5c542', marginBottom: 8 }}>
          {project.title}
        </h3>

        <p style={{ color: '#aaa', fontSize: 14, marginBottom: 15 }}>
          {project.description}
        </p>

        {/* TECH — oval outline style, no black bg */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {project.techStack.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12,
                padding: '4px 14px',
                background: 'transparent',
                borderRadius: 999,
                color: '#a0c4ff',
                border: '1px solid #a0c4ff',
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* BUTTONS — centered, full width, blue Code + GitHub */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          alignItems: 'center',
        }}>
          {project.githubUrl && (
            <>
              {/* Code Button */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%' }}
              >
                <button style={{
                  width: '100%',
                  padding: '10px 0',
                  background: '#1a73e8',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: 0.5,
                }}>
                  💻 Code
                </button>
              </a>

              {/* View on GitHub Button */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{ width: '100%' }}
              >
                <button style={{
                  width: '100%',
                  padding: '10px 0',
                  background: 'transparent',
                  color: '#e25b5b',
                  border: '1px solid #555',
                  cursor: 'pointer',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                  <svg
                    height="18"
                    viewBox="0 0 16 16"
                    width="18"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                      -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
                      2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                      0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
                      2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04
                      2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
                      2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0
                      1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                  View on GitHub
                </button>
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

// ✅ MAIN COMPONENT
const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [ref, inView] = useInView({ triggerOnce: true });

  const displayed =
    filter === 'featured'
      ? demoProjects.filter((p) => p.featured)
      : demoProjects;

  return (
    <div style={{ padding: '40px 60px', marginTop: '100px' }}>  {/* ✅ fixed marginTop with px unit */}
      <h1 style={{ color: '#201e1e', marginBottom: 20 }}>My Projects</h1>

      {/* FILTER */}
      <div style={{ marginBottom: 20 }}>
        {['all', 'featured'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            style={{
              marginRight: 10,
              padding: '8px 15px',
              background: filter === f ? 'var(--primary)' : 'var(--bg-card)',
              color: filter === f ? '#fff' : 'var(--text-secondary)',
              border: filter === f ? 'none' : '1px solid var(--border)',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID — 3 columns with generous gap */}
    {/* GRID — auto-adjusts columns to fit screen width (3 on desktop, fewer on tablet/mobile) */}
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px 28px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {displayed.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;