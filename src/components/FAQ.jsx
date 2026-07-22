import { useState } from 'react'

export default function FAQ({ items, copy }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq container">
      <div className="faq-title" data-reveal><p className="eyebrow">{copy.faqEyebrow}</p><h2>{copy.faqTitle[0]}<br /><i className="display-emphasis">{copy.faqTitle[1]}</i></h2></div>
      <div className="faq-list">
        {items.map((item, i) => <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={item.q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>0{i + 1}</span><strong>{item.q}</strong><i>{open === i ? '−' : '+'}</i></button><div className="faq-answer"><p>{item.a}</p></div></div>)}
      </div>
    </section>
  )
}
