import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../api.js'
import { useAuth } from '../auth/useAuth.js'

function DashboardPage() {
  const [profile, setProfile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { clearUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let active = true

    getCurrentUser()
      .then((currentUser) => {
        if (active) setProfile(currentUser)
      })
      .catch((error) => {
        if (!active) return
        if (error.status === 401) {
          clearUser()
          navigate('/login', {
            replace: true,
            state: { loginRequired: true, from: { pathname: '/dashboard' } },
          })
          return
        }
        setErrorMessage(error.message)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [clearUser, navigate])

  return (
    <section className="account-page" aria-labelledby="account-title">
      <p className="section-kicker">YOUR TRAIL NOTES ACCOUNT</p>
      <h1 id="account-title">Account dashboard</h1>
      <p className="signed-in-badge" role="status">Signed in</p>
      {isLoading && <p role="status">Loading your account from the backend…</p>}
      {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
      {profile && (
        <div className="account-card">
          <h2>Authenticated profile</h2>
          <dl>
            <div><dt>Username</dt><dd>{profile.username}</dd></div>
            <div><dt>Email</dt><dd>{profile.email}</dd></div>
            <div><dt>Role</dt><dd>{profile.role}</dd></div>
            <div><dt>Account ID</dt><dd>{profile.id}</dd></div>
          </dl>
          <p className="api-success">
            This profile was loaded from the protected <code>GET /auth/me</code> endpoint.
          </p>
        </div>
      )}
      <Link className="home-browse-link" to="/admin">Check admin-only statistics</Link>
    </section>
  )
}

export default DashboardPage
