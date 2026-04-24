'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Plus, Minus } from 'lucide-react'

// ── FAQ Data ────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What services does eMavens provide in the digital realm?',
    a: 'eMavens specializes in diverse digital solutions including website development, eCommerce platforms, and user-focused design. We offer tailored solutions to meet your business requirements effectively.',
  },
  {
    q: 'How does eMavens ensure a seamless user experience on websites?',
    a: 'We begin every project with deep UX research — understanding your audience, mapping user journeys, and crafting interfaces that convert. Our process combines data-driven insights with visually premium design.',
  },
  {
    q: 'Can eMavens assist in improving online visibility?',
    a: 'Absolutely. Our digital marketing arm covers SEO, content strategy, paid ads, and AI search optimization — ensuring your brand consistently surfaces where your customers are looking.',
  },
  {
    q: 'What makes eMavens stand out among digital agencies?',
    a: 'We treat every client as a long-term partner. Our team blends cutting-edge design, engineering, and growth marketing — and we never deliver a cookie-cutter output. Every solution is purpose-built for your business.',
  },
  {
    q: 'Does eMavens work with clients across different time zones?',
    a: 'Yes. We have successfully partnered with clients across India, the US, UK, UAE, and Australia. Our async-first workflow ensures smooth communication regardless of your time zone.',
  },
  {
    q: 'How do I initiate a project with eMavens for my digital needs?',
    a: "Simply book a free strategy call through our website. We'll walk you through your goals, assess the scope, and recommend the best path forward — no commitment required.",
  },
  {
    q: 'Do you work with startups?',
    a: 'Absolutely! Startups are some of our favourite clients. We offer flexible engagement models and can help you go from idea to launched digital product quickly and cost-effectively.',
  },
  {
    q: 'What is your project cost?',
    a: 'Project costs vary based on scope and complexity. Website projects typically start from ₹25,000, with full-scale digital marketing retainers starting from ₹15,000/month. Book a call for a detailed quote.',
  },
  {
    q: 'Can eMavens assist in redesigning our B2B or enterprise software?',
    a: 'Yes — we have experience redesigning complex B2B SaaS and enterprise platforms. We focus on making complex workflows intuitive, reducing cognitive load, and improving task completion rates for your users.',
  },
]

// ── Single FAQ Row ───────────────────────────────────────────────────
function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<gsap.core.Tween | null>(null)

  const animDefaults = { duration: 0.5, ease: 'expo.out' }

  const getEdge = (mouseX: number, mouseY: number, w: number, h: number) => {
    const top = (mouseX - w / 2) ** 2 + mouseY ** 2
    const bot = (mouseX - w / 2) ** 2 + (mouseY - h) ** 2
    return top < bot ? 'top' : 'bottom'
  }

  // Spin up marquee animation once on mount
  useEffect(() => {
    if (!marqueeInnerRef.current) return
    const part = marqueeInnerRef.current.querySelector('.faq-marquee-part') as HTMLElement
    if (!part) return
    const w = part.offsetWidth
    if (!w) return
    animRef.current = gsap.to(marqueeInnerRef.current, { x: -w, duration: 20, ease: 'none', repeat: -1 })
    return () => { animRef.current?.kill() }
  }, [])

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!rowRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const { clientX, clientY } = e
    const rect = rowRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const edge = getEdge(x, y, rect.width, rect.height)
    gsap.timeline({ defaults: animDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!rowRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const { clientX, clientY } = e
    const rect = rowRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const edge = getEdge(x, y, rect.width, rect.height)
    gsap.timeline({ defaults: animDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
  }

  return (
    <div style={{ borderTop: index === 0 ? 'none' : '1px solid rgba(0,0,0,0.1)' }}>
      {/* ─ Question Row ─ */}
      <div
        ref={rowRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setOpen(prev => !prev)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          userSelect: 'none',
        }}
      >
        {/* Question text */}
        <span style={{
          fontSize: 'clamp(14px, 1.8vw, 22px)',
          fontWeight: 600,
          color: '#111',
          letterSpacing: '-0.02em',
          position: 'relative',
          zIndex: 2,
        }}>
          {faq.q}
        </span>

        {/* Toggle icon */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '1.5px solid rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginLeft: '24px',
          position: 'relative', zIndex: 2,
          background: open ? '#111' : 'transparent',
          transition: 'background 0.25s',
        }}>
          {open
            ? <Minus size={14} color="#fff" strokeWidth={2.5} />
            : <Plus size={14} color="#111" strokeWidth={2.5} />
          }
        </div>

        {/* FlowingMenu-style hover marquee overlay */}
        <div
          ref={marqueeRef}
          style={{
            position: 'absolute', inset: 0,
            background: '#111',
            transform: 'translateY(101%)',
            overflow: 'hidden',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <div ref={marqueeInnerRef} style={{ display: 'flex', alignItems: 'center', height: '100%', width: 'fit-content', transform: 'translateY(-101%)' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="faq-marquee-part" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, padding: '0 2vw', color: '#FFFFFF' }}>
                <span style={{ whiteSpace: 'nowrap', fontSize: 'clamp(14px, 1.8vw, 22px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {faq.q}
                </span>
                <span style={{ margin: '0 2vw', opacity: 0.4, fontSize: '20px' }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─ Answer Accordion ─ */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '4px 5% 28px 5%',
              fontSize: 'clamp(14px, 1.4vw, 18px)',
              color: '#555',
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: '720px',
            }}>
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────
export default function FAQ() {
  return (
    <section style={{ width: '100%', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ padding: '80px 5% 40px 5%', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: '#111' }} />
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#555' }}>
            FAQ's
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', lineHeight: 1.0, textTransform: 'uppercase' }}>
            Smart Solutions
          </div>
          <div style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300, color: '#111', letterSpacing: '-0.03em', lineHeight: 1.0, fontStyle: 'italic' }}>
            for Your Smart Queries!
          </div>
        </div>
        <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.12)', marginTop: '24px' }} />
      </motion.div>

      {/* Accordion rows */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' }}>
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
        {/* Bottom rule */}
        <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', margin: '0 5%' }} />
      </div>

    </section>
  )
}

