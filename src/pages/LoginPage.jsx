import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.js'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, status } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const destination = location.state?.from?.pathname || '/dashboard'

  if (status === 'authenticated') {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    if (!username.trim() || !password) {
      setErrorMessage('Enter both your username and password.')
      return
    }

    setIsSubmitting(true)
    try {
      await login({ username: username.trim(), password })
      navigate(destination, { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page" aria-labelledby="login-title">
      <p className="section-kicker">WELCOME BACK</p>
      <h1 id="login-title">Sign in to Trail Notes.</h1>
      {location.state?.loginRequired && (
        <p className="auth-notice" role="status">Sign in is required to open that page.</p>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="auth-form-footer">
        New to Trail Notes? <Link to="/register">Create an account</Link>
      </p>
    </section>
  )
}

export default LoginPage
