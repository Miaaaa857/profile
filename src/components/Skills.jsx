import { useState } from 'react'

export default function Skills({ items, copy }) {
  const [active, setActive] = useState(0)
  return (
    <section className="section skills" id="skills">
      <div className="container section-heading" data-reveal><div><p className="eyebrow">{copy.skillsEyebrow}</p><span className="section-index">( 02 )</span></div><h2>{copy.skillsTitle[0]}<br /><i className="display-emphasis">{copy.skillsTitle[1]}</i></h2><p>{copy.skillsIntro}</p></div>
      <div className="skills-list">
        {items.map((item, i) => (
          <article className={`skill-row ${active === i ? 'is-active' : ''}`} key={item.number} onMouseEnter={() => setActive(i)}>
            <button onClick={() => setActive(active === i ? -1 : i)} aria-expanded={active === i}>
              <span className="skill-number">[{item.number}]</span><h3>{item.title}</h3><span className="skill-tool">{item.tool}</span><span className="skill-icon">{active === i ? '−' : '+'}</span>
            </button>
            <div className="skill-details"><p>{item.description}</p><img src={item.image} alt="" /></div>
          </article>
        ))}
      </div>
    </section>
  )
}
