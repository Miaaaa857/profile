export default function About({ data, stats }) {
  const persona = data
  const statGroups = [stats.slice(0, 2), stats.slice(2, 4)]

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
          <figure className="persona-portrait" data-reveal>
            <img src={persona.portrait} alt={`${persona.name} 人物画像`} />
            <div className="persona-overlay">
              {statGroups.map((group, groupIndex) => (
                <div className="persona-stat-panel" key={groupIndex}>
                  {group.map((stat) => (
                    <div className="persona-mini-stat" key={stat.label}>
                      <strong>{stat.value}{stat.suffix}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
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
