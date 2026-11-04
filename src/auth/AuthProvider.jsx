import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest, getCurrentUser } from '../api.js'
import { AuthContext } from './AuthContext.js'

export function AuthProvider({ children }) {
  const [status, setStatus] = useState('loading')
  const [user, setUser] = useState(null)
  const [sessionError, setSessionError] = useState('')

  const clearUser = useCallback(() => {
    setUser(null)
    setStatus('anonymous')
    setSessionError('')
  }, [])

  useEffect(() => {
    let active = true

    getCurrentUser()
      .then((currentUser) => {
        if (active) {
          setUser(currentUser)
          setStatus('authenticated')
        }
      })
      .catch((error) => {
        if (!active) return

        if (error.status === 401) {
          setUser(null)
          setStatus('anonymous')
        } else {
          setSessionError(error.message)
          setStatus('error')
        }
      })

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (credentials) => {
    await apiRequest('/auth/login', { method: 'POST', body: credentials })
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    setStatus('authenticated')
    setSessionError('')
    return currentUser
  }, [])

  const logout = useCallback(
    () => apiRequest('/auth/logout', { method: 'POST' }),
    [],
  )

  const value = useMemo(
    () => ({ status, user, sessionError, login, logout, clearUser }),
    [status, user, sessionError, login, logout, clearUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
