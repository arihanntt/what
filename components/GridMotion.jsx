'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './GridMotion.css'

const GridMotion = ({ items = [], gradientColor = 'rgba(240,236,228,0)' }) => {
  const gridRef = useRef(null)
  const rowRefs = useRef([])
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 800)

  const totalItems = 28
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Portfolio ${index + 1}`)
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = e => {
      mouseXRef.current = e.clientX
    }

    const updateMotion = () => {
      const maxMoveAmount = 200
      const baseDuration = 0.8
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto'
          })
        }
      })
    }

    const removeAnimationLoop = gsap.ticker.add(updateMotion)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      removeAnimationLoop()
    }
  }, [])

  return (
    <div className="noscroll" ref={gridRef}>
      <section className="gm-intro" style={{ background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)` }}>
        <div className="gridMotion-container">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="gm-row" ref={el => (rowRefs.current[rowIndex] = el)}>
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex]
                return (
                  <div key={itemIndex} className="gm-row__item">
                    <div className="gm-row__item-inner">
                      {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/')) ? (
                        <div className="gm-row__item-img" style={{ backgroundImage: `url(${content})` }} />
                      ) : (
                        <div className="gm-row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default GridMotion
