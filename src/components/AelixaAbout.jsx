const metrics = [
  { value: '5+', label: 'Partner Brands', note: 'We’ve partnered with ambitious teams across product, technology, and culture.' },
  { value: '120+', label: 'Brands worked with', note: 'Trusted by startups, scale-ups, and established global teams.' },
  { value: '3.8×', label: 'Average ROAS', note: 'A consistent return created through clear thinking and focused execution.' },
  { value: '98%', label: 'Client retention rate', note: 'Long-term partnerships built on trust, clarity, and measurable progress.' },
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
    text: 'Started with hands-on campaign work and learned to turn fragmented signals into a clear, repeatable system.',
    tags: ['Growth', 'Campaigns', 'Analytics'],
  },
  {
    year: '2021',
    role: 'Senior Growth Marketer',
    company: 'B2B SaaS Startup · Full-time',
    text: 'Took ownership of the full experience from acquisition to conversion and built a stronger foundation for scale.',
    tags: ['Strategy', 'Content', 'SaaS'],
  },
  {
    year: '2022',
    role: 'Independent Consultant',
    company: 'Multiple Clients · Contract',
    text: 'Worked across industries, bringing research, positioning, and execution together around one business goal.',
    tags: ['Consulting', 'Product', 'Brand'],
  },
  {
    year: '2024',
    role: 'Founded Meridian',
    company: 'Independent Practice',
    text: 'Built a focused practice for ambitious brands that value thoughtful craft and work that creates real momentum.',
    tags: ['Leadership', 'Systems', 'Direction'],
  },
]

const deepFocus = [
  ['01', 'You talk to the person doing the work', 'Direct collaboration keeps the thinking clear and the details consistent.'],
  ['02', 'Every detail serves the whole', 'The visual system, interaction, and story are designed as one connected experience.'],
  ['03', 'Craft that holds up over time', 'The final work is made to stay useful, recognizable, and easy to evolve.'],
]

export default function AelixaAbout() {
  return (
    <div className="aelixa-about">
      <section className="aa-hero" aria-labelledby="aa-hero-title">
        <div className="container aa-hero__inner">
          <div className="aa-hero__grid">
            <h1 id="aa-hero-title" className="aa-hero__title">
              <span data-reveal>About</span>
              <span data-reveal>Aelixa</span>
            </h1>

            <div className="aa-hero__meta" data-reveal>
              <p>Helping ambitious brands scale<br />through data and design.<br />Ready to grow? <a href="mailto:hello@aelixa.io">hello@aelixa.io</a></p>
            </div>

            <figure className="aa-hero__portrait" data-reveal>
              <img src="/media/portfolio/mia-portrait-gray-v2.png" alt="Aelixa founder portrait" />
              <figcaption>Based in Zurich, Switzerland<br />Serving brands globally.</figcaption>
            </figure>

            <div className="aa-hero__statement" data-reveal>
              <p>Digital strategist focused on<br />performance and quiet luxury. I build<br />brands that matter. Life is in the details.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="aa-results" aria-labelledby="aa-results-title">
        <div className="container">
          <div className="aa-metrics">
            {metrics.map((metric) => (
              <article className="aa-metric" key={metric.label} data-reveal>
                <strong>{metric.value}</strong>
                <h2>{metric.label}</h2>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>

          <div className="aa-results__story">
            <div className="aa-section-title" data-reveal>
              <p className="aa-kicker aa-kicker--light">PROVEN IMPACT</p>
              <h2 id="aa-results-title">Measured By<br />Real Results</h2>
            </div>
            <div className="aa-results__copy" data-reveal>
              <p>From scaling startups to optimizing established brands, these numbers reflect a commitment to excellence and growth.</p>
              <p>I started this practice after years of watching brands invest in work that looked busy but moved nothing. The problem was rarely effort — it was clarity.</p>
            </div>
            <figure className="aa-results__portrait" data-reveal>
              <img src="/media/portfolio/hero-portrait.png" alt="Portrait in studio" />
            </figure>
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

      <section className="aa-focus" aria-labelledby="aa-focus-title">
        <div className="container">
          <div className="aa-focus__heading" data-reveal>
            <p className="aa-kicker">DEEP FOCUS</p>
            <h2 id="aa-focus-title">Building Rich Imagery<br />For Over Two Decades</h2>
            <p>I specialize in creating high-end visual identities that resonate with audiences and build long-term brand equity.</p>
          </div>

          <figure className="aa-focus__visual" data-reveal>
            <img src="/media/portfolio/hero-portfolio-wide.jpg" alt="Selected visual identity work" />
            <figcaption>Selected direction · Brand system · Digital experience</figcaption>
          </figure>

          <div className="aa-focus__list">
            {deepFocus.map(([number, title, text]) => (
              <article className="aa-focus-card" key={number} data-reveal>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
