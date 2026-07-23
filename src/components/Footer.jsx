export default function Footer({ data }) {
  return (
    <footer className="footer" id="contact">
      <section className="footer-cta-shell">
        <div className="container footer-cta" data-reveal><p className="eyebrow">{data.site.footerEyebrow}</p><h2>{data.site.footerTitle[0]}<br /><span className="display-emphasis">{data.site.footerTitle[1]}</span></h2><a className="round-button" href={`mailto:${data.designer.email}`}><span>{data.site.footerCta}</span><i>↗</i></a></div>
      </section>
      <div className="footer-panel">
        <div className="container footer-grid">
          <div><a className="footer-email" href={`mailto:${data.designer.email}`}>{data.designer.email} ↗</a><p>{data.site.footerLocation}</p></div>
          <div className="footer-socials">{data.socials.map((item) => <a href={item.href} key={item.label} target="_blank" rel="noreferrer"><span>{item.label}</span><strong>{item.value}</strong><i>↗</i></a>)}</div>
          <form className="subscribe" onSubmit={(e) => e.preventDefault()}><label htmlFor="message">{data.site.messageLabel}</label><div><input id="message" placeholder={data.site.messagePlaceholder} /><button type="submit" aria-label={data.site.messageLabel}>→</button></div></form>
        </div>
        <a className="container footer-logo-giant" href="#home" aria-label={data.site.backHome}>{data.site.footerWordmark}</a>
        <div className="container footer-bottom"><p>{data.site.copyright}</p><a href={`mailto:${data.designer.email}`}>{data.designer.email}</a><a href="#home">{data.site.backToTop} ↑</a></div>
      </div>
    </footer>
  )
}
