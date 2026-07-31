export default function About({ data, stats }) {
  const handlePortraitMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const portrait = event.currentTarget
    const bounds = portrait.getBoundingClientRect()
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8

    portrait.style.setProperty('--portrait-x', `${offsetX}px`)
    portrait.style.setProperty('--portrait-y', `${offsetY}px`)
  }

  const resetPortrait = (event) => {
    event.currentTarget.style.setProperty('--portrait-x', '0px')
    event.currentTarget.style.setProperty('--portrait-y', '0px')
  }

  return (
    <section className="section persona" id="about">
      <div className="container persona-shell">
        <header className="persona-hero">
          <p className="eyebrow persona-kicker" data-reveal>{data.eyebrow}</p>
          <h2 data-reveal>{data.headline.join('')}</h2>
        </header>

        <div className="persona-profile">
          <figure
            className="persona-avatar"
            data-reveal
            onPointerMove={handlePortraitMove}
            onPointerLeave={resetPortrait}
          >
            <img src={data.portrait} alt={`${data.name} 人物头像`} />
          </figure>

          <div className="persona-details" data-reveal>
            <h3>
              <span>Who is </span>
              <strong>张明霞?</strong>
            </h3>
            <p className="persona-bio">{data.bio}</p>

            <div className="persona-metrics" aria-label="个人项目数据">
              {stats.map((stat) => (
                <div className="persona-metric" key={stat.label}>
                  <strong>
                    {stat.value}
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </strong>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>

            <a className="persona-more" href="#skills">
              <span className="persona-more__arrow" aria-hidden="true">→</span>
              <span className="persona-more__label">{data.buttonLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
