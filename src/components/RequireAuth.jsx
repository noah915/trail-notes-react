import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.js'

function RequireAuth({ children }) {
  const { status, sessionError } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <p className="auth-message" role="status">Checking your sign-in…</p>
  }

  if (status === 'error') {
    return (
      <section className="auth-message" role="alert">
        <h1>Can’t verify your sign-in</h1>
        <p>{sessionError}</p>
      </section>
    )
  }

  if (status !== 'authenticated') {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, loginRequired: true }}
      />
    )
  }

  return children
}

export default RequireAuth
