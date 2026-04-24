'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import NavbarV1 from '@/components/NavbarV1'
import HeroV1 from '@/components/HeroV1'
import NavbarV2 from '@/components/NavbarV2'
import HeroV2 from '@/components/HeroV2'

import Portfolio from '@/components/Portfolio'
import ServicesSection from '@/components/ServicesSection'
import StatsSection from '@/components/StatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import IndustriesSection from '@/components/IndustriesSection'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  const [heroVersion, setHeroVersion] = useState<'v1' | 'v2'>('v1')

  const toggleHero = () => {
    setHeroVersion(prev => prev === 'v1' ? 'v2' : 'v1')
  }

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh', position: 'relative' }}>
      
      {/* ── VERSION SWITCHER BUTTON ── */}
      <button 
        onClick={toggleHero}
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
          padding: '12px 24px', borderRadius: 100,
          background: 'rgba(20, 20, 25, 0.95)', 
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#FFF', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em',
          textTransform: 'uppercase', cursor: 'pointer',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', gap: 12,
          transition: 'transform 0.2s, background 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
          e.currentTarget.style.background = 'rgba(40, 40, 50, 0.95)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
          e.currentTarget.style.background = 'rgba(20, 20, 25, 0.95)'
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: heroVersion === 'v1' ? '#6D28D9' : '#10B981', boxShadow: heroVersion === 'v1' ? '0 0 10px #6D28D9' : '0 0 10px #10B981' }} />
        {heroVersion === 'v1' ? 'Try Premium UI' : 'Back to Original'}
      </button>

      {/* ── SMOOTH A/B HERO TRANSITION ── */}
      <AnimatePresence mode="wait">
        {heroVersion === 'v1' ? (
          <motion.div 
            key="v1"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <NavbarV1 />
            <HeroV1 />
          </motion.div>
        ) : (
          <motion.div 
            key="v2"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <NavbarV2 />
            <HeroV2 />
          </motion.div>
        )}
      </AnimatePresence>

      <StatsSection />
      <ServicesSection />
      <Portfolio />
      <TestimonialsSection />
      <IndustriesSection />
      <FAQ />
      <Footer />
    </main>
  )
}

