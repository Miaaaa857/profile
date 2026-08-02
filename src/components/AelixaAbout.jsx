const metrics = [
  { value: '5', suffix: '+', label: 'Partner Brands', note: 'We’ve partnered with ambitious teams across product, technology, and culture.' },
  { value: '120', suffix: '+', label: 'Brands worked with', note: 'Trusted by startups, scale-ups, and established global teams.' },
  { value: '3.8', suffix: '×', label: 'Average ROAS', note: 'A consistent return created through clear thinking and focused execution.' },
  { value: '98', suffix: '%', label: 'Client retention rate', note: 'Long-term partnerships built on trust, clarity, and measurable progress.' },
]

const approachCards = [
  {
    index: '01',
    title: 'Revenue-linked reporting',
    text: 'Every decision connects back to a useful outcome. No vanity metrics and no decoration without purpose.',
  },
  {
    index: '02',
    title: 'Compounding channel strategy',
    text: 'Research, product thinking, visual design, and delivery work as one connected system.',
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
                <h2 id="aa-results-title">Measured By<br />Real Results</h2>
              </div>
              <p>From scaling startups to optimizing established brands, these numbers reflect my commitment to excellence and growth.</p>
            </div>
            <div className="aa-results__copy" data-reveal>
              <p>I started Meridian after years of watching brands invest in work that looked busy but moved nothing. The problem was rarely effort — it was clarity.</p>
              <p>Before Meridian, I worked across paid media, SEO, and conversion strategy for startups and established teams. That experience taught me to understand the business first, then choose the channels.</p>
              <p>Today I work directly with a small number of ambitious brands, bringing strategy and execution together. Not separate services. One direction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="aa-approach" aria-labelledby="aa-approach-title">
        <div className="container aa-approach__grid">
          <div className="aa-approach__content">
            <div className="aa-section-title" data-reveal>
              <p className="aa-kicker">MY APPROACH</p>
              <h2 id="aa-approach-title">Strategist-Led,<br />Built On Data</h2>
            </div>
            <p className="aa-approach__intro" data-reveal>I bridge the gap between creative vision and business objectives, ensuring every detail serves a specific purpose in the journey.</p>
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
