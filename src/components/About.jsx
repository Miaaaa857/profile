export default function About({ data, copy }) {
  const loop = [...data.gallery, ...data.gallery]
  return (
    <section className="section about" id="about">
      <div className="container about-copy">
        <div data-reveal><p className="eyebrow">{data.eyebrow}</p><span className="section-index">( 01 )</span></div>
        <div>
          <h2 className="statement" data-reveal>{data.statement}</h2>
          <div className="about-meta" data-reveal><p>{data.description}</p><a className="text-link" href="#skills">{copy.aboutLink} <span>↘</span></a></div>
        </div>
      </div>
      <div className="gallery-marquee">
        <div className="gallery-track">
          {loop.map((item, i) => <figure className={`gallery-card gallery-card--${(i % 3) + 1}`} key={`${item.alt}-${i}`}><img src={item.src} alt={i < 3 ? item.alt : ''} /><figcaption>{item.label}</figcaption></figure>)}
        </div>
      </div>
    </section>
  )
}
