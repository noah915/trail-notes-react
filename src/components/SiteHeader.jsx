import { ArrowUpRight, Mountain } from 'lucide-react'
import { Link } from 'react-router-dom'

function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <Link className="brand" to="/" aria-label="Trail Notes home">
        <span className="brand-mark"><Mountain size={20} strokeWidth={2.2} /></span>
        <span className="brand-copy">
          <strong>TRAIL NOTES</strong>
          <small>OUTDOOR FIELD GUIDE</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/items">Route library</Link>
      </nav>
      <Link className="header-link" to="/items">
        Find a trail <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </header>
  )
}

export default SiteHeader
