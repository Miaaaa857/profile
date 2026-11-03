import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { content } from '../data/content'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'

const pdfPageCounts = { adgen: 8, geomindra: 6, fatelinked: 12, pulsebeat: 11 }

const detailAnnotations = {
  geomindra: {
    subtitle: '矿产勘探 AI 决策平台',
    meta: [{ label: '年', value: '2026' }, { label: '时间线', value: '3个月' }, { label: '类型', value: '决策' }],
  },
  adgen: {
    subtitle: '游戏买量 AI 素材平台',
    meta: [{ label: '年', value: '2025' }, { label: '时间线', value: '【3个月】' }, { label: '类型', value: 'AIGC' }],
  },
  'insurance-ai': {
    subtitle: '企业 AI 知识问答助手',
    meta: [{ label: '年', value: '2026' }, { label: '时间线', value: '【1个月】' }, { label: '类型', value: 'RAG' }],
  },
  'tcm-learning': {
    subtitle: '内部学习答题系统',
    meta: [{ label: '年', value: '2026' }, { label: '时间线', value: '【1个月】' }, { label: '类型', value: 'AIGC' }],
  },
}

export default function ProjectDetail() {
  const [contactOpen, setContactOpen] = useState(false)
  const { slug } = useParams()
  const project = content.projects.find((item) => item.slug === slug)
  const pdfPageCount = pdfPageCounts[slug] || 0
  if (!project) return <main className="project-page"><div className="project-nav"><Link to="/">← {content.site.backHome}</Link></div><div className="not-found"><p>{content.site.notFoundCode}</p><h1>{content.site.notFoundTitle}</h1></div></main>
  const detailAnnotation = detailAnnotations[slug]
  const detailMeta = detailAnnotation?.meta || project.detailMeta || [{ label: '年', value: project.year }, { label: '类型', value: project.category }]
  const detailSubtitle = detailAnnotation?.subtitle || project.metric
  const detailVisual = project.detailImage || project.image
  const showConfidentialNote = slug === 'insurance-ai' || slug === 'tcm-learning'
  return (
    <main className="project-page">
      <div className="project-nav"><Link className="wordmark" to="/" aria-label={content.site.backHome}><img src={content.site.logoImage} alt={content.site.logoAlt} /></Link><Link to="/">{content.site.detailClose} ×</Link></div>
      <section className="project-placeholder project-placeholder--case container">
        <div className="project-placeholder__content">
          <p className="eyebrow">{content.site.detailSectionEyebrow}</p>
          <div className="project-placeholder__title-row">
            <h2>{project.name}</h2>
            <p className="project-placeholder__metric">{detailAnnotation ? '｜' : '·'} {detailSubtitle}</p>
          </div>
          <dl className="project-placeholder__meta">
            {detailMeta.map((item) => <div key={item.label}><dt>{item.label}：</dt><dd>{item.value}</dd></div>)}
          </dl>
          <div className="project-placeholder__actions">
            {project.pdfHref
              ? <a className="button button--dark" href={project.pdfHref} target="_blank" rel="noreferrer"><span className="button__label">查看完整 PDF</span><span className="button__arrow">↗</span></a>
              : <Link className="button button--dark" to="/projects"><span className="button__label">{content.site.backToProjects}</span><span className="button__arrow">←</span></Link>}
            {project.showPrdButton && (project.prdHref
              ? <a className="button button--dark" href={project.prdHref} target="_blank" rel="noreferrer"><span className="button__label">查看 PRD 文档</span><span className="button__arrow">↗</span></a>
              : <span className="button button--dark project-placeholder__pending-button" aria-disabled="true" title="PRD 文档整理中"><span className="button__label">查看 PRD 文档</span><span className="button__arrow">↗</span></span>)}
          </div>
        </div>
        <div className={`project-placeholder__visual${detailVisual ? ' project-placeholder__visual--image' : ''}`} role="img" aria-label={`${project.name} 项目图片${detailVisual ? '' : '占位'}`}>
          {detailVisual && <img src={detailVisual} alt="" />}
        </div>
        {showConfidentialNote && <p className="project-placeholder__confidential-note">出于保密协议，项目的具体界面与数据不便公开展示。对细节感兴趣的话，欢迎约我面谈，我可以当面介绍设计思路。</p>}
      </section>
      {pdfPageCount > 0 && <section className="project-pdf-gallery" aria-label={`${project.name} 完整项目案例`}><div className="container project-pdf-gallery__inner">
        {Array.from({ length: pdfPageCount }, (_, index) => <img key={index + 1} src={`/media/projects/${slug}/page-${index + 1}.jpg`} alt={`${project.name} 项目案例第 ${index + 1} 页`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />)}
      </div>
      </section>}
      <Footer data={content} onContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} data={content} />
    </main>
  )
}
