export default function LogoMarquee({ brands, label, ariaLabel = label }) {
  const loop = [...brands, ...brands]
  return (
    <section className="logo-strip container" aria-label={ariaLabel}>
      <p className="logo-strip__label">{label}</p>
      <div className="marquee"><div className="marquee__track">
        {loop.map((brand, i) => (
          <span className="brand" key={`${brand.name}-${i}`}>
            <img src={brand.src} alt={i < brands.length ? brand.name : ''} />
          </span>
        ))}
      </div></div>
    </section>
  )
}
