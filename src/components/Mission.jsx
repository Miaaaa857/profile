import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Mission.css'

const missionCases = [
  {
    eyebrow: 'HYPERSCALE SAAS',
    title: 'Driving 150% Organic Growth via SEO',
    image: '/media/portfolio/page-39.jpg',
    href: '/projects/qinrive',
  },
  {
    eyebrow: 'LUMINARY AESTHETICS',
    title: 'Redefining Luxury Through Social Strategy',
    image: '/media/portfolio/page-06.jpg',
    href: '/projects/fatelinked',
  },
  {
    eyebrow: 'NEXUS CONSULTING',
    title: 'A Data-Driven Path to Market Dominance',
    image: '/media/portfolio/page-18.jpg',
    href: '/projects/pulsebeat',
  },
]

const missionValues = [
  {
    icon: '◎',
    title: 'Market Fluidity',
    text: 'In an era of rapid digital evolution, we ensure your brand remains agile and responsive, adapting seamlessly to shifting consumer behaviors and emerging market trends.',
  },
  {
    icon: '⇄',
    title: 'Integrated Ecosystems',
    text: 'We specialize in unifying disparate digital channels—from SEO to social—into a singular, cohesive growth engine designed to maximize efficiency and brand consistency.',
  },
  {
    icon: '↗',
    title: 'Data Clarity',
    text: 'Beyond basic metrics, we distill complex market data into clear, actionable insights, empowering your business to make informed decisions that drive long-term profitability.',
  },
]

export default function Mission() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const carouselCases = useMemo(() => {
    if (activeIndex < 2) return missionCases
    return [missionCases[1], missionCases[2], missionCases[0]]
  }, [activeIndex])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const activeCard = track.querySelector('[data-active="true"]')
    if (!activeCard) return

    const left = activeIndex === 0
      ? 0
      : activeCard.offsetLeft - (track.clientWidth - activeCard.clientWidth) / 2
    track.scrollTo({ left, behavior: 'smooth' })
  }, [activeIndex, carouselCases])

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + missionCases.length) % missionCases.length)
  }

  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="container mission-heading" data-reveal>
        <p className="mission-kicker"><span aria-hidden="true">⌁</span> MY MISSION</p>
        <div className="mission-heading__grid">
          <h2 id="mission-title">Transforming Vision<br /><span>into Digital Reality</span></h2>
          <p>I push the boundaries of digital design through constant innovation and focused execution.</p>
        </div>
      </div>

      <div className="mission-carousel">
        <div className={`mission-track${activeIndex === 0 ? ' mission-track--initial' : ''}`} ref={trackRef}>
          {carouselCases.map((item) => {
            const itemIndex = missionCases.indexOf(item)
            return (
            <article className="mission-card" data-active={itemIndex === activeIndex} key={item.eyebrow}>
              <img src={item.image} alt="" />
              <div className="mission-card__overlay" />
              <div className="mission-card__content">
                <p>{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <Link to={item.href}>Explore More <span aria-hidden="true">↘</span></Link>
              </div>
            </article>
            )
          })}
        </div>
        <div className="mission-controls" aria-label="案例轮播控制">
          <button type="button" onClick={() => move(-1)} aria-label="查看上一个案例">←</button>
          <button type="button" onClick={() => move(1)} aria-label="查看下一个案例">→</button>
        </div>
      </div>

      <div className="container mission-values">
        {missionValues.map((item) => (
          <article key={item.title} data-reveal>
            <h3><span aria-hidden="true">{item.icon}</span>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
