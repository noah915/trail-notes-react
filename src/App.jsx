import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { trails } from './trailData.js'
import HomePage from './pages/HomePage.jsx'
import ItemDetailsPage from './pages/ItemDetailsPage.jsx'
import ItemListPage from './pages/ItemListPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import './App.css'

function App() {
  const [savedIds, setSavedIds] = useState([])

  function toggleSaved(trailId) {
    setSavedIds((currentIds) =>
      currentIds.includes(trailId)
        ? currentIds.filter((id) => id !== trailId)
        : [...currentIds, trailId],
    )
  }

  return (
    <>
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/items"
            element={
              <ItemListPage
                trails={trails}
                savedIds={savedIds}
                onToggleSaved={toggleSaved}
              />
            }
          />
          <Route path="/items/:id" element={<ItemDetailsPage trails={trails} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}

export default App
