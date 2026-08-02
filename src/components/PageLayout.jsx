import { useState } from 'react'
import { content } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactModal from './ContactModal'

export default function PageLayout({ children, className = '' }) {
  const [contactOpen, setContactOpen] = useState(false)
  useReveal()
  const openContact = () => setContactOpen(true)
  return (
    <main className={`inner-page ${className}`.trim()}>
      <Navbar data={content} onContact={openContact} />
      {children}
      <Footer data={content} onContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} data={content} />
    </main>
  )
}
