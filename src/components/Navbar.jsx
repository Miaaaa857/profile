import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const MENU_ROTATIONS = [-5, 5, -5, 5, -5]

export default function Navbar({ data, onContact }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const overlayRef = useRef(null)
  const bubbleRefs = useRef([])
  const labelRefs = useRef([])
  const hasOpenedRef = useRef(false)
  const location = useLocation()

  const menuItems = [
    ...data.navigation.map((item) => ({ ...item, ariaLabel: item.label })),
    { label: data.site.navCta, href: '#contact', ariaLabel: data.site.navCta, isContact: true },
    { label: data.site?.heroSecondary || '下载简历', href: data.site?.resumeHref || '/Mia-UI-Designer-Resume.pdf', ariaLabel: data.site?.heroSecondary || '下载简历', isDownload: true },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const overlay = overlayRef.current
    const bubbles = bubbleRefs.current.filter(Boolean)
    const labels = labelRefs.current.filter(Boolean)
    if (!overlay || !bubbles.length) return

    const isMobile = window.matchMedia('(max-width: 980px)').matches
    gsap.killTweensOf([overlay, ...bubbles, ...labels])
    if (open) {
      hasOpenedRef.current = true
      gsap.set(overlay, { display: 'flex', autoAlpha: 1, yPercent: isMobile ? -108 : 0 })
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(labels, { y: 20, autoAlpha: 0 })
      if (isMobile) {
        gsap.to(overlay, { yPercent: 0, duration: 0.88, ease: 'power4.out' })
      }
      bubbles.forEach((bubble, index) => {
        const timeline = gsap.timeline({ delay: (isMobile ? 0.56 : 0) + index * 0.12 + gsap.utils.random(-0.04, 0.04) })
        timeline.to(bubble, { scale: 1, duration: 0.5, ease: 'back.out(1.5)' })
        timeline.to(labels[index], { y: 0, autoAlpha: 1, duration: 0.42, ease: 'power3.out' }, '-=0.43')
      })
      document.body.classList.add('bubble-menu-open')
    } else if (hasOpenedRef.current) {
      gsap.to(labels, { y: 20, autoAlpha: 0, duration: 0.18, ease: 'power3.in' })
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        stagger: 0.025,
        ease: 'power3.in',
        onComplete: () => {
          if (isMobile) {
            gsap.to(overlay, {
              yPercent: -108,
              duration: 0.58,
              ease: 'power3.inOut',
              onComplete: () => gsap.set(overlay, { display: 'none' }),
            })
          } else {
            gsap.set(overlay, { display: 'none' })
          }
        },
      })
      document.body.classList.remove('bubble-menu-open')
    }

    return () => document.body.classList.remove('bubble-menu-open')
  }, [open])

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleItemClick = (item) => {
    setOpen(false)
    if (item.isContact) onContact?.()
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${open ? 'navbar--menu-open' : ''}`}>
        <Link className="wordmark" to="/" aria-label={data.site.backHome}><img src={data.site.logoImage} alt={data.site.logoAlt} /></Link>
        <nav className="nav-links" aria-label={data.site.navLabel}>
          {data.navigation.map((item) => (
            <NavLink key={item.label} to={item.href} end={item.href === '/'} className={({ isActive }) => isActive ? 'is-active' : undefined}>
              {item.label}
              {item.href === '/projects' && <sup className="nav-project-badge">{String(data.projects.length).padStart(2, '0')}</sup>}
            </NavLink>
          ))}
        </nav>
        <button className="button button--dark nav-cta" type="button" onClick={onContact}><span className="button__label">{data.site.navCta}</span><span className="button__arrow">→</span></button>
        <button className="menu-toggle bubble-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? data.site.menuClose : data.site.menuOpen} aria-expanded={open}>
          <img src={open ? '/media/close_line.svg' : '/media/menu_line.svg'} alt="" aria-hidden="true" />
        </button>
      </header>

      <div ref={overlayRef} className="bubble-menu-overlay" aria-hidden={!open} onClick={() => setOpen(false)}>
        <ul className="bubble-menu-list" aria-label={data.site.navLabel} onClick={(event) => event.stopPropagation()}>
          {menuItems.map((item, index) => (
            <li key={item.label}>
              {item.isContact ? (
                <button
                  type="button"
                  className="bubble-menu-link"
                  style={{ '--bubble-rotation': `${MENU_ROTATIONS[index]}deg` }}
                  onClick={() => handleItemClick(item)}
                  ref={(element) => { bubbleRefs.current[index] = element }}
                >
                  <span ref={(element) => { labelRefs.current[index] = element }}>{item.label}</span>
                </button>
              ) : item.isDownload ? (
                <a
                  href={item.href}
                  download="Mia-UI-Designer-Resume.pdf"
                  aria-label={item.ariaLabel}
                  className="bubble-menu-link"
                  style={{ '--bubble-rotation': `${MENU_ROTATIONS[index]}deg` }}
                  onClick={() => handleItemClick(item)}
                  ref={(element) => { bubbleRefs.current[index] = element }}
                >
                  <span ref={(element) => { labelRefs.current[index] = element }}>{item.label}</span>
                </a>
              ) : (
                <Link
                  to={item.href}
                  aria-label={item.ariaLabel}
                  className="bubble-menu-link"
                  style={{ '--bubble-rotation': `${MENU_ROTATIONS[index]}deg` }}
                  onClick={() => handleItemClick(item)}
                  ref={(element) => { bubbleRefs.current[index] = element }}
                >
                  <span ref={(element) => { labelRefs.current[index] = element }}>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
