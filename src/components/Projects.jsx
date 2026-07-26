import { Link } from 'react-router-dom'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

export default function Projects({ items, copy }) {
  return (
    <section className="section projects container" id="projects">
      <div className="projects-heading" data-reveal>
        <div className="module-heading__main">
          <div className="module-heading__label"><p className="eyebrow">{copy.projectsEyebrow}</p></div>
          <h2>{copy.projectsTitle[0]}<br /><i className="display-emphasis">{copy.projectsTitle[1]}</i></h2>
        </div>
        <p>{copy.projectsIntro}</p>
      </div>
      <ScrollStack
        className="project-stack"
        itemDistance={120}
        itemScale={0.025}
        itemStackDistance={28}
        stackPosition="14%"
        scaleEndPosition="7%"
        baseScale={0.9}
        useWindowScroll
      >
        {items.map((item, i) => (
          <ScrollStackItem itemClassName={`project-stack-card project-stack-card--${i + 1}`} key={item.slug}>
            <Link className={`project-card project-card--${i + 1}`} to={`/projects/${item.slug}`}>
              <div className={`project-visual tone-${item.tone}`}><img src={item.image} alt={`${item.name} ${item.title}${copy.projectCoverSuffix}`} /><span className="project-open">↗</span></div>
              <div className="project-info"><div><span>{item.category}</span><span>{item.year}</span></div><h3>{item.name}</h3><p>{item.title} · {item.metric}</p></div>
            </Link>
          </ScrollStackItem>
        ))}
      </ScrollStack>
      <Link className="all-projects" to="/projects/fatelinked"><span>{copy.allProjects}</span><strong>(04)</strong><i>↗</i></Link>
    </section>
  )
}
