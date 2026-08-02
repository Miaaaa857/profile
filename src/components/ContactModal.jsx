import { lazy, Suspense, useEffect, useRef } from 'react'

const Lanyard = lazy(() => import('./Lanyard/Lanyard'))

export default function ContactModal({ open, onClose, data }) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'; window.addEventListener('keydown', handleKeyDown); closeRef.current?.focus()
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKeyDown) }
  }, [open, onClose])
  if (!open) return null
  return <div className="contact-modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="contact-modal__stage" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button ref={closeRef} className="contact-modal__close" type="button" onClick={onClose} aria-label="关闭联系弹窗">×</button>
      <div className="contact-modal__sr-only"><h2 id="contact-modal-title">联系沟通</h2><p>扫码联系我</p><p>有想法？留下一句话</p></div>
      <div className="contact-modal__lanyard" aria-label="可拖拽的联系沟通卡片"><Suspense fallback={<span className="contact-modal__loading">正在加载联系卡片…</span>}><Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} fov={20} cardEmail={data.designer.email} /></Suspense></div>
      <p className="contact-modal__hint">拖动卡片试试看</p>
    </section>
  </div>
}
