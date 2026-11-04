import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { apiRequest } from '../api.js'
import { useAuth } from '../auth/useAuth.js'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, status } = useAuth()
  const navigate = useNavigate()

  if (status === 'authenticated') {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    if (!username.trim() || !email.trim() || !password) {
      setErrorMessage('Complete all fields before creating your account.')
      return
    }

    setIsSubmitting(true)
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: { username: username.trim(), email: email.trim(), password },
      })
      await login({ username: username.trim(), password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page" aria-labelledby="register-title">
      <p className="section-kicker">JOIN THE FIELD GUIDE</p>
      <h1 id="register-title">Create your account.</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="auth-form-footer">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </section>
  )
}

export default RegisterPage
