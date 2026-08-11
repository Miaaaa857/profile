export default function LogoMarquee({ brands, label, ariaLabel = label, className = '', contained = true }) {
  const loop = [...brands, ...brands]
  return (
    <section className={`logo-strip${contained ? ' container' : ''}${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
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
