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
  if (!article) return <main className="insight-not-found"><p>404</p><h1>文章未找到</h1><Link to="/">返回首页</Link></main>
  return (
    <main className="insight-detail" id="home">
      <Navbar data={content} onContact={() => setContactOpen(true)} />
      <article>
        <header className="insight-hero"><div className="insight-hero__inner">
          <p className="eyebrow" data-reveal>ARTICLE DETAILS</p><h1 data-reveal>{article.title}</h1>
          <p className="insight-hero__summary" data-reveal>{article.summary}</p>
          <div className="insight-meta" data-reveal><p><span>作者</span><strong>MIA</strong></p><p><span>发布日期</span><strong>{article.date}</strong></p><p><span>阅读时间</span><strong>{article.readTime}</strong></p></div>
        </div></header>
        <section className="insight-content">
          <figure className="insight-cover" data-reveal><img src={article.image} alt={article.title} /></figure>
          <div className="insight-prose" data-reveal><p className="insight-prose__lead">{article.intro}</p>{article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}<blockquote>“{article.quote}”</blockquote></div>
          <div className="insight-gallery" data-reveal>{article.gallery.map((image, index) => <img src={image} alt={`${article.title}内容配图 ${index + 1}`} key={image} />)}</div>
          <div className="insight-prose insight-prose--closing" data-reveal><h2>关键结论</h2><ul>{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul><p>这里是文章结尾占位。可以收束观点、补充行动建议，或把读者引向相关项目与下一篇文章。</p></div>
          <Link className="insight-back" to="/#thinking" data-reveal><span>返回全部观点</span><i aria-hidden="true">↗</i></Link>
        </section>
      </article>
      <Footer data={content} onContact={() => setContactOpen(true)} /><ContactModal open={contactOpen} onClose={() => setContactOpen(false)} data={content} />
    </main>
  )
}
