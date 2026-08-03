import { Link } from 'react-router-dom'
import BorderGlow from './BorderGlow'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

function applyCoverColor(event) {
  const image = event.currentTarget
  const card = image.closest('.project-stack-card')
  if (!card) return

  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })
    canvas.width = 32
    canvas.height = 32
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    const colors = new Map()

    for (let index = 0; index < pixels.length; index += 4) {
      const red = pixels[index]
      const green = pixels[index + 1]
      const blue = pixels[index + 2]
      const alpha = pixels[index + 3]
      const max = Math.max(red, green, blue)
      const min = Math.min(red, green, blue)

      if (alpha < 160 || (max > 245 && max - min < 16)) continue

      const key = `${red >> 5}-${green >> 5}-${blue >> 5}`
      const color = colors.get(key) || { count: 0, red: 0, green: 0, blue: 0 }
      color.count += 1
      color.red += red
      color.green += green
      color.blue += blue
      colors.set(key, color)
    }

    const dominant = [...colors.values()].sort((a, b) => b.count - a.count)[0]
    if (!dominant) return

    const red = Math.round(dominant.red / dominant.count)
    const green = Math.round(dominant.green / dominant.count)
    const blue = Math.round(dominant.blue / dominant.count)
    const luminance = (red * .2126 + green * .7152 + blue * .0722) / 255
    const isDark = luminance < .53

    card.style.setProperty('--project-bg', `rgb(${red} ${green} ${blue})`)
    card.style.setProperty('--project-fg', isDark ? '#fff' : '#11110f')
    card.style.setProperty('--project-muted', isDark ? 'rgba(255,255,255,.68)' : 'rgba(17,17,15,.58)')
  } catch {
    // Keep the fallback color when image sampling is unavailable.
  }
}

export default function Projects({ items, copy, variant = 'stack' }) {
  return (
    <section className={`section projects container projects--${variant}`} id="projects">
      <div className="projects-heading" data-reveal>
        <div className="module-heading__main">
          <div className="module-heading__label"><p className="eyebrow">{copy.projectsEyebrow}</p></div>
          <h2>{copy.projectsTitle[0]}<br /><i className="display-emphasis">{copy.projectsTitle[1]}</i></h2>
        </div>
        <p>{copy.projectsIntro}</p>
      </div>
      {variant === 'grid' ? (
        <div className="home-work-grid">
          {items.map((item, i) => (
            <Link className={`home-work-card home-work-card--${i + 1}`} to={`/projects/${item.slug}`} key={item.slug} data-reveal>
              <BorderGlow
                className="home-work-card__glow"
                edgeSensitivity={24}
                glowColor="14 100 65"
                backgroundColor="#fff"
                borderRadius={24}
                glowRadius={26}
                glowIntensity={0.68}
                coneSpread={23}
                fillOpacity={0.12}
                colors={['#ff4d24', '#ff9b69', '#20e7bd']}
              >
                <div className="home-work-card__visual">
                  <img src={item.image} alt={`${item.name} ${item.title}${copy.projectCoverSuffix}`} />
                </div>
              </BorderGlow>
              <div className="home-work-card__info">
                <h3>{item.name} — {item.title}</h3>
                <p>{item.year} · {item.category} · {item.metric}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
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
                <div className={`project-visual tone-${item.tone}`}><img src={item.image} alt={`${item.name} ${item.title}${copy.projectCoverSuffix}`} onLoad={applyCoverColor} /><span className="project-open">↗</span></div>
                <div className="project-info"><div><span>{item.category}</span><span>{item.year}</span></div><h3>{item.name}</h3><p>{item.title} · {item.metric}</p></div>
              </Link>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      )}
      <Link className="all-projects" to="/projects/fatelinked"><span>{copy.allProjects}</span><strong>(04)</strong><i>↗</i></Link>
    </section>
  )
}
