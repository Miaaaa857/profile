import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/TargetCursor.css'

export default function TargetCursor({
  targetSelector = 'a, button, input, textarea, .cursor-target',
  spinDuration = 2.4,
  hoverDuration = 0.28,
  cursorColor,
  cursorColorOnTarget,
}) {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const cornersRef = useRef([])
  const activeTargetRef = useRef(null)

  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
  }, [])

  useEffect(() => {
    if (isTouchDevice || !cursorRef.current) return undefined

    const cursor = cursorRef.current
    const corners = cornersRef.current
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      || '#ff4d24'
    const baseColor = cursorColor || themeColor
    const targetColor = cursorColorOnTarget
      || themeColor
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    document.documentElement.classList.add('target-cursor-active')
    gsap.set(cursor, { x: mouseX, y: mouseY, xPercent: -50, yPercent: -50 })

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power3.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power3.out' })
    const spin = gsap.to(cursor, {
      rotation: 360,
      duration: spinDuration,
      repeat: -1,
      ease: 'none',
    })

    const restPositions = [
      { x: -18, y: -18 },
      { x: 6, y: -18 },
      { x: 6, y: 6 },
      { x: -18, y: 6 },
    ]
    let targetResizeObserver

    const paintCursor = color => {
      gsap.to(corners, { color, borderColor: color, duration: 0.18, overwrite: true })
      gsap.to(dotRef.current, { backgroundColor: color, duration: 0.18, overwrite: true })
    }

    const resetCorners = () => {
      targetResizeObserver?.disconnect()
      activeTargetRef.current = null
      cursor.classList.remove('is-targeting')
      spin.restart()
      paintCursor(baseColor)
      corners.forEach((corner, index) => {
        gsap.to(corner, {
          ...restPositions[index],
          duration: hoverDuration,
          ease: 'power3.out',
          overwrite: true,
        })
      })
    }

    const alignCorners = () => {
      const target = activeTargetRef.current
      if (!target?.isConnected) return

      const rect = target.getBoundingClientRect()
      const positions = [
        { x: rect.left - mouseX - 3, y: rect.top - mouseY - 3 },
        { x: rect.right - mouseX - 9, y: rect.top - mouseY - 3 },
        { x: rect.right - mouseX - 9, y: rect.bottom - mouseY - 9 },
        { x: rect.left - mouseX - 3, y: rect.bottom - mouseY - 9 },
      ]

      corners.forEach((corner, index) => {
        gsap.to(corner, {
          ...positions[index],
          duration: hoverDuration,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }
    targetResizeObserver = new ResizeObserver(() => alignCorners())

    const handleMove = event => {
      mouseX = event.clientX
      mouseY = event.clientY
      moveX(mouseX)
      moveY(mouseY)
      if (activeTargetRef.current) alignCorners()
    }

    const handleOver = event => {
      const target = event.target.closest?.('.cursor-target')
        || event.target.closest?.(targetSelector)
      if (!target || target === activeTargetRef.current) return
      targetResizeObserver.disconnect()
      activeTargetRef.current = target
      targetResizeObserver.observe(target)
      cursor.classList.add('is-targeting')
      spin.pause()
      gsap.to(cursor, { rotation: 0, duration: hoverDuration, ease: 'power2.out' })
      paintCursor(targetColor)
      alignCorners()
    }

    const handleOut = event => {
      const target = activeTargetRef.current
      if (!target) return
      const next = event.relatedTarget
      if (next && target.contains(next)) return
      resetCorners()
    }

    const handleDown = () => {
      gsap.to(cursor, { scale: 0.9, duration: 0.16 })
      gsap.to(dotRef.current, { scale: 0.65, duration: 0.16 })
    }

    const handleUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 })
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('scroll', alignCorners, { passive: true })
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      document.documentElement.classList.remove('target-cursor-active')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll', alignCorners)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      targetResizeObserver.disconnect()
      gsap.killTweensOf([cursor, dotRef.current, ...corners])
      spin.kill()
    }
  }, [
    cursorColor,
    cursorColorOnTarget,
    hoverDuration,
    isTouchDevice,
    spinDuration,
    targetSelector,
  ])

  if (isTouchDevice) return null

  return (
    <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true">
      <span ref={dotRef} className="target-cursor-dot" style={{ backgroundColor: cursorColor || 'var(--accent)' }} />
      {['tl', 'tr', 'br', 'bl'].map((corner, index) => (
        <span
          key={corner}
          ref={element => { cornersRef.current[index] = element }}
          className={`target-cursor-corner target-cursor-corner--${corner}`}
          style={{
            color: cursorColor || 'var(--accent)',
            borderColor: cursorColor || 'var(--accent)',
          }}
        />
      ))}
    </div>
  )
}
