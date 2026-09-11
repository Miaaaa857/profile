export default function LogoMarquee({ brands, label, ariaLabel = label, className = '' }) {
  const loop = [...brands, ...brands]
  return (
    <section className={`logo-strip${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      <div className="container logo-strip__inner">
        <p className="logo-strip__label">{label}</p>
        <div className="marquee"><div className="marquee__track">
          {loop.map((brand, i) => (
            <span className="brand" key={`${brand.name}-${i}`}>
              <img src={brand.src} alt={i < brands.length ? brand.name : ''} />
            </span>
          ))}
        </div></div>
      </div>
    </section>
  )
}
