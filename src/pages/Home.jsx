import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LogoMarquee from '../components/LogoMarquee'
import About from '../components/About'
import Stats from '../components/Stats'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function Home() {
  useReveal()
  return (
    <main>
      <Navbar data={content} />
      <Hero data={content.hero} copy={content.site} />
      <LogoMarquee brands={content.brands} label={content.site.clientsLabel} ariaLabel={content.site.clientsAria} />
      <About data={content.about} copy={content.site} />
      <Stats items={content.stats} ariaLabel={content.site.statsAria} />
      <Skills items={content.skills} copy={content.site} />
      <Projects items={content.projects} copy={content.site} />
      <FAQ items={content.faq} copy={content.site} />
      <Footer data={content} />
    </main>
  )
}
