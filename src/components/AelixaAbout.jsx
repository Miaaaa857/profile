import { useEffect, useRef, useState } from 'react'

const metrics = [
  { value: '38', suffix: '%', label: 'AI 产品留存', note: '围绕核心行为重构首日流程，把 AIGC 社交产品 FateLinked 的 7 日留存做到 38%。' },
  { value: '+22', suffix: '%', label: '电商增长', note: '从漏斗切入而非改首页，让电商平台 PulseBeat 的分销商入驻率提升 22%。' },
  { value: '10', suffix: '+', label: '合作品牌', note: '4 年一线设计，服务过腾讯、OPPO、一加、新华保险等 10 余个知名品牌。' },
  { value: '4', suffix: '', label: '主导项目', note: '从需求到落地，独立主导 4 个从 0 到 1 的产品项目。' },
]

function CountUp({ value }) {
  const nodeRef = useRef(null)
  const prefix = value.startsWith('+') ? '+' : ''
  const target = Number.parseInt(value.replace(/\D/g, ''), 10)
  const [display, setDisplay] = useState(`${prefix}0`)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0

    const play = () => {
      if (reduceMotion) {
        setDisplay(`${prefix}${target}`)
        return
      }

      window.cancelAnimationFrame(animationFrame)
      const startedAt = performance.now()
      const duration = 1200

      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(`${prefix}${Math.round(target * eased)}`)
        if (progress < 1) animationFrame = window.requestAnimationFrame(tick)
      }

      animationFrame = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play()
      else if (!reduceMotion) setDisplay(`${prefix}0`)
    }, { threshold: 0.45 })

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [prefix, target])

  return <span ref={nodeRef}>{display}</span>
}

const capabilityGroups = [
  {
    title: 'AI 产品化',
    level: 'AI Productization',
    items: ['判断 LLM 能力边界，知道什么该交给模型', 'Prompt 设计与迭代，持续调优输出质量', '设计人机协作流程，处理 AI 的不确定性', '用产品设计遮住模型短板、放大长板'],
  },
  {
    title: '产品判断',
    level: 'Product Thinking',
    items: ['从用户流失倒推，找到真正该解决的问题', '懂得砍需求做减法，而不是堆功能', '竞品拆解与真实使用场景挖掘', '用数据验证判断：埋点、漏斗、A/B 测试'],
  },
  {
    title: '设计与实现',
    level: 'Design & Build',
    items: ['精通 Figma、PS、C4D 等主流设计工具', '会写前端，能亲手把想法做成 demo', '4 年一线设计，服务过腾讯、OPPO 等', '懂交互体验，知道用户在哪一步会卡住'],
  },
]

const career = [
  {
    year: '2022–2025',
    role: '视觉设计师',
    company: '广州能动间信息科技有限公司 · 全职',
    text: '服务腾讯、OPPO、一加、新华保险等品牌的设计需求，从规范布局到交互落地。开始用数据衡量设计效果，不只是交付界面。',
    tags: ['UI设计', '增长设计', '大厂协作'],
  },
  {
    year: '2025–2026',
    role: 'UI设计师',
    company: '上海传游网来科技有限公司 · 全职',
    text: '独立主导 PulseBeat（电商，入驻率提升 22%）、QINRIVE（B端官网，决策效率提升 35%）等项目，从需求到落地全程参与。主导 FateLinked（AIGC 智能体社交平台），将 7 日留存做到 38%。第一次深度接触 AI 产品，发现“模型能力”与“用户愿意用”之间的巨大鸿沟。',
    tags: ['AIGC', '留存', 'AI产品'],
  },
  {
    year: '2026',
    role: 'AI产品经理',
    company: '成都地几何科技有限公司 · 外包',
    text: '参与 AI 产品从需求分析、方案设计到原型验证的完整流程，聚焦 LLM 能力边界、用户流程与可用性。结合前端与 API 快速搭建可交互演示，用真实操作验证产品判断并推动方案落地。',
    tags: ['AI产品经理', 'LLM应用', 'Demo验证'],
  },
]

