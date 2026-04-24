'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const NAV: Record<string, { label: string; href: string }[]> = {
  Platform:  [
    { label: 'AI Engine',       href: '#' },
    { label: 'Analytics',       href: '#' },
    { label: 'Content Library', href: '#' },
    { label: 'Mobile App',      href: '#' },
    { label: 'Integrations',    href: '#' },
  ],
  Solutions: [
    { label: 'Employee Training',    href: '#' },
    { label: 'Customer Education',   href: '#' },
    { label: 'Partner Enablement',   href: '#' },
    { label: 'Compliance',           href: '#' },
  ],
  Company: [
    { label: 'About Us',  href: '#' },
    { label: 'Careers',   href: '#' },
    { label: 'Press',     href: '#' },
    { label: 'Partners',  href: '#' },
    { label: 'Contact',   href: '#' },
  ],
  Resources: [
    { label: 'Blog',           href: '#' },
    { label: 'Case Studies',   href: '#' },
    { label: 'Documentation',  href: '#' },
    { label: 'Community',      href: '#' },
    { label: 'Status',         href: '#' },
  ],
}

const ease = [0.22, 1, 0.36, 1] as const

export default function Footer() {
  return (
    <footer style={{ background: '#FFFFFF', overflow: 'hidden' }}>

      {/* ── FULL-WIDTH TOP RULE ── */}
      <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.13)' }} />

      {/* ══ UPPER ZONE — brand left · links right ══ */}
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 5%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0 80px',
        alignItems: 'start',
      }}>

        {/* LEFT — brand block */}
        <div style={{ paddingTop: 52 }}>

          {/* small label */}
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'block',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)',
              marginBottom: 20,
            }}
          >
            Est. 2019 &nbsp;·&nbsp; San Francisco
          </motion.span>

          {/* italic tagline — heavy contrast with wordmark below */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{
              margin: '0 0 8px',
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(0,0,0,0.4)',
              letterSpacing: '-0.02em', lineHeight: 1.25,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            AI-powered learning,<br />built for teams
          </motion.p>

          {/* partial rule — intentionally short */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            style={{ width: '55%', height: '1px', background: 'rgba(0,0,0,0.15)', margin: '22px 0', transformOrigin: 'left' }}
          />

          {/* copy */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              margin: 0, fontSize: 13, fontWeight: 400,
              color: 'rgba(0,0,0,0.38)', lineHeight: 1.75, maxWidth: 320,
            }}
          >
            From onboarding to leadership development—MapleLMS delivers personalized journeys that keep every team ahead of change.
          </motion.p>


        </div>

        {/* RIGHT — nav link columns, pushed down intentionally */}
        <div style={{
          paddingTop: 72, /* offset — asymmetric on purpose */
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0 40px',
        }}>
          {Object.entries(NAV).map(([col, links], ci) => (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.07, ease }}
              style={{ marginBottom: 40 }}
            >
              {/* column header */}
              <p style={{
                margin: '0 0 16px',
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.13em', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.3)',
              }}>
                {col}
              </p>
              {/* links */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{
                        fontSize: 14, fontWeight: 400,
                        color: 'rgba(0,0,0,0.55)',
                        textDecoration: 'none',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.18s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.55)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── FULL-WIDTH MID RULE ── */}
      <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.1)', marginTop: 8 }} />

      {/* ══ LOWER ZONE — massive wordmark ══ */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        <motion.div
          initial={{ opacity: 0, y: 56 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          style={{
            fontSize: 'clamp(68px, 15vw, 216px)',
            fontWeight: 900,
            color: '#111',
            letterSpacing: '-0.055em',
            lineHeight: 0.85,
            textTransform: 'uppercase',
            fontFamily: '"Inter", sans-serif',
            userSelect: 'none',
            marginTop: 28,
            /* left-flush — not centred, bleeds naturally */
            marginLeft: '-0.04em',
          }}
        >
          MAPLELMS
        </motion.div>

        {/* ── BASE RULE ── */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.12)', marginTop: 14 }} />

        {/* ── LEGAL BASELINE ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 0 30px', flexWrap: 'wrap', gap: 10,
        }}>
          <span style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
            © 2026 MapleLMS Inc.
          </span>
          <span style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.2)' }}>
            Privacy &nbsp;·&nbsp; Terms &nbsp;·&nbsp; Security &nbsp;·&nbsp; Accessibility
          </span>
          <span style={{ fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.2)' }}>
            180+ countries &nbsp;·&nbsp; 99.9% uptime
          </span>
        </div>

      </div>
    </footer>
  )
}

