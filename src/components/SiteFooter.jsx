import { Mountain } from 'lucide-react'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="footer-brand" href="#top">TRAIL NOTES</a>
      <span>Made for the miles between here and there.</span>
      <span>2026 <Mountain size={15} aria-hidden="true" /></span>
    </footer>
  )
}

export default SiteFooter
