import { ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=88"
        alt=""
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="hero-kicker"><span /> A FIELD GUIDE FOR THE WEEKEND</p>
        <h1 id="hero-title">Find your way<br />out there.</h1>
        <p className="hero-description">
          A thoughtful shortlist of day hikes, made for fresh air, slower miles, and the long way home.
        </p>
        <Link className="hero-action" to="/items">
          Explore the routes <ArrowDownRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className="hero-caption">
        <span className="caption-rule" />
        <span>NORTH CASCADES<br />WASHINGTON, USA</span>
      </div>
      <div className="hero-index"><span>FIELD NOTE</span><strong>09</strong></div>
    </section>
  )
}

export default Hero
