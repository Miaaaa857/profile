import { content } from '../data/content'
import PageLayout from '../components/PageLayout'
import About from '../components/About'
import LogoMarquee from '../components/LogoMarquee'
import Skills from '../components/Skills'

export default function AboutPage() {
  return (
    <PageLayout className="about-page">
      <About data={content.aboutPersona} stats={content.stats} />
      <LogoMarquee brands={content.brands} label={content.site.clientsLabel} ariaLabel={content.site.clientsAria} />
      <Skills items={content.skills} copy={content.site} />
    </PageLayout>
  )
}
