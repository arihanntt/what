'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function NavbarV2() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '16px 5%' : '32px 5%'
      }}
    >
      <nav
        style={{
          width: '100%',
          maxWidth: '1600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* BOLD MINIMAL LOGO */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '24px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#111',
              textTransform: 'uppercase'
            }}
          >
            EMAVENS
          </span>
        </Link>

        {/* MINIMALIST LINKS */}
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          {['About', 'Services', 'Work'].map((link) => (
            <Link
              key={link}
              href={`#${link}`}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#555',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
            >
              {link}
            </Link>
          ))}
        </div>

        {/* HIGH-END CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="#login" style={{ textDecoration: 'none', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#111' }}>
            Login
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#000' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '14px 28px',
              fontSize: '13px',
              fontWeight: 800,
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderRadius: '100px',
              border: '1px solid #111',
              cursor: 'pointer',
              background: '#111',
              color: '#fff',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            Book Call
          </motion.button>
        </div>
      </nav>
    </div>
  )
}
