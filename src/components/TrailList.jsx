import { Compass } from 'lucide-react'
import TrailCard from './TrailCard.jsx'

function TrailList({ trails, savedIds, onToggleSaved, onClearFilters }) {
  if (trails.length === 0) {
    return (
      <div className="empty-state" role="status">
        <Compass size={25} aria-hidden="true" />
        <h3>No routes match those filters.</h3>
        <p>Try another region or search for a different park.</p>
        <button type="button" onClick={onClearFilters}>Clear filters</button>
      </div>
    )
  }

  return (
    <div className="route-grid">
      {trails.map((trail, index) => (
        <TrailCard
          key={trail.id}
          trail={trail}
          isSaved={savedIds.includes(trail.id)}
          onToggleSaved={onToggleSaved}
          order={index}
        />
      ))}
    </div>
  )
}

export default TrailList
