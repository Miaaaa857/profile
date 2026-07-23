import { useState } from 'react'

export default function Skills({ items, copy }) {
  const [selected, setSelected] = useState(-1)
  const [hovered, setHovered] = useState(null)
  const active = hovered ?? selected
  return (
    <section className="section skills" id="skills">
      <div className="container section-heading" data-reveal>
        <div className="module-heading__main">
          <div className="module-heading__label"><p className="eyebrow">{copy.skillsEyebrow}</p><span className="section-index">( 02 )</span></div>
          <h2>{copy.skillsTitle.join('')}</h2>
        </div>
        <p>{copy.skillsIntro}</p>
      </div>
      <div className="skills-list">
        {items.map((item, i) => (
          <article className={`skill-row ${active === i ? 'is-active' : ''}`} key={item.number} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <button onClick={() => setSelected(selected === i ? -1 : i)} aria-expanded={active === i}>
              <span className="skill-number">[{item.number}]</span><h3>{item.title}</h3><span className="skill-tool">{item.tool}</span><span className="skill-icon">{active === i ? '−' : '+'}</span>
            </button>
            <div className="skill-details"><p>{item.description}</p><img src={item.image} alt="" /></div>
          </article>
        ))}
      </div>
    </section>
  )
}
