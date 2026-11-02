import { useState } from 'react'
import { routeRegions } from '../trailData.js'
import RouteFilters from '../components/RouteFilters.jsx'
import TrailList from '../components/TrailList.jsx'

function ItemListPage({ trails, savedIds, onToggleSaved }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeRegion, setActiveRegion] = useState('All routes')
  const [savedOnly, setSavedOnly] = useState(false)

  const visibleTrails = trails.filter((trail) => {
    const matchesSearch = `${trail.name} ${trail.park} ${trail.description}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
    const matchesRegion = activeRegion === 'All routes' || trail.region === activeRegion
    const matchesSaved = !savedOnly || savedIds.includes(trail.id)

    return matchesSearch && matchesRegion && matchesSaved
  })

  function clearFilters() {
    setSearchTerm('')
    setActiveRegion('All routes')
    setSavedOnly(false)
  }

  return (
    <section className="route-section" aria-labelledby="routes-title">
      <div className="section-heading">
        <div>
          <p className="section-kicker">THE TRAIL INDEX <span>/</span> 2026 EDITION</p>
          <h1 id="routes-title">Routes worth the early start.</h1>
          <p className="section-description">Five hand-picked walks to help you make a day of it.</p>
        </div>
        <div className="route-count" aria-live="polite">
          <strong>{visibleTrails.length.toString().padStart(2, '0')}</strong>
          <span>ROUTES<br />SHOWN</span>
        </div>
      </div>

      <RouteFilters
        regions={routeRegions}
        activeRegion={activeRegion}
        onRegionChange={setActiveRegion}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        savedCount={savedIds.length}
        savedOnly={savedOnly}
        onSavedOnlyChange={() => setSavedOnly((showingSaved) => !showingSaved)}
      />
      <TrailList
        trails={visibleTrails}
        savedIds={savedIds}
        onToggleSaved={onToggleSaved}
        onClearFilters={clearFilters}
      />
    </section>
  )
}

export default ItemListPage
