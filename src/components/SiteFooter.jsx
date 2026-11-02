import { Mountain } from 'lucide-react'
import { Link } from 'react-router-dom'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" to="/">TRAIL NOTES</Link>
      <span>Made for the miles between here and there.</span>
      <span>2026 <Mountain size={15} aria-hidden="true" /></span>
    </footer>
  )
}

export default SiteFooter
