'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import dynamic from 'next/dynamic'

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false })

const SECTION_HEIGHT = 1500

export default function HeroV1() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <div style={{
        height: `calc(${SECTION_HEIGHT}px + 100vh)`,
        position: 'relative', width: '100%',
      }}>

        {/* Single sticky viewport: expanding image + side ornaments */}
        <PinnedViewport />

        {/* Parallax images — own flow section after the sticky 100vh */}
        <ParallaxImages />

        {/* Bottom fade to page bg */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 384,
          background: 'linear-gradient(to bottom, transparent, #FFFFFF)',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Sticky viewport — holds the expanding image + side decor.
   Using ONE sticky parent so all children share the pin.
   ───────────────────────────────────────────────────────────── */
function PinnedViewport() {
  const { scrollY } = useScroll()

  /* Side decor fades before the polygon expands far enough to cover it */
  const decorOpacity = useTransform(scrollY, [0, 700], [1, 0])

  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>

      {/* ── LiquidEther fluid — same as HeroV2 ── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.72 }}>
        <LiquidEther
          mouseForce={12} cursorSize={70}
          iterationsPoisson={8} iterationsViscous={8}
          isViscous={false} viscous={20}
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          autoDemo autoSpeed={0.15} autoIntensity={1.0}
          isBounce={false} resolution={0.2}
        />
      </div>

      {/* Lavender overlay so fluid stays subtle */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.38)' }} />

      {/* Expanding clip-path image — absolute so it doesn't push siblings */}
      <ExpandingImage scrollY={scrollY} />

      {/* Left + right side ornaments */}
      <SideDecor opacity={decorOpacity} />
    </div>
  )
}

/* ── Expanding clip-path image ─────────────────────────────── */
function ExpandingImage({ scrollY }: { scrollY: MotionValue<number> }) {
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0])
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100])
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`

  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ['170%', '100%'])
  const opacity        = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0])

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        clipPath, backgroundSize, opacity,
        backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}

/* ── Left + right side ornaments ──────────────────────────
   Bold editorial side labels — visible, readable, sized to
   own the narrow cream zones beside the initial polygon.
   Fade out as the expanding image covers the side areas.
 ─────────────────────────────────────────────────────────── */
function SideDecor({ opacity }: { opacity: MotionValue<number> }) {
  const col: React.CSSProperties = {
    position: 'absolute', top: 0, bottom: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', pointerEvents: 'none',
    width: '5vw', minWidth: 44,
  }
  const line: React.CSSProperties = {
    width: 1.5, background: 'rgba(11,14,45,0.18)',
  }
  const tag: React.CSSProperties = {
    fontSize: 13, fontWeight: 800, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: 'rgba(11,14,45,0.5)',
    whiteSpace: 'nowrap',
  }

  return (
    <>
      {/* ── LEFT ── */}
      <motion.div style={{ ...col, left: '3vw', opacity }}>
        <div style={{ ...line, height: '15vh' }} />

        <span style={{ ...tag, transform: 'rotate(-90deg)', margin: '18px 0' }}>
          Enterprise
        </span>

        <div style={{ ...line, height: '6vh' }} />

        <span style={{ ...tag, transform: 'rotate(-90deg)', margin: '18px 0' }}>
          Learning
        </span>

        <div style={{ ...line, flex: 1 }} />

        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          color: 'rgba(11,14,45,0.3)', transform: 'rotate(-90deg)',
          whiteSpace: 'nowrap', margin: '16px 0',
        }}>
          ↓ Scroll
        </span>

        <div style={{ ...line, height: '8vh' }} />
      </motion.div>

      {/* ── RIGHT ── */}
      <motion.div style={{ ...col, right: '3vw', opacity }}>
        <div style={{ ...line, height: '15vh' }} />

        <span style={{ ...tag, transform: 'rotate(90deg)', margin: '18px 0' }}>
          MapleLMS
        </span>

        <div style={{ ...line, height: '6vh' }} />

        <span style={{ ...tag, transform: 'rotate(90deg)', margin: '18px 0' }}>
          2025
        </span>

        <div style={{ ...line, flex: 1 }} />

        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          color: 'rgba(11,14,45,0.3)', transform: 'rotate(90deg)',
          whiteSpace: 'nowrap', margin: '16px 0',
        }}>
          Explore ↑
        </span>

        <div style={{ ...line, height: '8vh' }} />
      </motion.div>
    </>
  )
}

/* ── Parallax images ───────────────────────────────────────── */
function ParallaxImages() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '200px 16px 0' }}>
      <ParallaxImg
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop"
        alt="Professional learning" start={-200} end={200}
        style={{ width: '33%' }}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=900&auto=format&fit=crop"
        alt="Team collaboration" start={200} end={-250}
        style={{ width: '60%', margin: '0 auto' }}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=900&auto=format&fit=crop"
        alt="Digital workspace" start={-200} end={200}
        style={{ width: '33%', marginLeft: 'auto' }}
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop"
        alt="Enterprise skills" start={0} end={-500}
        style={{ width: '42%', marginLeft: '6rem' }}
      />
    </div>
  )
}

function ParallaxImg({ src, alt, start, end, style }: {
  src: string; alt: string; start: number; end: number; style: React.CSSProperties
}) {
  const ref = useRef<HTMLImageElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  })
  const opacity   = useTransform(scrollYProgress, [0.75, 1], [1, 0])
  const scale     = useTransform(scrollYProgress, [0.75, 1], [1, 0.85])
  const y         = useTransform(scrollYProgress, [0, 1], [start, end])
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`

  return (
    <motion.img
      ref={ref} src={src} alt={alt}
      style={{ ...style, transform, opacity, display: 'block' }}
    />
  )
}
