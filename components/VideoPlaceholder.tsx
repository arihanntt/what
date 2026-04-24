'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

interface VideoPlaceholderProps {
  className?: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16'
  label?: string
  glowing?: boolean
  delay?: number
}

export default function VideoPlaceholder({
  className = '',
  aspectRatio = '16/9',
  label = 'Product Demo',
  glowing = false,
  delay = 0,
}: VideoPlaceholderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const aspectMap = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
    '9/16': 'aspect-9/16',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${aspectMap[aspectRatio]} ${className}`}
      style={{
        background:
          'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.08) 50%, rgba(6,182,212,0.06) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: glowing
          ? '0 0 60px rgba(124,58,237,0.2), 0 30px 80px rgba(0,0,0,0.5)'
          : '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(37,99,235,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Abstract waveform visual */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
          <path
            d="M0,30 C40,10 80,50 120,30 C160,10 200,50 240,30 C280,10 320,50 360,30 C380,22 390,26 400,30"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="2"
          />
          <path
            d="M0,35 C50,15 90,55 130,35 C170,15 210,55 250,35 C290,15 330,55 370,35 C385,28 393,31 400,35"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Label */}
      <div className="absolute top-4 left-4">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
          style={{
            background: 'rgba(124,58,237,0.3)',
            border: '1px solid rgba(124,58,237,0.4)',
            color: '#c084fc',
          }}
        >
          {label}
        </span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {/* Pulse ring */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: 'rgba(124,58,237,0.3)',
              animationDuration: '2s',
            }}
          />
          <Play size={24} className="text-white ml-1" fill="white" />
        </motion.div>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.08) 100%)',
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}


