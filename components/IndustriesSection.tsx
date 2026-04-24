'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const INDUSTRIES = [
  {
    n: '01', name: 'Fashion, Labels & Garment',
    desc: 'Creating garment websites to showcase collections, manage inventory, and enable seamless online shopping experiences.',
  },
  {
    n: '02', name: 'Travel & Hospitality',
    desc: 'Designing travel websites with booking systems and destination showcases, inspiring and simplifying trip planning.',
  },
  {
    n: '03', name: 'Manufacturing Industry',
    desc: 'Drive more leads & sales with manufacturing websites built for manufacturers, suppliers & industrial consultants.',
  },
  {
    n: '04', name: 'Nutrition & Supplements',
    desc: 'Creating healthcare websites with booking, patient resources, and service promos to build trust and connect effectively.',
  },
  {
    n: '05', name: 'FMCG Brand Websites',
    desc: 'Full-funnel digital presence for FMCG brands — product showcases, retail locators, and campaign landing pages.',
  },
  {
    n: '06', name: 'Home Decor & Furnishing',
    desc: 'Creating stunning websites for the furnishing industry to showcase furniture, decor, and boost online shopping.',
  },
  {
    n: '07', name: 'Corporate Web Design',
    desc: 'Designing corporate websites that reflect brand identity, enhance credibility, and deliver seamless user experiences.',
  },
  {
    n: '08', name: 'CA & Law Firms',
    desc: 'Creating professional legal websites to showcase expertise, manage client inquiries, and build trust through a secure experience.',
  },
  {
    n: '09', name: 'Ayurvedic & Organic Brands',
    desc: 'Creating reliable healthcare websites with booking, patient resources, and service promos to build trust and connect.',
  },
]

export default function IndustriesSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ backgroundColor: '#FFFFFF', padding: '100px 5%' }}>

      {/* Top rule */}
      <div style={{ width: '100%', height: 1, background: 'rgba(11,14,45,0.08)', marginBottom: 64 }} />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
      >
        <div style={{ width: 28, height: 1, background: 'rgba(11,14,45,0.3)' }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(11,14,45,0.35)',
        }}>
          Industries We Have Served
        </span>
      </motion.div>

      {/* Headline */}
      <div style={{ overflow: 'hidden', marginBottom: 8 }}>
        <motion.h2
          initial={{ y: '105%' }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.85, ease }}
          style={{
            margin: 0,
            fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.0,
            color: '#0B0E2D', fontFamily: '"Inter", sans-serif',
          }}
        >
          Crafting Digital Excellence
        </motion.h2>
      </div>
      <div style={{ overflow: 'hidden', marginBottom: 72 }}>
        <motion.h2
          initial={{ y: '105%' }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.08, ease }}
          style={{
            margin: 0,
            fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 300,
            fontStyle: 'italic', letterSpacing: '-0.04em', lineHeight: 1.0,
            color: '#0B0E2D', fontFamily: '"Inter", sans-serif',
          }}
        >
          Across Industries.
        </motion.h2>
      </div>

      {/* Industry list — ruled rows */}
      <div style={{ borderTop: '1px solid rgba(11,14,45,0.1)' }}>
        {INDUSTRIES.map((ind, i) => (
          <IndustryRow key={i} {...ind} i={i} inView={inView} />
        ))}
      </div>

    </div>
  )
}

function IndustryRow({
  n, name, desc, i, inView,
}: {
  n: string; name: string; desc: string; i: number; inView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06 + i * 0.05, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr auto',
        alignItems: 'center',
        gap: '0 32px',
        padding: '22px 0',
        borderBottom: '1px solid rgba(11,14,45,0.1)',
        cursor: 'pointer',
        transition: 'background 0.2s',
        background: hovered ? 'rgba(11,14,45,0.03)' : 'transparent',
        borderRadius: 4,
      }}
    >
      {/* Number */}
      <span style={{
        fontSize: 11, fontWeight: 700, color: 'rgba(11,14,45,0.25)',
        letterSpacing: '0.06em', fontFamily: '"Inter", sans-serif',
      }}>
        {n}
      </span>

      {/* Name + desc */}
      <div>
        <div style={{
          fontSize: 'clamp(16px, 1.6vw, 21px)', fontWeight: 700,
          color: '#0B0E2D', letterSpacing: '-0.02em', lineHeight: 1.2,
          fontFamily: '"Inter", sans-serif',
          marginBottom: hovered ? 6 : 0, transition: 'margin 0.25s',
        }}>
          {name}
        </div>
        <div style={{
          fontSize: 13, color: 'rgba(11,14,45,0.45)', lineHeight: 1.6,
          maxHeight: hovered ? 60 : 0, overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.25s ease',
        }}>
          {desc}
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ rotate: hovered ? 0 : 45, opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight size={20} color="#0B0E2D" strokeWidth={2} />
      </motion.div>
    </motion.div>
  )
}



