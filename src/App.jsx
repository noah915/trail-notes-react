import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bookmark,
  Compass,
  MapPin,
  Mountain,
  Search,
} from 'lucide-react'
import { routeRegions, trails } from './trailData.js'
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

  return (
    <>
      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Trail Notes home">
          <span className="brand-mark"><Mountain size={20} strokeWidth={2.2} /></span>
          <span className="brand-copy">
            <strong>TRAIL NOTES</strong>
            <small>OUTDOOR FIELD GUIDE</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#routes">Route library</a>
          <a href="#field-note">Field note</a>
        </nav>
        <a className="header-link" href="#routes">
          Find a trail <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>

      <main>
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
            <a className="hero-action" href="#routes">
              Explore the routes <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-caption">
            <span className="caption-rule" />
            <span>NORTH CASCADES<br />WASHINGTON, USA</span>
          </div>
          <div className="hero-index"><span>FIELD NOTE</span><strong>09</strong></div>
        </section>

        <section className="route-section" id="routes" aria-labelledby="routes-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">THE TRAIL INDEX <span> / </span> 2026 EDITION</p>
              <h2 id="routes-title">Routes worth the early start.</h2>
              <p className="section-description">Five hand-picked walks to help you make a day of it.</p>
            </div>
            <div className="route-count"><strong>{visibleTrails.length.toString().padStart(2, '0')}</strong><span>ROUTES<br />SHOWN</span></div>
          </div>

          <div className="route-controls">
            <label className="search-control" htmlFor="route-search">
              <Search size={18} aria-hidden="true" />
              <span className="visually-hidden">Search routes</span>
              <input
                id="route-search"
                type="search"
                placeholder="Search by trail or park"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <div className="region-controls" role="group" aria-label="Filter routes by region">
              {routeRegions.map((region) => (
                <button
                  className={activeRegion === region ? 'region-button is-active' : 'region-button'}
                  key={region}
                  type="button"
                  aria-pressed={activeRegion === region}
                  onClick={() => setActiveRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
            <button
              className={savedOnly ? 'saved-filter is-active' : 'saved-filter'}
              type="button"
              aria-pressed={savedOnly}
              onClick={() => setSavedOnly((showingSaved) => !showingSaved)}
            >
              <Bookmark size={16} aria-hidden="true" />
              Saved <span>{savedIds.length}</span>
            </button>
          </div>

          {visibleTrails.length > 0 ? (
            <div className="route-grid">
              {visibleTrails.map((trail, index) => {
                const isSaved = savedIds.includes(trail.id)

                return (
                  <article className="route-card" key={trail.id} style={{ '--card-order': index }}>
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
                        onClick={() => toggleSaved(trail.id)}
                      >
                        <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="route-card-content">
                      <p className="route-location"><MapPin size={14} aria-hidden="true" /> {trail.park} <span>/</span> {trail.region}</p>
                      <h3>{trail.name}</h3>
                      <p className="route-description">{trail.description}</p>
                      <dl className="route-facts">
                        <div><dt>Distance</dt><dd>{trail.distance}</dd></div>
                        <div><dt>Elevation</dt><dd>{trail.elevation}</dd></div>
                        <div><dt>Time</dt><dd>{trail.time}</dd></div>
                      </dl>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <Compass size={25} aria-hidden="true" />
              <h3>No routes match those filters.</h3>
              <p>Try another region or search for a different park.</p>
              <button type="button" onClick={() => { setSearchTerm(''); setActiveRegion('All routes'); setSavedOnly(false) }}>
                Clear filters
              </button>
            </div>
          )}
        </section>

        <aside className="field-note" id="field-note" aria-label="Field note">
          <div className="field-note-mark"><Compass size={22} aria-hidden="true" /></div>
          <p className="field-note-label">A SMALL REMINDER</p>
          <p className="field-note-copy">Leave the trail better than you found it. Take only photos, pack out what you pack in, and give wildlife room.</p>
          <a href="https://lnt.org/why/7-principles/" target="_blank" rel="noreferrer">
            The seven principles <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </aside>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">TRAIL NOTES</a>
        <span>Made for the miles between here and there.</span>
        <span>2026 <Mountain size={15} aria-hidden="true" /></span>
      </footer>
    </>
  )
}

export default App
