import { ArrowUpRight, Mountain } from 'lucide-react'

function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label="Trail Notes home">
        <span className="brand-mark"><Mountain size={20} strokeWidth={2.2} /></span>
        <span className="brand-copy">
          <strong>TRAIL NOTES</strong>
          <small>OUTDOOR FIELD GUIDE</small>
        </span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#routes">Route library</a>
        <a href="#field-note">Field note</a>
      </nav>
      <a className="header-link" href="#routes">
        Find a trail <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </header>
  )
}

export default SiteHeader
