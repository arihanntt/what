'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ── Projects — all Unsplash, high quality ───────────────── */
const PROJECTS = [
  {
    num: '01', title: 'Luxe Commerce',
    cat: 'E-Commerce', year: '2024',
    desc: 'A high-converting D2C store built for scale — drove 3.2× revenue growth in the first quarter after launch.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop',
    accent: '#111', dark: false,
  },
  {
    num: '02', title: 'Brand Identity',
    cat: 'Branding', year: '2024',
    desc: 'End-to-end visual identity for a Series-A fintech. Logo, design system, motion guidelines — delivered in 3 weeks.',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2640&auto=format&fit=crop',
    accent: '#fff', dark: true,
  },
  {
    num: '03', title: 'SaaS Dashboard',
    cat: 'Web App', year: '2025',
    desc: 'Redesigned a B2B analytics platform from scratch — cut onboarding drop-off by 47% in month one.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    accent: '#111', dark: false,
  },
  {
    num: '04', title: 'SEO Scale-Up',
    cat: 'SEO Growth', year: '2024',
    desc: 'Took a D2C brand from 800 to 48,000 monthly organic visitors in six months. Zero paid traffic.',
    img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?q=80&w=2674&auto=format&fit=crop',
    accent: '#fff', dark: true,
  },
  {
    num: '05', title: 'MVP Launch',
    cat: 'Product Build', year: '2025',
    desc: 'Zero to launched in 6 weeks. The waitlist exceeded 5,000 signups before the first line of marketing copy.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop',
    accent: '#111', dark: false,
  },
]

const N   = PROJECTS.length
const ease = [0.22, 1, 0.36, 1] as const

/* ══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)
  const headerView = useInView(headerRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 26 })

  /* vh strings — zero SSR mismatch */
  const leftY  = useTransform(smooth, [0, 1], ['0vh',           `${-(N - 1) * 100}vh`])
  const rightY = useTransform(smooth, [0, 1], [`${-(N - 1) * 100}vh`, '0vh'])

  return (
    <section style={{ backgroundColor: '#FFFFFF', position: 'relative' }}>

      <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.08)' }} />

      {/* ── HEADER ── */}
      <div ref={headerRef} style={{ padding: '64px 5% 60px' }}>
        {['Work that', 'converts. →'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '105%' }}
              animate={headerView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.1, ease }}
              style={{
                fontSize: 'clamp(52px, 8.5vw, 122px)',
                fontWeight: i === 0 ? 900 : 300,
                fontStyle: i === 1 ? 'italic' : 'normal',
                color: '#111', letterSpacing: '-0.045em', lineHeight: 0.92,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {line}
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── STICKY OPPOSITE SCROLL ── */}
      <div ref={scrollRef} style={{ height: `${N * 100}vh`, position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          overflow: 'hidden', display: 'flex',
        }}>

          {/* LEFT — text blocks go UP */}
          <motion.div style={{ width: '50vw', flexShrink: 0, y: leftY, willChange: 'transform' }}>
            {PROJECTS.map((p) => (
              <div
                key={p.num}
                style={{
                  height: '100vh', width: '100%', boxSizing: 'border-box',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', padding: '48px 56px',
                  backgroundColor: p.dark ? '#111' : '#FAFAFA',
                  borderRight: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                {/* top */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: p.dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.25)',
                  }}>
                    {p.num}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: p.dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)',
                  }}>
                    {p.cat} · {p.year}
                  </span>
                </div>

                {/* accent bar */}
                <div style={{ width: 44, height: 2, borderRadius: 2, background: p.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />

                {/* bottom */}
                <div>
                  <h3 style={{
                    margin: '0 0 18px',
                    fontSize: 'clamp(28px, 3.2vw, 48px)', fontWeight: 800,
                    color: p.dark ? '#fff' : '#111',
                    letterSpacing: '-0.03em', lineHeight: 1.1,
                    fontFamily: '"Inter", sans-serif',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    margin: '0 0 36px', fontSize: 15, fontWeight: 400,
                    color: p.dark ? 'rgba(255,255,255,0.48)' : 'rgba(0,0,0,0.44)',
                    lineHeight: 1.75, maxWidth: 360,
                  }}>
                    {p.desc}
                  </p>
                  <button style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', borderRadius: 100,
                    border: `1.5px solid ${p.dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.2)'}`,
                    background: 'transparent',
                    color: p.dark ? '#fff' : '#111',
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: '"Inter", sans-serif',
                  }}>
                    View Case Study <ArrowUpRight size={12} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* RIGHT — images go DOWN */}
          <motion.div style={{ width: '50vw', flexShrink: 0, y: rightY, willChange: 'transform' }}>
            {[...PROJECTS].reverse().map((p) => (
              <div
                key={p.num}
                style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}
              >
                <img
                  src={p.img} alt={p.title}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                  }}
                />
                {/* gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                }} />
                {/* label */}
                <div style={{ position: 'absolute', bottom: 40, left: 48, color: '#fff' }}>
                  <span style={{
                    display: 'block', fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    opacity: 0.6, marginBottom: 8,
                  }}>
                    {p.cat}
                  </span>
                  <span style={{
                    display: 'block', fontSize: 'clamp(18px, 2vw, 28px)',
                    fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1,
                  }}>
                    {p.title}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.08)' }} />
    </section>
  )
}
