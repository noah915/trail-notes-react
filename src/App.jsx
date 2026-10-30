import { useState } from 'react'
import { trails, routeRegions } from './trailData.js'
import FieldNote from './components/FieldNote.jsx'
import Hero from './components/Hero.jsx'
import RouteFilters from './components/RouteFilters.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import TrailList from './components/TrailList.jsx'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeRegion, setActiveRegion] = useState('All routes')
  const [savedIds, setSavedIds] = useState([])
  const [savedOnly, setSavedOnly] = useState(false)

  const visibleTrails = trails.filter((trail) => {
    const matchesSearch = `${trail.name} ${trail.park} ${trail.description}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
    const matchesRegion = activeRegion === 'All routes' || trail.region === activeRegion
    const matchesSaved = !savedOnly || savedIds.includes(trail.id)

    return matchesSearch && matchesRegion && matchesSaved
  })

  function toggleSaved(trailId) {
    setSavedIds((currentIds) =>
      currentIds.includes(trailId)
        ? currentIds.filter((id) => id !== trailId)
        : [...currentIds, trailId],
    )
  }

  function clearFilters() {
    setSearchTerm('')
    setActiveRegion('All routes')
    setSavedOnly(false)
  }

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <section className="route-section" id="routes" aria-labelledby="routes-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">THE TRAIL INDEX <span> / </span> 2026 EDITION</p>
              <h2 id="routes-title">Routes worth the early start.</h2>
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
            onToggleSaved={toggleSaved}
            onClearFilters={clearFilters}
          />
        </section>

        <FieldNote />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
