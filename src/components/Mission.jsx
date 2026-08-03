import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Mission.css'

const missionCases = [
  {
    eyebrow: 'AI 交互',
    title: '拆解：豆包为什么用流式输出，而不是等全部生成完',
    summary: '流式输出不只是快，它在管理用户的等待焦虑——一个交互决策背后的产品心理学。',
    image: '/media/portfolio/page-39.jpg',
    href: '/projects/qinrive',
  },
  {
    eyebrow: 'AI 产品设计',
    title: '拆解：当 AI 会答错，产品该怎么设计',
    summary: '幻觉无法根除，好的 AI 产品不是假装模型不会错，而是设计好“错了之后”的路径。',
    image: '/media/portfolio/page-06.jpg',
    href: '/projects/fatelinked',
  },
  {
    eyebrow: 'AI 场景',
    title: '拆解：为什么大部分 AI 功能没人用',
    summary: '不是技术不行，是产品把“模型能做”当成了“用户想要”——一个常见的伪需求陷阱。',
    image: '/media/portfolio/page-18.jpg',
    href: '/projects/pulsebeat',
  },
]

export default function Mission() {
  const [activeIndex, setActiveIndex] = useState(0)

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + missionCases.length) % missionCases.length)
  }

  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="container mission-heading" data-reveal>
        <p className="mission-kicker">MY THINKING</p>
        <div className="mission-heading__grid">
          <h2 id="mission-title">我怎么看<br /><span>AI 产品</span></h2>
          <p>模型能做到的，和用户愿意用的，中间差着一整个产品。这里是我对这个“差距”的一些拆解。</p>
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
              <img src={item.image} alt="" />
              <div className="mission-card__overlay" />
              <div className="mission-card__content">
                <p>{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p className="mission-card__summary">{item.summary}</p>
                <Link to={item.href}>阅读全文 <span aria-hidden="true">↘</span></Link>
              </div>
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
