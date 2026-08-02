import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ data, onContact }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link className="wordmark" to="/" aria-label={data.site.backHome}><img src={data.site.logoImage} alt={data.site.logoAlt} /></Link>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label={data.site.navLabel}>
        {data.navigation.map((item) => (
          <NavLink key={item.label} to={item.href} end={item.href === '/'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'is-active' : undefined}>
            {item.label}
            {item.href === '/projects' && (
              <sup className="nav-project-badge">{String(data.projects.length).padStart(2, '0')}</sup>
            )}
          </NavLink>
        ))}
      </nav>
      <button className="button button--dark nav-cta" type="button" onClick={onContact}><span className="button__label">{data.site.navCta}</span><span className="button__arrow">→</span></button>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={data.site.menuToggle} aria-expanded={open}>{open ? data.site.menuClose : data.site.menuOpen}</button>
    </header>
  )
}
