export default function About({ data, stats }) {
  const persona = data
  const handlePortraitMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const portrait = event.currentTarget
    const bounds = portrait.getBoundingClientRect()
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10

    portrait.style.setProperty('--portrait-x', `${offsetX}px`)
    portrait.style.setProperty('--portrait-y', `${offsetY}px`)
  }
  const resetPortrait = (event) => {
    event.currentTarget.style.setProperty('--portrait-x', '0px')
    event.currentTarget.style.setProperty('--portrait-y', '0px')
  }

  return (
    <section className="section about persona" id="about">
      <div className="container">
        <header className="persona-header">
          <p className="persona-label eyebrow" data-reveal>
            <span aria-hidden="true" />
            {persona.eyebrow}
          </p>
          <p className="persona-intro" data-reveal>
            {persona.intro.prefix}
            <strong>{persona.intro.highlight}</strong>
            {persona.intro.suffix}
          </p>
        </header>

        <div className="persona-layout">
          <figure
            className="persona-portrait"
            data-reveal
            onPointerMove={handlePortraitMove}
            onPointerLeave={resetPortrait}
          >
            <div className="persona-portrait-media">
              <video
                src={persona.portraitVideo}
                poster={persona.portrait}
                aria-label={`${persona.name} 人物动态画像`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
            <div className="persona-overlay">
              {stats.map((stat) => (
                <div className="persona-stat-panel" key={stat.label}>
                  <strong>
                    {stat.prefix}{stat.value}
                    <span className="persona-stat-suffix">{stat.suffix}</span>
                  </strong>
                  <p>{stat.label}</p>
                  <span className="persona-stat-tag">
                    {stat.note}
                  </span>
                </div>
              ))}
            </div>
          </figure>

          <div className="persona-cards">
            {persona.cards.map((card) => (
              <article className="persona-card" data-reveal key={card.index}>
                <header>
                  <span>{card.index}</span>
                  <h3>{card.title}</h3>
                </header>
                <ul>
                  {card.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
