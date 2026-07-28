import { useEffect, useRef } from 'react'

export default function Hero({ data, copy }) {
  const mediaRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const video = mediaRef.current?.querySelector('video')
      if (video) video.style.transform = `translate3d(0, ${Math.min(window.scrollY * .08, 54)}px, 0) scale(1.04)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section className="hero" id="home">
      <div className="hero-media" ref={mediaRef} aria-hidden="true">
        <video muted autoPlay loop playsInline poster={data.media.poster}>{data.media.src && <source src={data.media.src} />}</video>
        <div className="hero-media__mesh" />
        <span className="hero-media__note">{copy.showreel}</span>
      </div>
      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow" data-reveal>{data.eyebrow}</p>
        <h1 className="hero-title" data-reveal>
          <span>{data.title[0]}</span><span className="display-emphasis">{data.title[1]}</span>
        </h1>
        <div className="hero-bottom" data-reveal>
          <div className="hero-tags">{data.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="hero-intro">
            <p>{data.description}</p>
            <div className="button-row">
              <a className="button button--accent" href="#projects">{copy.heroPrimary} <span>↓</span></a>
              <a className="button button--light" href="#contact">{copy.heroSecondary} <span>↗</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">{copy.scroll} <span>↓</span></div>
    </section>
  )
}
