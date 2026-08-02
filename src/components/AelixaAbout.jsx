const metrics = [
  { value: '38', suffix: '%', label: 'AI 产品留存', note: '围绕核心行为重构首日流程，把 AIGC 社交产品 FateLinked 的 7 日留存做到 38%。' },
  { value: '+22', suffix: '%', label: '电商增长', note: '从漏斗切入而非改首页，让电商平台 PulseBeat 的分销商入驻率提升 22%。' },
  { value: '10', suffix: '+', label: '合作品牌', note: '4 年一线设计，服务过腾讯、OPPO、一加、新华保险等 10 余个知名品牌。' },
  { value: '4', suffix: '', label: '主导项目', note: '从需求到落地，独立主导 4 个从 0 到 1 的产品项目。' },
]

const approachCards = [
  {
    index: '01',
    title: '从用户流失倒推',
    text: '我看产品的第一视角是“用户在哪一步放弃”。这是设计背景给我的直觉——不是猜测，是看漏斗、看埋点，找到真正该动的那一步。',
  },
  {
    index: '02',
    title: '模型能力与用户意愿之间',
    text: 'AI产品的难点不是模型强不强，而是用户不信、用不着。我关注的是如何设计人机协作流程，让模型的能力真正被用起来。',
  },
  {
    index: '03',
    title: '能力验证',
    text: '我的想法倾向于先做出来再讨论。会写前端、能调整API，一个能点开的演示比十页PRD更有说服力。',
  },
]

const career = [
  {
    year: '2020',
    role: 'Performance Marketing Specialist',
    company: 'E-commerce Brand · Full-time',
    text: 'Started managing Google and Meta campaigns for a mid-sized e-commerce brand. Learned fast — cut wasted spend by 30% in the first quarter and rebuilt the entire campaign architecture from scratch.',
    tags: ['Google Ads', 'Google Ads', 'Google Ads'],
  },
  {
    year: '2021',
    role: 'Senior Growth Marketer',
    company: 'B2B SaaS Startup · Full-time',
    text: 'Took sole ownership of SEO, content, and paid channels at a VC-backed SaaS startup. Built the organic program from zero — no prior rankings, no existing content — to 40,000 monthly visitors in 14 months.',
    tags: ['SEO', 'Content Strategy', 'SaaS'],
  },
  {
    year: '2022',
    role: 'Independent Marketing Consultant',
    company: 'Multiple Clients · Contract',
    text: 'Ran full-channel marketing for three brands simultaneously — a D2C health brand, a fintech startup, and a regional retailer. Managed everything from strategy to weekly execution across paid, organic, and email.',
    tags: ['Multi-channel', 'D2C', 'Fintech', 'Email'],
  },
  {
    year: '2023',
    role: 'Founded Meridian',
    company: 'Meridian Digital Strategy · Founder',
    text: 'Left contract work to build a proper practice. The idea was simple — fewer clients, deeper work, and results that actually move the business. No account managers, no handoffs, no vanity metrics.',
    tags: ['Meridian · Founded', 'Strategy-first'],
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

      <section className="aa-results" aria-labelledby="aa-results-title">
        <div className="container">
          <div className="aa-metrics">
            {metrics.map((metric) => (
              <article className="aa-metric" key={metric.label} data-reveal>
                <strong><span>{metric.value}</span><em>{metric.suffix}</em></strong>
                <h2>{metric.label}</h2>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>

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
        </div>
      </section>

      <section className="aa-approach" aria-labelledby="aa-approach-title">
        <div className="container aa-approach__grid">
          <div className="aa-approach__content">
            <div className="aa-section-title" data-reveal>
              <p className="aa-kicker">我的方法</p>
              <h2 id="aa-approach-title">设计出身，<br />数据驱动</h2>
            </div>
            <div className="aa-approach__cards">
              {approachCards.map((card) => (
                <article className="aa-approach-card" key={card.index} data-reveal>
                  <span>{card.index}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>

          <figure className="aa-approach__visual" data-reveal>
            <img src="/media/portfolio/page-39.jpg" alt="Strategy and product design work" />
            <figcaption>
              <span>Organic traffic</span>
              <strong>+240%</strong>
              <p>Compounding growth from a strategy built once and improved every month.</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="aa-career" aria-labelledby="aa-career-title">
        <div className="aa-career__marquee" aria-hidden="true">
          <div className="aa-career__marquee-track">
            <span>Years of experience —</span><span>Years of experience —</span><span>Years of experience —</span><span>Years of experience —</span>
          </div>
        </div>
        <div className="aa-career__body">
          <div className="container">
            <div className="aa-career__heading" data-reveal>
              <div>
                <p className="aa-kicker aa-kicker--light">CAREER MILESTONES</p>
                <h2 id="aa-career-title">A Journey of<br />Strategic Growth</h2>
              </div>
              <p>A timeline of professional experience, showcasing the diverse industries and challenges tackled over the years.</p>
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
