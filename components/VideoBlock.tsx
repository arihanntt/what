'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

interface VideoBlockProps {
  label?: string
  delay?: number
  style?: React.CSSProperties
  noAspect?: boolean
}

export default function VideoBlock({ label = 'Product Demo', delay = 0, style = {}, noAspect = false }: VideoBlockProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const ease   = [0.16, 1, 0.3, 1] as const

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
      style={{
        position: 'relative',
        width: '100%',
        ...(noAspect ? {} : { paddingBottom: '58%' }),
        borderRadius: 20,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 50%, #EDE9FE 100%)',
        border: '1px solid rgba(79,70,229,0.1)',
        boxShadow: '0 20px 60px rgba(79,70,229,0.1), 0 4px 16px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        ...style,
      }}
    >
      {/* Dot grid */}
      <div className="dots-grid" style={{
        position: 'absolute', inset: 0, opacity: 0.6,
      }} />

      {/* Gradient blobs */}
      <div style={{
        position: 'absolute', width: 220, height: 220,
        top: '-30px', right: '-30px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 65%)',
        filter: 'blur(30px)',
      }} />
      <div style={{
        position: 'absolute', width: 160, height: 160,
        bottom: '-20px', left: '20%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)',
        filter: 'blur(25px)',
      }} />

      {/* Label */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        padding: '5px 12px', borderRadius: 100,
        background: 'rgba(109,40,217,0.1)',
        border: '1px solid rgba(109,40,217,0.2)',
        fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#6D28D9',
      }}>{label}</div>

      {/* Waveform decoration */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0.25,
      }}>
        <svg viewBox="0 0 600 80" style={{ width: '85%' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="wg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6D28D9"/>
              <stop offset="100%" stopColor="#2563EB"/>
            </linearGradient>
          </defs>
          <path d="M0,40 C80,10 160,70 240,40 C320,10 400,70 480,40 C540,18 575,28 600,40" fill="none" stroke="url(#wg2)" strokeWidth="2.5"/>
          <path d="M0,45 C90,20 170,65 260,45 C340,25 420,65 500,45 C555,30 580,36 600,45" fill="none" stroke="url(#wg2)" strokeWidth="1.5" opacity="0.5"/>
        </svg>
      </div>

      {/* Play button */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            width: 64, height: 64, borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 8px 32px rgba(109,40,217,0.2), 0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1.5px solid rgba(109,40,217,0.3)',
            animation: 'pulse-ring 2s ease-out infinite',
          }} />
          <Play size={22} color="#6D28D9" fill="#6D28D9" style={{ marginLeft: 3 }} />
        </motion.div>
      </div>
    </motion.div>
  )
}


