import { Bookmark, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

function TrailCard({ trail, isSaved, onToggleSaved, order }) {
  return (
    <article className="route-card" style={{ '--card-order': order }}>
      <div className="route-image-wrap">
        <img className="route-image" src={trail.image} alt={trail.imageAlt} loading="lazy" />
        <span className={`difficulty-label difficulty-${trail.difficulty.toLowerCase()}`}>
          {trail.difficulty}
        </span>
        <button
          className={isSaved ? 'bookmark-button is-saved' : 'bookmark-button'}
          type="button"
          aria-label={isSaved ? `Remove ${trail.name} from saved routes` : `Save ${trail.name}`}
          aria-pressed={isSaved}
          title={isSaved ? 'Remove from saved routes' : 'Save this route'}
          onClick={() => onToggleSaved(trail.id)}
        >
          <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
      <div className="route-card-content">
        <p className="route-location">
          <MapPin size={14} aria-hidden="true" /> {trail.park} <span>/</span> {trail.region}
        </p>
        <h3><Link className="trail-card-link" to={`/items/${trail.id}`}>{trail.name}</Link></h3>
        <p className="route-description">{trail.description}</p>
        <dl className="route-facts">
          <div><dt>Distance</dt><dd>{trail.distance}</dd></div>
          <div><dt>Elevation</dt><dd>{trail.elevation}</dd></div>
          <div><dt>Time</dt><dd>{trail.time}</dd></div>
        </dl>
        <Link className="trail-card-detail-link" to={`/items/${trail.id}`}>
          View trail details
        </Link>
      </div>
    </article>
  )
}

export default TrailCard
