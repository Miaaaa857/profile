import { Link, useParams } from 'react-router-dom'
import { content } from '../data/content'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = content.projects.find((item) => item.slug === slug)
  if (!project) return <main className="project-page"><div className="project-nav"><Link to="/">← {content.site.backHome}</Link></div><div className="not-found"><p>{content.site.notFoundCode}</p><h1>{content.site.notFoundTitle}</h1></div></main>
  return (
    <main className="project-page">
      <div className="project-nav"><Link className="wordmark" to="/">{content.site.logo}<span>®</span></Link><Link to="/">{content.site.detailClose} ×</Link></div>
      <header className="project-hero container"><p className="eyebrow">{content.site.detailEyebrow} {project.index} · {project.year}</p><h1>{project.name}</h1><div><h2>{project.title}</h2><p>{project.summary}</p></div></header>
      <div className={`project-cover tone-${project.tone}`}><img src={project.detailImage || project.image} alt={`${project.name} ${content.site.detailCoverSuffix}`} /></div>
      <section className="project-placeholder container"><div><p className="eyebrow">{content.site.detailSectionEyebrow}</p><h2>{content.site.detailPending}</h2></div><div><p>{content.site.detailDescription}</p><p className="metric-large">{project.metric}</p><Link className="button button--dark" to="/">{content.site.backToProjects}</Link></div></section>
    </main>
  )
}
