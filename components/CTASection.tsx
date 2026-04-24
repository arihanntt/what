'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

export default function CTASection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <section style={{
      background: '#F0ECE4', padding: '160px 0',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div ref={ref} style={{
          position: 'relative', borderRadius: 40, overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 30px 60px -15px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
          padding: '100px 64px', textAlign: 'center',
        }}>
          {/* Internal Glow */}
          <div style={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: '100%', height: '200%',
            background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease }} style={{ marginBottom: 24 }}
            >
              <span style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(109, 40, 217, 0.08)', color: '#6D28D9', border: '1px solid rgba(109, 40, 217, 0.15)', 
                padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' 
              }}>
                <Sparkles size={13} />Ready to transform learning?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              style={{ marginBottom: 20, maxWidth: 840, margin: '0 auto 20px', fontSize: 'clamp(3.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#0B0E2D', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Start your enterprise{' '}
              <span style={{ color: '#6D28D9' }}>learning journey</span>{' '}
              today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              style={{ maxWidth: 540, margin: '0 auto 44px', color: '#4B5563', fontSize: 18, lineHeight: 1.6 }}
            >
              Join 2,500+ organizations using MapleLMS to build world-class
              learning experiences that deliver real business results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.28, ease }}
              style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <button style={{ 
                padding: '16px 36px', fontSize: 16, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', color: '#FFF',
                border: 'none', borderRadius: 100, cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(99,102,241,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}>
                <span>Get a Free Demo</span>
                <ArrowRight size={18} />
              </button>
              <button style={{ 
                padding: '16px 36px', fontSize: 16, fontWeight: 600,
                background: 'rgba(255,255,255,0.8)', color: '#0B0E2D',
                border: '1px solid rgba(0,0,0,0.1)', borderRadius: 100, cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}>
                Explore Platform
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45, ease }}
              style={{ marginTop: 28, fontSize: 14, color: '#6B7280', fontWeight: 500 }}
            >
              No credit card required&nbsp;&nbsp;·&nbsp;&nbsp;Setup in minutes&nbsp;&nbsp;·&nbsp;&nbsp;Cancel anytime
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

