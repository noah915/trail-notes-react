import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../api.js'
import { useAuth } from '../auth/useAuth.js'

function AdminPage() {
  const [statistics, setStatistics] = useState(null)
  const [error, setError] = useState(null)
  const { clearUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let active = true

    apiRequest('/admin/statistics')
      .then((data) => {
        if (active) setStatistics(data)
      })
      .catch((requestError) => {
        if (!active) return
        if (requestError.status === 401) {
          clearUser()
          navigate('/login', {
            replace: true,
            state: { loginRequired: true, from: { pathname: '/admin' } },
          })
          return
        }
        setError({
          status: requestError.status,
          message: requestError.message,
        })
      })

    return () => {
      active = false
    }
  }, [clearUser, navigate])

  return (
    <section className="account-page" aria-labelledby="admin-title">
      <p className="section-kicker">ADMIN AREA</p>
      <h1 id="admin-title">Inventory statistics</h1>
      {!statistics && !error && <p role="status">Loading protected statistics…</p>}
      {error?.status === 403 && (
        <div className="permission-message" role="alert">
          <h2>Access forbidden (403)</h2>
          <p>You are signed in, but this account does not have the admin role.</p>
          <p>Backend message: {error.message}</p>
        </div>
      )}
      {error && error.status !== 403 && (
        <p className="auth-error" role="alert">{error.message}</p>
      )}
      {statistics && (
        <div className="account-card">
          <h2>Protected API response</h2>
          <p className="api-success">Loaded from <code>GET /admin/statistics</code>.</p>
          <pre>{JSON.stringify(statistics.data ?? statistics, null, 2)}</pre>
        </div>
      )}
      <Link className="text-link" to="/dashboard">Back to your account</Link>
    </section>
  )
}

export default AdminPage
