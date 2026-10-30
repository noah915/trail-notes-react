import { Bookmark, Search } from 'lucide-react'

function RouteFilters({
  regions,
  activeRegion,
  onRegionChange,
  searchTerm,
  onSearchChange,
  savedCount,
  savedOnly,
  onSavedOnlyChange,
}) {
  return (
    <div className="route-controls">
      <label className="search-control" htmlFor="route-search">
        <Search size={18} aria-hidden="true" />
        <span className="visually-hidden">Search routes</span>
        <input
          id="route-search"
          type="search"
          placeholder="Search by trail or park"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
      <div className="region-controls" role="group" aria-label="Filter routes by region">
        {regions.map((region) => (
          <button
            className={activeRegion === region ? 'region-button is-active' : 'region-button'}
            key={region}
            type="button"
            aria-pressed={activeRegion === region}
            onClick={() => onRegionChange(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <button
        className={savedOnly ? 'saved-filter is-active' : 'saved-filter'}
        type="button"
        aria-pressed={savedOnly}
        onClick={onSavedOnlyChange}
      >
        <Bookmark size={16} aria-hidden="true" />
        Saved <span>{savedCount}</span>
      </button>
    </div>
  )
}

export default RouteFilters
