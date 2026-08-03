import { content } from '../data/content'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LogoMarquee from '../components/LogoMarquee'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false)
  useReveal()
  return (
    <main>
      <Navbar data={content} onContact={() => setContactOpen(true)} />
      <Hero data={content.hero} copy={content.site} />
      <About data={content.aboutPersona} stats={content.stats} />
      <LogoMarquee brands={content.brands} label={content.site.clientsLabel} ariaLabel={content.site.clientsAria} />
      <Skills items={content.skills} copy={content.site} />
      <Projects items={content.projects} copy={content.site} variant="grid" />
      <FAQ items={content.faq} copy={content.site} />
      <Footer data={content} onContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} data={content} />
    </main>
  )
}
