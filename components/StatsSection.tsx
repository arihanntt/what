'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/* ── STATS ─────────────────────────────────────────────────── */
const STATS = [
  { to: 21,  suffix: '+', label: 'Years of Excellence',   decimal: false },
  { to: 950, suffix: '+', label: 'Projects Completed',    decimal: false },
  { to: 25,  suffix: '+', label: 'Human Resources',       decimal: false },
  { to: 98,  suffix: '%', label: 'Customer Satisfaction', decimal: false },
]

const BG = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop'

/* ── CountUp ────────────────────────────────────────────────── */
function CountUp({ to, suffix, delay = 0 }: { to: number; suffix: string; delay?: number }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const count  = useMotionValue(0)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, to, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView])

  return (
    <span>
      <span ref={ref}>0</span>{suffix}
    </span>
  )
}

/* ══════════════════════════════════════════════════════════ */
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%'])

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '88vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* ── Parallax BG ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-18%', left: 0, right: 0, bottom: '-18%',
          backgroundImage: `url(${BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
        }}
      />

      {/* ── Overlay — richer gradient ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 70% 60% at 30% 80%, rgba(82,39,255,0.18) 0%, transparent 70%),
          linear-gradient(170deg, rgba(11,14,45,0.3) 0%, rgba(11,14,45,0.88) 55%, rgba(11,14,45,0.96) 100%)
        `,
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '80px 5% 80px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
        >
          <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          }}>
            By the Numbers
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease }}
            style={{
              margin: '0 0 4px',
              fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 800,
              color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.0,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Trusted for 21 years.
          </motion.h2>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 48 }}>
          <motion.h2
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.07, ease }}
            style={{
              margin: 0,
              fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 300,
              fontStyle: 'italic', color: 'rgba(255,255,255,0.7)',
              letterSpacing: '-0.03em', lineHeight: 1.0,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Still raising the bar.
          </motion.h2>
        </div>

        {/* ── Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(11,14,45,0.55)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 22,
                padding: '40px 28px 36px',
                textAlign: 'center',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(180,151,207,0.6), transparent)',
                borderRadius: 2,
              }} />

              {/* Count-up number */}
              <div style={{
                fontSize: 'clamp(52px, 5.5vw, 84px)',
                fontWeight: 900, color: '#fff',
                letterSpacing: '-0.06em', lineHeight: 1,
                fontFamily: '"Inter", sans-serif',
                marginBottom: 16,
              }}>
                <CountUp to={s.to} suffix={s.suffix} delay={i * 0.12} />
              </div>

              {/* Hairline divider */}
              <div style={{
                width: 40, height: 1,
                background: 'rgba(255,255,255,0.2)',
                margin: '0 auto 14px',
              }} />

              {/* Label */}
              <div style={{
                fontSize: 14, color: 'rgba(255,255,255,0.55)',
                fontWeight: 500, lineHeight: 1.5,
              }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

