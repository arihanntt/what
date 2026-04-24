'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const TESTIMONIALS = [
  {
    initials: 'UD', color: '#111',
    name: 'Urvi Dama', title: 'Founder — The Blessed Wardrobe',
    quote: "Finally made the website live — it's looking beautiful! Thank you for the patience and help at every step. The team went above and beyond to bring our vision to life.",
    rating: 5,
  },
  {
    initials: 'AG', color: '#111',
    name: 'Ajay Gaur', title: 'IT Director — IMG World',
    quote: "We've been consistently impressed by the prompt, professional service. The team's availability and turnaround time is exceptional. It's rare to find this level of dedication.",
    rating: 5,
  },
  {
    initials: 'AP', color: '#111',
    name: 'Abhishek Parashar', title: 'Digital Head — Action Shoes',
    quote: "Incredibly creative and cooperative. Our new website is admired by clients and partners alike — it genuinely reflects the quality of our brand at every touchpoint.",
    rating: 5,
  },
  {
    initials: 'PA', color: '#111',
    name: 'Pedro Aidar', title: 'MD — Fruitchillpops (GFB)',
    quote: "We refreshed the Fruitchill website with eMaven and we are VERY SATISFIED. Top-tier quality, on schedule, and they understood our brand identity from day one.",
    rating: 5,
  },
  {
    initials: 'DK', color: '#111',
    name: 'Dinesh Kumar', title: 'Co-Founder — Earthy Origin',
    quote: "Everyone who visits loves the website — it's attractive, intuitive, and converts well. I strongly recommend eMavens. Their dedication and proactive thinking truly stand out.",
    rating: 5,
  },
  {
    initials: 'VA', color: '#111',
    name: 'Varun Arora', title: 'CEO — Puraroma',
    quote: "We are very happy with our new site and our strategic digital initiatives with eMaven's. They took exceptional care of us, from the first brief all the way through to launch.",
    rating: 5,
  },
]

const N = TESTIMONIALS.length

/* ══════════════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 28 })

  /* Stack shifts UP — vh strings, no SSR mismatch */
  const stackY = useTransform(smooth, [0, 1], ['0vh', `${-(N - 1) * 100}vh`])

  return (
    <div
      ref={containerRef}
      style={{ height: `${N * 100}vh`, position: 'relative', backgroundColor: '#FFFFFF' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,0,0,0.08)',
      }}>

        {/* ══ LEFT ════════════════════════════════════════════ */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 7% 0 5%',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          backgroundColor: '#FAFAFA',
        }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}
          >
            <div style={{ width: 28, height: 1, background: 'rgba(0,0,0,0.25)' }} />
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
            }}>
              Client Testimonials
            </span>
          </motion.div>

          {/* Headline */}
          {['500+ brands', 'built with us.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: i * 0.08, ease }}
                style={{
                  margin: 0,
                  fontSize: 'clamp(36px, 4.5vw, 68px)',
                  fontWeight: 800, lineHeight: 1.0,
                  letterSpacing: '-0.045em', color: '#111',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
          <div style={{ overflow: 'hidden', marginBottom: 28 }}>
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.17, ease }}
              style={{
                margin: 0,
                fontSize: 'clamp(36px, 4.5vw, 68px)',
                fontWeight: 300, fontStyle: 'italic',
                lineHeight: 1.0, letterSpacing: '-0.04em',
                color: '#111', fontFamily: '"Inter", sans-serif',
              }}
            >
              Still growing.
            </motion.h2>
          </div>

          {/* Hairline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ width: '100%', maxWidth: 380, height: 1, background: 'rgba(0,0,0,0.1)', transformOrigin: 'left', marginBottom: 24 }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            style={{
              margin: '0 0 36px', fontSize: 15, lineHeight: 1.8,
              color: 'rgba(0,0,0,0.48)', maxWidth: 360,
            }}
          >
            From D2C brands to enterprise platforms — our work speaks through our clients' results.
            A significant share of our business comes from referrals and repeat work.
          </motion.p>

          {/* Rating bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.38 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(s => (
                <div key={s} style={{ fontSize: 14, color: '#111' }}>★</div>
              ))}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>4.9</span>
            <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.35)' }}>· 120+ verified reviews</span>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40 }}
          >
            <div style={{ width: 24, height: 1, background: 'rgba(0,0,0,0.15)' }} />
            <span style={{
              fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)',
            }}>
              Scroll to read more
            </span>
          </motion.div>
        </div>

        {/* ══ RIGHT — card stack shifts up ════════════════════ */}
        <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
          <motion.div style={{ y: stackY, willChange: 'transform' }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  height: '100vh', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '0 10%',
                }}
              >

                {/* ── Card ── */}
                <div style={{
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.09)',
                  borderRadius: 20,
                  padding: '44px 40px 36px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
                  position: 'relative',
                }}>

                  {/* Large decorative quote mark */}
                  <div style={{
                    position: 'absolute', top: 28, right: 36,
                    fontSize: 80, lineHeight: 1, color: 'rgba(0,0,0,0.06)',
                    fontFamily: 'Georgia, serif', fontWeight: 700,
                    userSelect: 'none', pointerEvents: 'none',
                  }}>
                    "
                  </div>

                  {/* Avatar + name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: '#111',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800, color: '#fff',
                      flexShrink: 0, letterSpacing: '0.04em',
                    }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#111', lineHeight: 1.2 }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 3, fontWeight: 500 }}>
                        {t.title}
                      </div>
                    </div>
                  </div>

                  {/* Hairline */}
                  <div style={{ width: '100%', height: 1, background: 'rgba(0,0,0,0.07)', marginBottom: 24 }} />

                  {/* Quote */}
                  <p style={{
                    margin: '0 0 28px', fontSize: 16, lineHeight: 1.82,
                    color: 'rgba(0,0,0,0.65)', fontStyle: 'italic',
                  }}>
                    "{t.quote}"
                  </p>

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 3 }}>
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{ fontSize: 13, color: '#111' }}>★</span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
