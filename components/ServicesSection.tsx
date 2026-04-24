'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ── Service data ────────────────────────────────────────── */
const SERVICES = [
  {
    subheading: 'Agile & Customer Centric',
    heading: 'Website Design & Development',
    imgUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop',
    items: [
      'Ideation and Evaluation',
      'Custom UI/UX Design',
      'Website Development',
      'Website Redesign & Revamp',
      'Hosting and Maintenance',
    ],
  },
  {
    subheading: 'Scale Your Store',
    heading: 'E-commerce Solutions',
    imgUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop',
    items: [
      'Consulting & Market Research',
      'Design, Development & Maintenance',
      'Shopify Website Design',
      'Magento Web Design',
      'WordPress Web Design',
    ],
  },
  {
    subheading: 'Cross-Platform Excellence',
    heading: 'App Development',
    imgUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2667&auto=format&fit=crop',
    items: [
      'Custom Web Application',
      'Mobile App Development',
      'eCommerce Website Development',
      'Flutter App Development',
      'Web & Mobile App Development',
    ],
  },
  {
    subheading: 'Grow Faster Online',
    heading: 'Digital Marketing',
    imgUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    items: [
      'Marketing Strategy',
      'SEO, SEM, SMO & Email',
      'Performance Marketing',
      'Conversion Rate Optimization',
      'Content Marketing',
    ],
  },
]

const IMG_PADDING = 12
const ease = [0.22, 1, 0.36, 1] as const

/* ══════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>

      {/* ── slim eyebrow — zero wasted height ── */}
      <div style={{
        width: '100%', height: '1px', background: 'rgba(0,0,0,0.1)',
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '28px 5%',
      }}>
        <div style={{ width: 28, height: 1, background: 'rgba(0,0,0,0.22)' }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
        }}>
          Our Services
        </span>
        <span style={{
          fontSize: 10, fontWeight: 400, color: 'rgba(0,0,0,0.2)',
          letterSpacing: '0.06em',
        }}>
          — Agile, flexible &amp; affordable
        </span>
      </div>

      {/* ── SERVICE BLOCKS ── */}
      {SERVICES.map((s, i) => (
        <ServiceBlock key={i} {...s} />
      ))}

      {/* ── BOTTOM RULE ── */}
      <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.08)' }} />
    </div>
  )
}

/* ── Individual service block ──────────────────────────────── */
function ServiceBlock({ imgUrl, subheading, heading, items }: {
  imgUrl: string; subheading: string; heading: string; items: string[]
}) {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div style={{ position: 'relative', height: '150vh' }}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <ServiceContent heading={heading} items={items} />
    </div>
  )
}

/* ── Sticky image with scale-out on exit ─────────────────── */
function StickyImage({ imgUrl }: { imgUrl: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  })
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
        position: 'sticky',
        zIndex: 0,
        overflow: 'hidden',
        borderRadius: 24,
      }}
    >
      {/* Dark overlay fades as image exits */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(11,14,45,0.62)',
          opacity,
        }}
      />
    </motion.div>
  )
}

/* ── Text overlay that floats through the sticky image ──────── */
function OverlayCopy({ subheading, heading }: { subheading: string; heading: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y       = useTransform(scrollYProgress, [0, 1], [250, -250])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        y, opacity,
        position: 'absolute', left: 0, top: 0,
        height: '100vh', width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        color: '#fff', textAlign: 'center',
        padding: '0 10%',
        zIndex: 1,
      }}
    >
      <p style={{
        margin: '0 0 14px',
        fontSize: 'clamp(12px, 1.5vw, 18px)', fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        opacity: 0.65,
      }}>
        {subheading}
      </p>
      <h3 style={{
        margin: 0,
        fontSize: 'clamp(36px, 6vw, 90px)', fontWeight: 800,
        letterSpacing: '-0.04em', lineHeight: 1.0,
        fontFamily: '"Inter", sans-serif',
      }}>
        {heading}
      </h3>
    </motion.div>
  )
}

/* ── Content grid below each sticky image ──────────────────── */
function ServiceContent({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: '0 64px',
      padding: '56px 40px 96px',
    }}>

      {/* Left: heading */}
      <motion.h4
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        style={{
          margin: 0,
          fontSize: 'clamp(22px, 2.2vw, 34px)', fontWeight: 700,
          color: '#111', letterSpacing: '-0.025em', lineHeight: 1.2,
          fontFamily: '"Inter", sans-serif',
        }}
      >
        {heading}
      </motion.h4>

      {/* Right: list + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
      >
        <ul style={{ margin: '0 0 36px', padding: 0, listStyle: 'none' }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                padding: '14px 0',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                fontSize: 16, color: 'rgba(0,0,0,0.58)',
                fontWeight: 400, display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'rgba(0,0,0,0.22)', flexShrink: 0,
              }} />
              {item}
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ backgroundColor: '#0B0E2D', color: '#FFFFFF' }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 24px', borderRadius: 100,
            background: 'transparent', color: '#111',
            border: '1.5px solid rgba(0,0,0,0.22)',
            fontWeight: 700, fontSize: 12, letterSpacing: '0.08em',
            textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: '"Inter", sans-serif',
            transition: 'background 0.22s, color 0.22s',
          }}
        >
          Start With Us <ArrowUpRight size={13} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

    </div>
  )
}

