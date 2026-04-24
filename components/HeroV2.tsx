'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import dynamic from 'next/dynamic'

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false })

// Navbar height — increase if content clips under the nav
const NAV_H = 100

export default function HeroV2() {
  const containerRef = useRef<HTMLElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    mouseX.set((clientX / window.innerWidth - 0.5) * 2) 
    mouseY.set((clientY / window.innerHeight - 0.5) * 2) 
  }

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })

  const y    = useTransform(smooth, [0, 1], [0, -80])
  const fade = useTransform(smooth, [0, 0.45], [1, 0])

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', height: '150vh', backgroundColor: '#FFFFFF' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        
        {/* Fluid background — Hero v1 colours, more visible */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.75 }}>
          <LiquidEther
            mouseForce={12}
            cursorSize={70}
            iterationsPoisson={8}
            iterationsViscous={8}
            isViscous={false}
            viscous={20}
            colors={["#5227FF", "#FF9FFC", "#B497CF"]} 
            autoDemo
            autoSpeed={0.15}
            autoIntensity={1.0}
            isBounce={false}
            resolution={0.2}
          />
        </div>
        
        {/* Soft cream overlay — enough to keep text crisp, but lets the fluid breathe */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(255,255,255,0.35)' }} />

        {/* ── MAIN LAYOUT: positioned strictly BELOW navbar, above bottom ── */}
        <motion.div 
          style={{ 
            position: 'absolute',
            top: NAV_H,    // start right below the fixed navbar
            bottom: 0,
            left: 0, right: 0,
            zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingBottom: '16px',
            paddingLeft: '5%', paddingRight: '5%',
            opacity: fade, y,
            pointerEvents: 'none'
          }}
        >

      

          {/* ── HORIZONTAL RULE ── */}
          <div style={{ width: '100%', maxWidth: '900px', height: '1px', background: 'rgba(0,0,0,0.1)', marginBottom: '20px' }} />

          {/* ── MAGAZINE HEADLINE (stacked, editorial, tight) ── */}
          <div style={{ 
            width: '100%', maxWidth: '900px', textAlign: 'center',
            display: 'flex', flexDirection: 'column', gap: '0px'
          }}>

            {/* Line 1: light weight */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(36px, 6.5vw, 88px)', fontWeight: 300, color: '#111', letterSpacing: '-0.03em', lineHeight: 1.0, fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}
            >
              We build & scale
            </motion.div>

            {/* Thin mid-rule with decorative span */}
            <motion.div 
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.12)', margin: '8px 0', transformOrigin: 'left' }} 
            />

            {/* Line 2: massive bold WORD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(72px, 14vw, 200px)', fontWeight: 900, color: '#111', letterSpacing: '-0.05em', lineHeight: 0.9, textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}
            >
              WEBSITES
            </motion.div>

            {/* Thin mid-rule */}
            <motion.div 
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.12)', margin: '8px 0', transformOrigin: 'right' }} 
            />

            {/* Line 3: light again */}
            <motion.div
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(36px, 6.5vw, 88px)', fontWeight: 300, color: '#111', letterSpacing: '-0.03em', lineHeight: 1.0, fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}
            >
              that grow Businesses Online.
            </motion.div>

          </div>

          {/* ── HORIZONTAL RULE ── */}
          <div style={{ width: '100%', maxWidth: '900px', height: '1px', background: 'rgba(0,0,0,0.1)', marginTop: '20px' }} />

          {/* ── DESCRIPTION ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              width: '100%', maxWidth: '900px', marginTop: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px',
              flexWrap: 'wrap'
            }}
          >
            <p style={{ margin: 0, fontSize: '16px', color: '#555', lineHeight: 1.65, maxWidth: '480px', fontWeight: 400 }}>
              We craft visually captivating, conversion-focused digital experiences that compound your growth — from design to launch to scale.
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ backgroundColor: '#111', color: '#fff' }}
              whileTap={{ scale: 0.96 }}
              style={{ 
                pointerEvents: 'auto',
                padding: '14px 28px', background: 'transparent', color: '#111', borderRadius: '100px',
                border: '1.5px solid #111', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '10px',
                fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase',
                transition: 'background 0.25s, color 0.25s'
              }}
            >
              Book Consultation <ArrowRight size={14} strokeWidth={2.5} />
            </motion.button>
          </motion.div>

          {/* ── TRUST BAR ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px' }}
          >
            <div style={{ display: 'flex' }}>
              {['AB', 'VR', 'AJ', 'UD'].map((ini, i) => (
                <div key={ini} style={{
                  width: '36px', height: '36px', borderRadius: '50%', background: '#FFF',
                  border: '1.5px solid rgba(0,0,0,0.1)', marginLeft: i !== 0 ? '-12px' : '0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#333', fontSize: '10px', fontWeight: 800, zIndex: 10 - i,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  {ini}
                </div>
              ))}
            </div>
            <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.15)' }} />
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="#111" color="#111" />)}
            </div>
            <span style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>
              <b style={{ color: '#111' }}>500+ Businesses</b> trust us their Digital Partner
            </span>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
