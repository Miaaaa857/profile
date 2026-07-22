import { useEffect, useRef, useState } from 'react'

function Stat({ item }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now(); const duration = 1200
      const tick = (now) => { const p = Math.min((now - start) / duration, 1); setValue(Math.round(item.value * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick); observer.disconnect()
    }, { threshold: .5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [item.value])
  return <div className="stat" ref={ref}><strong>{value}{item.suffix}</strong><p>{item.label}</p><span>{item.note}</span></div>
}

export default function Stats({ items, ariaLabel }) {
  return <section className="stats container" aria-label={ariaLabel}>{items.map((item) => <Stat item={item} key={item.label} />)}</section>
}
