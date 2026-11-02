import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FieldNote from '../components/FieldNote.jsx'
import Hero from '../components/Hero.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <section className="home-intro">
        <p className="section-kicker">A LITTLE INSPIRATION <span>/</span> A LOT OF OUTDOORS</p>
        <h2>Make room for a day outside.</h2>
        <p>
          Find a trail that fits your day, from an easy lakeside loop to a climb worth the early start.
        </p>
        <Link className="home-browse-link" to="/items">
          Browse the trail list <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
      <FieldNote />
    </>
  )
}

export default HomePage
