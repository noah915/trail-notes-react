import { ArrowUpRight, Mountain } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../auth/useAuth.js'

function SiteHeader() {
  const { user, logout, clearUser } = useAuth()
  const [logoutError, setLogoutError] = useState('')
  const navigate = useNavigate()

  async function handleLogout() {
    setLogoutError('')
    try {
      await logout()
      navigate('/login', { replace: true })
      clearUser()
    } catch (error) {
      if (error.status === 401) {
        navigate('/login', { replace: true })
        clearUser()
        return
      }
      setLogoutError(error.message)
    }
  }

  return (
    <header className="site-header" id="top">
      <Link className="brand" to="/" aria-label="Trail Notes home">
        <span className="brand-mark"><Mountain size={20} strokeWidth={2.2} /></span>
        <span className="brand-copy">
          <strong>TRAIL NOTES</strong>
          <small>OUTDOOR FIELD GUIDE</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/items">Route library</Link>
        {user ? <Link to="/dashboard">My account</Link> : <Link to="/login">Sign in</Link>}
      </nav>
      <div className="header-actions">
        <Link className="mobile-account-link" to={user ? '/dashboard' : '/login'}>
          {user ? 'Account' : 'Sign in'}
        </Link>
        {user && (
          <>
            <span className="header-auth-state">Signed in: {user.username}</span>
            <button className="logout-button" type="button" onClick={handleLogout}>Log out</button>
          </>
        )}
        {logoutError && <span className="header-logout-error" role="alert">{logoutError}</span>}
        <Link className="header-link" to="/items">
          Find a trail <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  )
}

export default SiteHeader
