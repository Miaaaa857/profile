export default function LogoMarquee({ brands, label, ariaLabel = label }) {
  const loop = [...brands, ...brands]
  return (
    <section className="logo-strip" aria-label={ariaLabel}>
      <p className="logo-strip__label">{label}</p>
      <div className="marquee"><div className="marquee__track">
        {loop.map((brand, i) => <span className="brand" key={`${brand}-${i}`}>{brand}</span>)}
      </div></div>
    </section>
  )
}
