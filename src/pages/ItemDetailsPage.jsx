import { ArrowLeft, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

function ItemDetailsPage({ trails }) {
  const { id } = useParams()
  const trail = trails.find((item) => item.id === id)

  if (!trail) {
    return (
      <section className="route-message" aria-labelledby="trail-not-found-title">
        <p className="section-kicker">TRAIL NOT FOUND</p>
        <h1 id="trail-not-found-title">We couldn’t find that trail.</h1>
        <p>Check the trail link or return to the full trail list.</p>
        <Link className="text-link" to="/items"><ArrowLeft size={16} /> Back to all trails</Link>
      </section>
    )
  }

  return (
    <article className="trail-details">
      <Link className="back-link" to="/items"><ArrowLeft size={16} /> All trails</Link>
      <div className="trail-details-grid">
        <div className="trail-details-image-wrap">
          <img className="trail-details-image" src={trail.image} alt={trail.imageAlt} />
          <span className={`difficulty-label difficulty-${trail.difficulty.toLowerCase()}`}>
            {trail.difficulty}
          </span>
        </div>
        <div className="trail-details-content">
          <p className="route-location">
            <MapPin size={14} aria-hidden="true" /> {trail.park} <span>/</span> {trail.region}
          </p>
          <h1>{trail.name}</h1>
          <p className="trail-details-description">{trail.description}</p>
          <dl className="trail-facts">
            <div><dt>Distance</dt><dd>{trail.distance}</dd></div>
            <div><dt>Elevation gain</dt><dd>{trail.elevation}</dd></div>
            <div><dt>Estimated time</dt><dd>{trail.time}</dd></div>
          </dl>
          <p className="trail-details-note">
            Take your time, check local conditions before heading out, and remember to leave no trace.
          </p>
          <Link className="text-link" to="/items"><ArrowLeft size={16} /> Explore more trails</Link>
        </div>
      </div>
    </article>
  )
}

export default ItemDetailsPage
