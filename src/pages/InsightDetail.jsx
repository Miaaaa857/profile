import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import { useReveal } from '../hooks/useReveal'
import { content } from '../data/content'
import { insights } from '../data/insights'
import './InsightDetail.css'

export default function InsightDetail() {
  const { slug } = useParams()
  const [contactOpen, setContactOpen] = useState(false)
  const article = insights.find((item) => item.slug === slug)
  useReveal()

  if (!article) {
    return (
      <main className="insight-not-found">
        <p>404</p>
        <h1>文章未找到</h1>
        <Link to="/">返回首页</Link>
      </main>
    )
  }

  const renderBlock = (block, index) => {
    if (block.type === 'quote') {
      return <blockquote key={`quote-${index}`}>“{block.body}”</blockquote>
    }

    if (block.type === 'takeaways') {
      return (
        <section className="insight-takeaways" key={`takeaways-${index}`}>
          <h2>{block.title}</h2>
          <ul>
            {block.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      )
    }

    return (
      <section key={`${block.title}-${index}`}>
        <h2>{block.title}</h2>
        {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
    )
  }

  return (
    <main className="insight-detail" id="home">
      <Navbar data={content} onContact={() => setContactOpen(true)} />
      <article>
        <header className="insight-hero">
          <div className="insight-hero__inner">
            <p className="eyebrow" data-reveal>ARTICLE DETAILS</p>
            <h1 data-reveal>{article.title}</h1>
            <p className="insight-hero__summary" data-reveal>{article.summary}</p>
            <div className="insight-hero__rule" aria-hidden="true" data-reveal />
          </div>
        </header>

        <section className="insight-content">
          <div className="insight-prose" data-reveal>
            <p className="insight-prose__lead">{article.intro}</p>
            {article.blocks
              ? article.blocks.map(renderBlock)
              : <>
                  {article.sections.map((section) => (
                    <section key={section.title}>
                      <h2>{section.title}</h2>
                      <p>{section.body}</p>
                    </section>
                  ))}
                  <blockquote>“{article.quote}”</blockquote>
                </>}
          </div>

          {!article.blocks && <>
            <div className="insight-gallery" data-reveal>
              {article.gallery.map((image, index) => (
                <img src={image} alt={`${article.title}内容配图 ${index + 1}`} key={image} />
              ))}
            </div>

            <div className="insight-prose insight-prose--closing" data-reveal>
              <h2>关键结论</h2>
              <ul>
                {article.takeaways.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p>这里是文章结尾占位。可以收束观点、补充行动建议，或把读者引向相关项目与下一篇文章。</p>
            </div>
          </>}

          {article.blocks && (
            <div className="insight-cta" data-reveal>
              <p>想看更多这类拆解？</p>
              <div>
                <Link to="/#thinking">阅读全部文章 <span aria-hidden="true">↗</span></Link>
                <button type="button" onClick={() => setContactOpen(true)}>联系沟通 <span aria-hidden="true">↗</span></button>
              </div>
            </div>
          )}

          <Link className="insight-back" to="/#thinking" data-reveal>
            <span>返回全部观点</span><i aria-hidden="true">↗</i>
          </Link>
        </section>
      </article>
      <Footer data={content} onContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} data={content} />
    </main>
  )
}
