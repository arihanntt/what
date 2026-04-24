'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const METRICS = [
  { v: '3.2×', l: 'Average ROI', sub: 'in first year' },
  { v: '60%',  l: 'Faster Onboarding', sub: 'vs. legacy systems' },
  { v: '47%',  l: 'Higher Engagement', sub: 'with AI-driven paths' },
  { v: '12d',  l: 'Time to Launch', sub: 'average deployment' },
]

const TESTIMONIALS = [
  {
    q: "MapleLMS cut our onboarding time by 60% in the first quarter. The AI-driven learning paths are unlike anything we've used before.",
    name: 'Sarah Chen', role: 'VP of People, TechCorp Global', init: 'SC', color: '#6D28D9',
  },
  {
    q: "We went from 12 different training tools to one unified platform. Our L&D team finally has analytics to prove ROI to the board.",
    name: 'Marcus Johnson', role: 'Chief Learning Officer, Meridian', init: 'MJ', color: '#2563EB',
  },
  {
    q: "Deploying to 40,000 employees across 28 countries was seamless. The localization and multi-tenant features are world class.",
    name: 'Priya Kapoor', role: 'Head of L&D, Infinex Industries', init: 'PK', color: '#059669',
  },
]

export default function SocialProof() {
  const mRef  = useRef<HTMLDivElement>(null)
  const tRef  = useRef<HTMLDivElement>(null)
  const mView = useInView(mRef, { once: true, margin: '-10%' })
  const tView = useInView(tRef, { once: true, margin: '-8%' })

  return (
    <section style={{ background: '#F0ECE4', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Soft Background Accent */}
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(109, 40, 217, 0.04) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>

        {/* Metrics strip */}
        <div ref={mRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          borderRadius: 32, overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.6)', 
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 20px 40px -12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)', 
          marginBottom: 120,
        }}>
          {METRICS.map((m, i) => (
            <motion.div key={m.l}
              initial={{ opacity: 0, y: 20 }} animate={mView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              style={{
                padding: '48px 32px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(0,0,0,0.04)' : 'none',
              }}
            >
              <div style={{
                fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em',
                color: '#0B0E2D',
                lineHeight: 1.05, marginBottom: 8,
              }}>{m.v}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#0B0E2D', marginBottom: 4 }}>{m.l}</div>
              <div style={{ fontSize: 13, color: '#4B5563' }}>{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials header */}
        <div ref={tRef} style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={tView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} style={{ marginBottom: 18 }}>
            <span style={{ background: 'rgba(0,0,0,0.04)', color: '#0B0E2D', border: '1px solid rgba(0,0,0,0.08)', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Customer Stories
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 22 }} animate={tView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1, ease }} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#0B0E2D', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Loved by learning leaders <span style={{ color: '#6D28D9' }}>worldwide</span>
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 32 }} animate={tView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.06)' }}
              style={{
                padding: 40,
                background: 'rgba(255, 255, 255, 0.5)', 
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)', 
                border: '1px solid rgba(255, 255, 255, 0.6)', 
                borderRadius: 32,
              }}
            >
              <Quote size={24} color={t.color} style={{ opacity: 0.6, marginBottom: 24 }} />
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={15} fill={t.color} color={t.color} />)}
              </div>
              <p style={{ marginBottom: 32, lineHeight: 1.7, fontSize: 16, color: '#4B5563', fontWeight: 500 }}>"{t.q}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `${t.color}15`, border: `1px solid ${t.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: t.color, flexShrink: 0,
                }}>{t.init}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0B0E2D', letterSpacing: '-0.01em' }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