export default function AelixaAbout() {
  return (
    <div className="aelixa-about">
      <section className="aa-hero" aria-labelledby="aa-hero-title">
        <div className="container aa-hero__inner">
          <div className="aa-hero__grid">
            <h1 id="aa-hero-title" className="aa-hero__title">
              <span data-reveal>关于</span>
              <span data-reveal>我</span>
            </h1>

            <div className="aa-hero__meta" data-reveal>
              <p>张明霞·设计出身的AI产品经理<br />联系：<a href="mailto:1124724338@qq.com">1124724338@qq.com</a></p>
            </div>

            <figure className="aa-hero__portrait">
              <img src="/media/portfolio/mia-portrait-gray-v2.png" alt="Aelixa founder portrait" data-reveal />
              <figcaption data-reveal>现居广州<br />开放全职机会</figcaption>
            </figure>

            <div className="aa-hero__statement" data-reveal>
              <p>我关心的不是模型多强，而是用户信不信、<br />用不用、留不留。想要明确、再主导。<br />产品是验证认知的工具。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="aa-approach" aria-label="三层能力模型">
        <header className="container aa-capability-heading" data-reveal>
          <p className="aa-kicker">MY CAPABILITY</p>
          <h2>我的能力，是长出来的</h2>
        </header>

        <div className="container aa-capability-model">
          <figure className="aa-capability-pyramid" data-reveal>
            <img src="/media/capability-pyramid.png" alt="AI 产品化、产品判断与设计实现三层能力金字塔" />
          </figure>

          <div className="aa-capability-details">
            {capabilityGroups.map((group) => (
              <article className="aa-capability-group" key={group.title} data-reveal>
                <h2>{group.title}</h2>
                <div className="aa-capability-group__tags">
                  {[group.items.slice(0, 2), group.items.slice(2, 4)].map((row) => (
                    <div className="aa-capability-group__row" key={row[0]}>
                      {row.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aa-results" aria-labelledby="aa-results-title">
        <div className="container">
          <div className="aa-results__story">
            <div className="aa-results__lead" data-reveal>
              <div className="aa-section-title">
                <p className="aa-kicker aa-kicker--light">PROVEN IMPACT</p>
                <h2 id="aa-results-title">真实成绩，<br />不是漂亮话</h2>
              </div>
            </div>
            <div className="aa-results__copy" data-reveal>
              <p>我不是科班产品经理，也不是算法出身。我的路径是：设计→增长→AI产品。做了4年一线的UI和体验设计，服务于腾讯、OPPO、一加等产品——但我最好的作品不是某个界面，是把一个产品的7日留存实现了38%。</p>
              <p>做生长设计那几年，我养成了看数据说话的习惯：改一个文案而不是变成，调整一个流程而不是漏斗。慢慢发现产品的问题很少是“好不好看”，而是“用户信不信、用不用、留不留”。这个判断把我推向了产品，也推向了AI。</p>
              <p>现在我专注一件事：把LLM的能力，翻译成用户真正会用的产品。模型能实现的，和用户愿意用的，中间差着整个产品——我做的就是补这个差。</p>
            </div>
          </div>

          <div className="aa-metrics">
            {metrics.map((metric) => (
              <article className="aa-metric" key={metric.label} data-reveal>
                <strong aria-label={`${metric.value}${metric.suffix}`}><CountUp value={metric.value} /><em>{metric.suffix}</em></strong>
                <h2>{metric.label}</h2>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="aa-career" aria-labelledby="aa-career-title">
        <div className="aa-career__marquee" aria-hidden="true">
          <div className="aa-career__marquee-track">
            <span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span>
            <span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span><span>从设计到 AI 产品 —</span>
          </div>
        </div>
        <div className="aa-career__body">
          <div className="container">
            <div className="aa-career__heading" data-reveal>
              <div>
                <p className="aa-kicker aa-kicker--light">职业里程碑</p>
                <h2 id="aa-career-title">从视觉设计<br />走向 AI 产品</h2>
              </div>
              <p>一条从视觉设计、数据增长到 AI 产品的职业路径，记录我如何把设计能力转化为产品判断与落地能力。</p>
            </div>

            <div className="aa-career__list">
              {career.map((item, index) => (
                <article className="aa-career-card" key={item.year} style={{ '--career-index': index }}>
                  <p className="aa-career-card__year">{item.year}</p>
                  <div className="aa-career-card__main">
                    <h3>{item.role}</h3>
                    <p className="aa-career-card__company">{item.company}</p>
                  </div>
                  <div className="aa-career-card__detail">
                    <p>{item.text}</p>
                    <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
