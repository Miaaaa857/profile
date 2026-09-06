import Prism from './Prism/Prism'

export default function Hero({ data, copy }) {
  return (
    <section className="hero" id="home">
      <div className="hero-media" aria-hidden="true">
        <Prism
          animationType="rotate"
          timeScale={0.3}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0.2584}
          colorFrequency={1}
          noise={0.1}
          glow={1}
          suspendWhenOffscreen
        />
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
              <a className="button button--accent" href="#projects"><span className="button__label">{copy.heroPrimary}</span><span className="button__arrow">→</span></a>
              <a className="button button--light" href={copy.resumeHref} download="Mia-UI-Designer-Resume.pdf"><span className="button__label">{copy.heroSecondary}</span><span className="button__arrow">→</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">{copy.scroll} <span>↓</span></div>
    </section>
  )
}
