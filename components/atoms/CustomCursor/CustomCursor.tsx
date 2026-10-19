'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './CustomCursor.module.scss'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return

    const frameId = requestAnimationFrame(() => {
      setEnabled(true)
    })

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Check if target or parent has data-cursor
      let target = e.target as HTMLElement | null
      let text = ''
      let active = false

      while (target && target !== document.body) {
        if (target.dataset && target.dataset.cursor) {
          text = target.dataset.cursor
          active = true
          break
        }
        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.role === 'button'
        ) {
          active = true
          if (!text) {
            text = target.tagName === 'A' ? 'OPEN' : 'CLICK'
          }
        }
        target = target.parentElement
      }

      setCursorText(text)
      setIsHovered(active)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Smooth animation loop for ring inertia
    let animId: number
    const loop = () => {
      // Linear interpolation (lerp) for smooth trailing
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animId)
      cancelAnimationFrame(frameId)
    }
  }, [isVisible])

  if (!enabled) return null

  return (
    <div
      className={`${styles.cursorContainer} ${isVisible ? styles.visible : ''}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className={styles.dot} />
      <div
        ref={ringRef}
        className={`${styles.ring} ${isHovered ? styles.ringHovered : ''} ${cursorText ? styles.hasText : ''}`}
      >
        {cursorText && <span className={styles.label}>{cursorText}</span>}
      </div>
    </div>
  )
}
