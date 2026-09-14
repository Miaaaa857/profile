import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Mission.css'
import { insights as missionCases } from '../data/insights'

export default function Mission() {
  const [activeIndex, setActiveIndex] = useState(0)

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + missionCases.length) % missionCases.length)
  }

  return (
    <section className="mission" id="thinking" aria-labelledby="mission-title">
      <div className="container mission-heading" data-reveal>
        <p className="eyebrow mission-kicker">MY THINKING</p>
        <div className="mission-heading__grid">
          <h2 id="mission-title">我怎么看<br /><span>AI产品</span></h2>
          <p>模型能做到的，和用户愿意用的，中间差着一整个产品。这里是我对这个「差距」的一些拆解。</p>
        </div>
      </div>

      <div className="mission-carousel">
        <div className="mission-slider container">
          <div className="mission-track" data-active={activeIndex}>
          {missionCases.map((item, itemIndex) => (
            <article
              className="mission-card"
              data-index={String(itemIndex + 1).padStart(2, '0')}
              key={item.eyebrow}
            >
              <Link
                className="mission-card__link"
                to={`/insights/${item.slug}`}
                aria-label={`阅读全文：${item.title}`}
              >
                <img src={item.image} alt="" />
                <div className="mission-card__overlay" />
                <div className="mission-card__content">
                  <p>{item.eyebrow}</p>
                  <h3>{item.cardTitle ?? item.title}</h3>
                  <p className="mission-card__summary">{item.summary}</p>
                  <span className="mission-card__cta">阅读全文 <span aria-hidden="true">↘</span></span>
                </div>
              </Link>
            </article>
          ))}
          </div>
        </div>
        <div className="mission-controls container" aria-label="文章轮播控制">
          <button type="button" onClick={() => move(-1)} aria-label="查看上一篇">←</button>
          <button type="button" onClick={() => move(1)} aria-label="查看下一篇">→</button>
        </div>
      </div>

    </section>
  )
}
