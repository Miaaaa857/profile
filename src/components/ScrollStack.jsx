import { useCallback, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import '../styles/ScrollStack.css'

export function ScrollStackItem({ children, itemClassName = '' }) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) {
  const scrollerRef = useRef(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef(null)
  const cardsRef = useRef([])
  const lastTransformsRef = useRef(new Map())
  const isUpdatingRef = useRef(false)

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value)
  }, [])

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight }
    }
    const scroller = scrollerRef.current
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: scroller?.clientHeight ?? window.innerHeight,
    }
  }, [useWindowScroll])

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        let offsetTop = 0
        let currentElement = element

        while (currentElement) {
          offsetTop += currentElement.offsetTop || 0
          currentElement = currentElement.offsetParent
        }

        return offsetTop
      }
      return element.offsetTop
    },
    [useWindowScroll],
  )

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return
    isUpdatingRef.current = true

    const { scrollTop, containerHeight } = getScrollData()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)
    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end')
    const endElementTop = endElement ? getElementOffset(endElement) : 0

    cardsRef.current.forEach((card, index) => {
      const cardTop = getElementOffset(card)
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinEnd = endElementTop - containerHeight / 2
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + index * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        cardsRef.current.forEach((candidate, candidateIndex) => {
          const candidateTrigger =
            getElementOffset(candidate) - stackPositionPx - itemStackDistance * candidateIndex
          if (scrollTop >= candidateTrigger) topCardIndex = candidateIndex
        })
        if (index < topCardIndex) blur = (topCardIndex - index) * blurAmount
      }

      let translateY = 0
      if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index
      }

      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }
      const previousTransform = lastTransformsRef.current.get(index)
      const hasChanged =
        !previousTransform ||
        Math.abs(previousTransform.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previousTransform.blur - nextTransform.blur) > 0.1

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`
        card.style.filter = nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : ''
        lastTransformsRef.current.set(index, nextTransform)
      }

      if (index === cardsRef.current.length - 1) {
        const isInView = scrollTop >= triggerStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })

    isUpdatingRef.current = false
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    getElementOffset,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return undefined

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'))
    cardsRef.current = cards
    cards.forEach((card, index) => {
      if (index < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translateZ(0)'
    })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = useWindowScroll
      ? new Lenis({
          duration: 1.05,
          smoothWheel: true,
          touchMultiplier: 1.4,
          wheelMultiplier: 1,
          lerp: 0.12,
          syncTouch: true,
        })
      : new Lenis({
          wrapper: scroller,
          content: scroller.querySelector('.scroll-stack-inner'),
          duration: 1.05,
          smoothWheel: true,
          touchMultiplier: 1.4,
          wheelMultiplier: 1,
          lerp: 0.12,
          syncTouch: true,
        })

    lenis.on('scroll', updateCardTransforms)

    const animate = (time) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    window.addEventListener('resize', updateCardTransforms)
    updateCardTransforms()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', updateCardTransforms)
      lenis.destroy()
      stackCompletedRef.current = false
      cardsRef.current = []
      lastTransformsRef.current.clear()
      isUpdatingRef.current = false
    }
  }, [itemDistance, updateCardTransforms, useWindowScroll])

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-scroller--window' : ''} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  )
}
