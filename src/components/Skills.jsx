import { useState } from 'react'

export default function Skills({ items, copy }) {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const active = hovered ?? selected
  const activeItem = items[active ?? 0] ?? items[0]

  return (
    <section className="section skills" id="skills">
      <div className="container section-heading">
        <div className="module-heading__main">
          <div className="module-heading__label"><p className="eyebrow">{copy.skillsEyebrow}</p></div>
          <h2>{copy.skillsTitle.join('')}</h2>
        </div>
        <p>{copy.skillsIntro}</p>
      </div>
      <div className="container skills-showcase">
        <div className="skills-list">
          {items.map((item, i) => (
            <button
              className={`skill-row cursor-target ${active === i ? 'is-active' : ''}`}
              key={item.number}
              type="button"
              aria-pressed={selected === i}
              onClick={() => {
                if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                  setSelected((current) => current === i ? null : i)
                }
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => {
                if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                  setHovered(i)
                }
              }}
              onBlur={() => setHovered(null)}
            >
              <span className="skill-arrow" aria-hidden="true">→</span>
              <span className="skill-title">
                <span>{item.title}</span>
                <sup>[{item.number}]</sup>
              </span>
            </button>
          ))}
        </div>

        <aside
          className={`skill-preview ${active !== null ? 'is-visible' : ''}`}
          style={{ '--skill-index': active ?? 0 }}
          aria-live="polite"
          aria-hidden={active === null}
        >
          <div className="skill-preview__content" key={activeItem.number}>
            <img src={activeItem.image} alt={`${activeItem.title}作品预览`} />
            <p className="skill-preview__meta"><span>＋</span>{activeItem.title}</p>
            <p className="skill-preview__description">{activeItem.description}</p>
            <span className="skill-preview__tool">{activeItem.tool}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
