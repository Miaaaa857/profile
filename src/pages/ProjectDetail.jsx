import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { content } from '../data/content'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import { useReveal } from '../hooks/useReveal'

const pdfPageCounts = { adgen: 8, geomindra: 6, fatelinked: 12, pulsebeat: 11 }

export default function ProjectDetail() {
  useReveal()
  const [contactOpen, setContactOpen] = useState(false)
  const { slug } = useParams()
  const project = content.projects.find((item) => item.slug === slug)
  const projectOrder = ['adgen', 'geomindra', 'fatelinked', 'pulsebeat', 'qinrive', 'jiucheng']
  const projectIndex = String(projectOrder.indexOf(slug) + 1).padStart(2, '0')
  const pdfPageCount = pdfPageCounts[slug] || 0
  if (!project) return <main className="project-page"><div className="project-nav"><Link to="/">← {content.site.backHome}</Link></div><div className="not-found"><p>{content.site.notFoundCode}</p><h1>{content.site.notFoundTitle}</h1></div></main>
  const currentIndex = projectOrder.indexOf(slug)
  const relatedProjects = Array.from({ length: 2 }, (_, offset) => {
    const relatedSlug = projectOrder[(currentIndex + offset + 1) % projectOrder.length]
    return content.projects.find((item) => item.slug === relatedSlug)
  }).filter(Boolean)
  return (
    <main className="project-page">
      <div className="project-nav"><Link className="wordmark" to="/" aria-label={content.site.backHome}><img src={content.site.logoImage} alt={content.site.logoAlt} /></Link><Link to="/">{content.site.detailClose} ×</Link></div>
      {!project.pdfHref && <header className="project-hero container"><p className="eyebrow">{content.site.detailEyebrow} {projectIndex} · {project.year}</p><h1>{project.name}</h1><div><h2>{project.title}</h2><p>{project.summary}</p></div></header>}
      {!project.pdfHref && <div className="container project-cover-shell"><div className={`project-cover tone-${project.tone}`}><img src={project.detailImage || project.image} alt={`${project.name} ${content.site.detailCoverSuffix}`} /></div></div>}
      <section className="project-placeholder container">
        <p className="eyebrow project-placeholder__eyebrow">{content.site.detailSectionEyebrow}</p>
        <h2>{project.pdfHref ? '完整项目案例' : content.site.detailPending}</h2>
        <p className="project-placeholder__description">{project.pdfHref ? '完整设计过程和关键页面已在下方直接展示，也可以打开原始 PDF 查看。' : content.site.detailDescription}</p>
        <div className="project-placeholder__actions">
          <p className="metric-large">{project.metric}</p>
          {project.pdfHref ? <a className="button button--dark" href={project.pdfHref} target="_blank" rel="noreferrer"><span className="button__label">查看完整 PDF</span><span className="button__arrow">↗</span></a> : <Link className="button button--dark" to="/"><span className="button__label">{content.site.backToProjects}</span><span className="button__arrow">←</span></Link>}
        </div>
      </section>
      {pdfPageCount > 0 && <section className="project-pdf-gallery" aria-label={`${project.name} 完整项目案例`}><div className="container project-pdf-gallery__inner">
        {Array.from({ length: pdfPageCount }, (_, index) => <img key={index + 1} src={`/media/projects/${slug}/page-${index + 1}.jpg`} alt={`${project.name} 项目案例第 ${index + 1} 页`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />)}
      </div>
      </section>}
      <section className="project-related" aria-labelledby="project-related-title">
        <div className="container">
          <header className="project-related__heading">
            <div><p className="eyebrow">PROJECTS</p><h2 id="project-related-title">其他项目</h2></div>
            <p>继续看看我如何把产品判断<br />落到真实项目里。</p>
          </header>
          <div className="project-related__grid">
            {relatedProjects.map((item) => (
              <Link className="project-related__card" to={`/projects/${item.slug}`} key={item.slug}>
                <div className={`project-related__image tone-${item.tone}`}><img src={item.image} alt={`${item.name} ${item.title}`} /></div>
                <div className="project-related__meta"><h3>{item.name}</h3><p>{item.category}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer data={content} onContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} data={content} />
    </main>
  )
}
