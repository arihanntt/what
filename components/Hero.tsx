'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Play, ArrowRight, Activity } from 'lucide-react'
import dynamic from 'next/dynamic'
import CardSwap, { Card } from './CardSwap'
import BlurText from './BlurText'
import ShinyText from './ShinyText'

// LiquidEther uses WebGL — load client-only to avoid SSR issues
const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false })

export default function Hero() {
  const trackRef = useRef<HTMLElement>(null)

  // Extend scroll distance to 300vh for a multi-stage cinematic sequence
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Silky smooth interpolation
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.0001 })

  // --- 🎭 STAGE 1: TYPOGRAPHY & HERO DEPARTURE ---
  const textOpacity = useTransform(smooth, [0, 0.25], [1, 0])
  const textY = useTransform(smooth, [0, 0.3], [0, -100])
  const textBlur = useTransform(smooth, [0, 0.25], ['blur(0px)', 'blur(12px)'])

  // Massive background text parallax (Two layers for depth)
  const bgTextY = useTransform(smooth, [0, 1], [0, 600])
  const bgTextY2 = useTransform(smooth, [0, 1], [0, 300])
  const bgTextOpacity = useTransform(smooth, [0, 0.3], [0.04, 0])

  // --- 🎥 STAGE 2: THE CINEMATIC PLUNGE (GPU Accelerated) ---
  // Video drops from outside the top of the screen, expanding to full viewport via Scale
  const videoY = useTransform(smooth, [0.1, 0.8], ['-120vh', '0vh'])
  const videoScale = useTransform(smooth, [0.1, 0.8], [0.55, 1])

  // --- 🃏 STAGE 2.5: CARD SWAP FADE OUT ---
  // CardSwap sits on top initially, blending with text blur/opacity sequence
  const cardSwapOpacity = useTransform(smooth, [0.1, 0.4], [1, 0])
  const cardSwapY = useTransform(smooth, [0.1, 0.4], [0, -50])

  // --- 🎛️ STAGE 3: INTERFACE REVEAL ---
  // Once full screen, the app interface fades in over the video
  const uiOpacity = useTransform(smooth, [0.85, 1], [0, 1])
  const uiY = useTransform(smooth, [0.85, 1], [40, 0])

  return (
    <section ref={trackRef} style={{ height: '300vh', backgroundColor: '#F0ECE4', position: 'relative' }}>

      {/* ── STICKY VIEWPORT ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* ── LiquidEther WebGL fluid background ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <LiquidEther
            mouseForce={15}
            cursorSize={80}
            iterationsPoisson={16}
            iterationsViscous={16}
            isViscous={false}
            viscous={20}
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            autoDemo
            autoSpeed={0.3}
            autoIntensity={1.5}
            isBounce={false}
            resolution={0.25} // Dropped resolution for much smoother framerate
          />
        </div>

        {/* ── 🔠 IMMERSIVE BACKGROUND PARALLAX TYPOGRAPHY ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
          <motion.div style={{
            position: 'absolute', top: '10vh', left: '-5vw',
            fontSize: '35vw', fontWeight: 900, color: '#0B0E2D',
            y: bgTextY, opacity: bgTextOpacity,
            whiteSpace: 'nowrap', letterSpacing: '-0.06em', lineHeight: 0.8
          }}>
            S C A L E
          </motion.div>
          <motion.div style={{
            position: 'absolute', top: '45vh', right: '-10vw',
            fontSize: '20vw', fontWeight: 900, color: '#0B0E2D',
            y: bgTextY2, opacity: bgTextOpacity,
            whiteSpace: 'nowrap', letterSpacing: '-0.04em', lineHeight: 0.8
          }}>
            S C A L E
          </motion.div>
        </div>

        {/* ── 🖋️ HIGH-END TYPOGRAPHY BLOCK (Left Aligned & Responsive) ── */}
        <motion.div
          className="absolute left-[5%] md:left-[8%] top-[15vh] md:top-[50%] md:-translate-y-1/2 w-[90%] md:w-[45%] max-w-[600px] z-10"
          style={{ opacity: textOpacity, y: textY, filter: textBlur }}
        >
          <div className="text-[clamp(48px,6vw,84px)] font-medium leading-[1.05] text-[#0B0E2D] mb-6 tracking-[-0.02em]">
            <BlurText
              text="Upskill at the speed of shift."
              delay={120}
              animateBy="words"
              direction="top"
            />
          </div>
          <div className="text-[18px] leading-[1.6] mb-[40px] max-w-[440px] font-normal">
            <ShinyText
              text="An enterprise-grade platform designed to align workforce capabilities with business velocity. No fluff, just measurable readiness."
              disabled={false}
              speed={3}
              color="#4B5563"
              shineColor="#0B0E2D"
            />
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <motion.button
              whileHover={{ x: 5 }}
              style={{
                background: 'transparent', color: '#0B0E2D', padding: '0',
                border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '16px',
                display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #0B0E2D', paddingBottom: '4px'
              }}
            >
              Explore Platform <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── 🃏 BIG CARD SWAP COMPONENT (Responsive & explicitly pulled down) ── */}
        <motion.div
          className="absolute right-[5%] md:right-[5%] top-[55vh] md:top-[56%] md:-translate-y-1/2 w-[90%] md:w-[45vw] aspect-video z-15 flex items-center justify-center pointer-events-none"
          style={{ opacity: cardSwapOpacity, y: cardSwapY }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardSwap
              width={'100%'}
              height={'100%'}
              cardDistance={40}
              verticalDistance={40}
              delay={3500}
              pauseOnHover
              skewAmount={0}
            >
              {['/img1.jpg', '/img2.jpg', '/img3.jpg'].map((src, idx) => (
                <Card key={idx} style={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255, 255, 255, 0.8)', 
                  background: 'rgba(255, 255, 255, 0.5)', 
                  backdropFilter: 'blur(32px)', 
                  WebkitBackdropFilter: 'blur(32px)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)',
                  padding: '12px',
                  display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(255,255,255,0.2) 0%, transparent 60%)', zIndex: 1, pointerEvents: 'none' }} />
                    <img src={src} alt={`Platform Capability ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </motion.div>

        {/* ── 🎬 THE CINEMATIC VIDEO OBJECT (Drops from top) ── */}
        <motion.div style={{
          position: 'absolute',
          width: '100vw', height: '100vh', y: videoY, scale: videoScale,
          borderRadius: 0, // Hardcoded to 0 to prevent costly scroll-repaints
          overflow: 'hidden', zIndex: 30, // Higher than cards so it covers them on the way down
          boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)',
          backgroundColor: '#FFF',
          willChange: 'transform',
          WebkitTransform: 'translateZ(0)', // Force GPU hardware compositing
        }}>
          <motion.video
            autoPlay loop muted playsInline
            src="/video.mp4"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Subtle interior shadow to frame the video cleanly */}
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3)', pointerEvents: 'none' }} />

          {/* ── 💻 DASHBOARD REVEAL (Appears on Fullscreen) ── */}
          <motion.div style={{
            position: 'absolute', bottom: '8%', left: '8%', right: '8%',
            opacity: uiOpacity, y: uiY,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            zIndex: 30
          }}>
            {/* Left Stat Widget */}
            <div style={{
              background: 'rgba(20, 20, 20, 0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '24px',
              width: '320px', color: '#FFF', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px' }}><Activity size={18} color="#FFFFFF" /></div>
                <span style={{ fontSize: '13px', color: '#E4E4E7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Skill Readiness</span>
              </div>
              <div style={{ fontSize: '42px', fontWeight: 400, letterSpacing: '-0.02em', color: '#FFFFFF' }}>84.2<span style={{ fontSize: '24px', color: '#A1A1AA' }}>%</span></div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', marginTop: '16px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '84%', height: '100%', background: '#FFFFFF' }} />
              </div>
            </div>

            {/* Right Action Widget */}
            <div style={{
              background: 'rgba(20, 20, 20, 0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '8px 24px 8px 8px',
              display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Play size={20} fill="#050505" color="#050505" style={{ marginLeft: '4px' }} />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>Play Showreel</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
