import { Link } from 'react-router-dom'

export default function Projects({ items, copy }) {
  return (
    <section className="section projects container" id="projects">
      <div className="projects-heading" data-reveal><div><p className="eyebrow">{copy.projectsEyebrow}</p><span className="section-index">( 03 )</span></div><h2>{copy.projectsTitle[0]}<br /><i className="display-emphasis">{copy.projectsTitle[1]}</i></h2><p>{copy.projectsIntro}</p></div>
      <div className="project-grid">
        {items.map((item, i) => (
          <Link className={`project-card project-card--${i + 1}`} to={`/projects/${item.slug}`} key={item.slug} data-reveal>
            <div className={`project-visual tone-${item.tone}`}><img src={item.image} alt={`${item.name} ${item.title}${copy.projectCoverSuffix}`} /><span className="project-open">↗</span></div>
            <div className="project-info"><div><span>{item.category}</span><span>{item.year}</span></div><h3>{item.name}</h3><p>{item.title} · {item.metric}</p></div>
          </Link>
        ))}
      </div>
      <Link className="all-projects" to="/projects/fatelinked"><span>{copy.allProjects}</span><strong>(04)</strong><i>↗</i></Link>
    </section>
  )
}
