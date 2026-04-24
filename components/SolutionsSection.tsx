'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import VideoBlock from './VideoBlock'

const ease = [0.16, 1, 0.3, 1]

const ROWS = [
  {
    id: 'employee', flip: false,
    tag: 'Employee Development', tagColor: '#6D28D9',
    headline: ['Upskill your workforce', 'at the speed of business'],
    body: 'From onboarding to leadership development, MapleLMS delivers personalized learning journeys that keep your team ahead of change—without overwhelming them.',
    bullets: ['Automated onboarding sequences', 'AI-powered career path planning', 'Manager coaching tools', 'Real-time skill gap identification'],
    videoLabel: 'Employee Learning',
  },
  {
    id: 'customer', flip: true,
    tag: 'Customer Education', tagColor: '#2563EB',
    headline: ['Turn customers into', 'product experts'],
    body: 'Reduce churn and increase product adoption by delivering training that feels native to your brand—powered by the same AI that drives enterprise learning.',
    bullets: ['White-label learning portals', 'Certification & credentialing', 'Embedded learning widgets', 'Customer success dashboards'],
    videoLabel: 'Customer Portal',
  },
  {
    id: 'partner', flip: false,
    tag: 'Partner Enablement', tagColor: '#059669',
    headline: ['Scale your channel', 'through partner learning'],
    body: 'Enable your entire ecosystem with targeted, automated training that scales across thousands of partners without adding headcount.',
    bullets: ['Multi-tenant architecture', 'Automated role-based enrollment', 'Channel-wide reporting', 'Gamification & leaderboards'],
    videoLabel: 'Partner Portal',
  },
]

function SolutionRow({ row, i }: { row: typeof ROWS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      style={{
        display: 'grid',
        gridTemplateColumns: row.flip ? '45fr 55fr' : '55fr 45fr',
        gap: 72, alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        borderRadius: 40,
        padding: 64,
        boxShadow: '0 20px 40px -12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
      }}
    >
      {/* Text — always first in DOM, reordered visually */}
      <div style={{ order: row.flip ? 2 : 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          style={{
            display: 'inline-block', marginBottom: 20,
            padding: '5px 13px', borderRadius: 100,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            background: `${row.tagColor}10`, border: `1px solid ${row.tagColor}25`, color: row.tagColor,
          }}
        >{row.tag}</motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease }}
          style={{ marginBottom: 20, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#0B0E2D' }}
        >
          {row.headline[0]}<br />{row.headline[1]}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          style={{ maxWidth: 450, marginBottom: 28, fontSize: 18, lineHeight: 1.6, color: '#4B5563' }}
        >{row.body}</motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {row.bullets.map((b, j) => (
            <motion.div key={b}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.22 + j * 0.07, ease }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <CheckCircle2 size={16} color={row.tagColor} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#0B0E2D' }}>{b}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 15, fontWeight: 600, color: row.tagColor, padding: 0,
          }}
        >
          Learn more <ArrowRight size={15} />
        </motion.button>
      </div>

      {/* Visual */}
      <div style={{ order: row.flip ? 1 : 2, position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: -20,
          background: `radial-gradient(ellipse, ${row.tagColor}12 0%, transparent 65%)`,
          filter: 'blur(24px)', pointerEvents: 'none',
        }} />
        <VideoBlock label={row.videoLabel} delay={0.2} />
      </div>
    </motion.div>
  )
}

export default function SolutionsSection() {
  const hRef = useRef<HTMLDivElement>(null)
  const inView = useInView(hRef, { once: true, margin: '-10%' })

  return (
    <section id="solutions" style={{ background: '#F0ECE4', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* ── 🌌 SOFT BACKGROUND ORBS (Glassmorphism Core) ── */}
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '5%', left: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: '#E0E7FF', filter: 'blur(100px)', opacity: 0.9, pointerEvents: 'none' }} 
      />
      <motion.div 
        animate={{ y: [0, 60, 0], x: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: '15%', right: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: '#F3E8FF', filter: 'blur(120px)', opacity: 0.8, pointerEvents: 'none' }} 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{ position: 'absolute', top: '40%', left: '30%', width: '25vw', height: '25vw', borderRadius: '50%', background: '#D8B4FE', filter: 'blur(90px)', opacity: 0.5, pointerEvents: 'none' }} 
      />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div ref={hRef} style={{ textAlign: 'center', marginBottom: 100 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }} style={{ marginBottom: 18 }}>
            <span style={{ background: 'rgba(0,0,0,0.05)', color: '#0B0E2D', border: '1px solid rgba(0,0,0,0.1)', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Solutions
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.08, ease }} style={{ marginBottom: 18, fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 700, color: '#0B0E2D', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Built for every <br />
            <span style={{ color: '#6D28D9' }}>learning use case</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.16, ease }} style={{ maxWidth: 520, margin: '0 auto', fontSize: 18, lineHeight: 1.6, color: '#4B5563' }}>
            Whether you are training employees, customers, or partners—MapleLMS has a tailored solution that scales with your needs.
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 112 }}>
          {ROWS.map((r, i) => <SolutionRow key={r.id} row={r} i={i} />)}
        </div>
      </div>
    </section>
  )
}

