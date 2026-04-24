'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, BarChart3, Layers, Shield, Globe2, Zap, ArrowUpRight } from 'lucide-react'
import VideoBlock from './VideoBlock'

const ease = [0.16, 1, 0.3, 1]

const CARDS = [
  {
    id: 'ai', col: 2,
    icon: Brain, accent: '#6D28D9', iconBg: 'rgba(109,40,217,0.08)',
    tag: 'Core Intelligence',
    title: 'AI Learning Engine',
    body: 'Adaptive personalization that infers knowledge gaps and builds dynamic skill paths for every individual—automatically.',
    tags: ['Adaptive Paths', 'Skill Inference', 'Auto-Tagging', 'Smart Recommendations'],
    metric: { v: '3.2×', l: 'faster skill acquisition' },
  },
  {
    id: 'analytics', col: 1,
    icon: BarChart3, accent: '#2563EB', iconBg: 'rgba(37,99,235,0.08)',
    tag: 'Reporting',
    title: 'Deep Analytics',
    body: 'Real-time ROI dashboards, skill-gap heatmaps and board-ready reporting.',
    extra: 'bars',
  },
  {
    id: 'content', col: 1,
    icon: Layers, accent: '#059669', iconBg: 'rgba(5,150,105,0.08)',
    tag: 'Learning',
    title: 'Content Library',
    body: '50,000+ expert courses from world-class providers. Curated and ready to assign.',
  },
  {
    id: 'video', col: 2, isVideo: true,
    accent: '#6D28D9', iconBg: '',
    icon: Zap, tag: '', title: '', body: '',
    videoLabel: 'Platform Walkthrough',
  },
  {
    id: 'security', col: 1,
    icon: Shield, accent: '#DC2626', iconBg: 'rgba(220,38,38,0.08)',
    tag: 'Trust',
    title: 'Enterprise Security',
    body: 'SOC 2 Type II · GDPR · SSO · SCIM provisioning out of the box.',
  },
  {
    id: 'global', col: 1,
    icon: Globe2, accent: '#0891B2', iconBg: 'rgba(8,145,178,0.08)',
    tag: 'Scale',
    title: 'Global Reach',
    body: '180+ countries · 35+ languages · 99.9% uptime SLA guaranteed.',
    extra: 'regions',
  },
  {
    id: 'speed', col: 2,
    icon: Zap, accent: '#D97706', iconBg: 'rgba(217,119,6,0.08)',
    tag: 'Onboarding',
    title: 'Launch in Days, Not Months',
    body: 'Pre-built templates, guided onboarding, and a dedicated CSM get you live faster than any other LMS on the market.',
    metric: { v: '12 days', l: 'average time to launch' },
    extra: 'steps',
  },
]

function BarMini({ accent }: { accent: string }) {
  const data = [30, 55, 42, 68, 55, 82, 66, 94, 72, 100]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, marginTop: 20 }}>
      {data.map((h, i) => (
        <motion.div key={i}
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1, borderRadius: '3px 3px 0 0', height: `${h}%`, transformOrigin: 'bottom', background: `linear-gradient(to top, ${accent}, ${accent}60)` }}
        />
      ))}
    </div>
  )
}

function RegionDots({ accent }: { accent: string }) {
  const dots = ['NA', 'EU', 'APAC', 'LATAM', 'MEA']
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 18, flexWrap: 'wrap' }}>
      {dots.map(d => (
        <span key={d} style={{
          padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
          background: `${accent}10`, border: `1px solid ${accent}25`, color: accent,
        }}>{d}</span>
      ))}
    </div>
  )
}

function Steps({ accent }: { accent: string }) {
  const steps = ['Kick-off Call', 'Configure & Brand', 'Import Users', 'Go Live 🚀']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 18, flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px', borderRadius: 8,
            background: `${accent}08`, border: `1px solid ${accent}20`,
          }}>
            <div style={{
              width: 17, height: 17, borderRadius: '50%', background: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>{i + 1}</div>
            <span style={{ fontSize: 12, color: 'var(--text-b)', whiteSpace: 'nowrap' }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div style={{ width: 12, height: 1, background: 'var(--border)', flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  )
}

function Card({ card, i }: { card: typeof CARDS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  if (card.isVideo) {
    return (
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: i * 0.07, ease }}
        style={{ gridColumn: `span ${card.col}` }}
      >
        <VideoBlock label={card.videoLabel} delay={0.15} />
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.07, ease }}
      whileHover={{ y: -6, boxShadow: '0 25px 60px rgba(0,0,0,0.08)', transition: { duration: 0.3 } }}
      style={{
        gridColumn: `span ${card.col}`,
        padding: 32, position: 'relative', overflow: 'hidden',
        background: '#FFFFFF', borderRadius: 24, border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 15px 40px rgba(0,0,0,0.04)'
      }}
    >
      {/* Tag */}
      <span style={{
        fontSize: 10, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase',
        background: `${card.accent}10`, color: card.accent, border: `1px solid ${card.accent}20`,
        padding: '3px 8px', borderRadius: 6, display: 'inline-block', marginBottom: 18,
      }}>{card.tag}</span>

      {/* Icon */}
      <div style={{
        width: 42, height: 42, borderRadius: 12, background: card.iconBg,
        border: `1px solid ${card.accent}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
      }}>
        <card.icon size={20} color={card.accent} />
      </div>

      {/* Metric */}
      {card.metric && (
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.04em', color: card.accent, lineHeight: 1 }}>{card.metric.v}</span>
          <span style={{ fontSize: 13, color: '#4B5563', marginLeft: 8 }}>{card.metric.l}</span>
        </div>
      )}

      <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 10, color: '#0B0E2D' }}>{card.title}</h3>
      <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.6 }}>{card.body}</p>

      {card.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
          {card.tags.map(t => (
            <span key={t} style={{
              padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
              background: `${card.accent}08`, border: `1px solid ${card.accent}18`, color: card.accent,
            }}>{t}</span>
          ))}
        </div>
      )}
      {card.extra === 'bars' && <BarMini accent={card.accent} />}
      {card.extra === 'regions' && <RegionDots accent={card.accent} />}
      {card.extra === 'steps' && <Steps accent={card.accent} />}

      <ArrowUpRight size={16} color="var(--text-m)" style={{ position: 'absolute', bottom: 22, right: 22, opacity: 0.4 }} />
    </motion.div>
  )
}

export default function PlatformGrid() {
  const hRef = useRef<HTMLDivElement>(null)
  const inView = useInView(hRef, { once: true, margin: '-10%' })

  return (
    <section id="platform" style={{ background: '#F0ECE4', padding: '160px 0' }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div ref={hRef} style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }} style={{ marginBottom: 18 }}>
            <span style={{ background: 'rgba(0,0,0,0.05)', color: '#0B0E2D', border: '1px solid rgba(0,0,0,0.1)', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              The Platform
            </span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.08, ease }} style={{ marginBottom: 18, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#0B0E2D', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Everything you need <br />
            <span style={{ color: '#6D28D9' }}>in one platform</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.16, ease }} style={{ maxWidth: 540, margin: '0 auto', color: '#4B5563', fontSize: 18, lineHeight: 1.6 }}>
            AI-powered personalization, deep analytics, and enterprise security—all built for teams that move fast.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CARDS.map((c, i) => <Card key={c.id} card={c} i={i} />)}
        </div>
      </div>
    </section>
  )
}



