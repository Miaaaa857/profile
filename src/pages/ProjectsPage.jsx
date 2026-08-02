import { content } from '../data/content'
import PageLayout from '../components/PageLayout'
import Projects from '../components/Projects'

export default function ProjectsPage() {
  return <PageLayout className="projects-page"><Projects items={content.projects} copy={content.site} /></PageLayout>
}
