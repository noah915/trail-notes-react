export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers)
  let body = options.body

  if (body !== undefined) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(body)
  }

  let response
  try {
    response = await fetch(`/api${path}`, {
      ...options,
      body,
      credentials: 'include',
      headers,
    })
  } catch (cause) {
    const error = new Error('Could not reach the authentication backend. Check that it is running.')
    error.cause = cause
    throw error
  }

  let payload
  try {
    payload = await response.json()
  } catch (cause) {
    const error = new Error(`The backend returned an invalid response (HTTP ${response.status}).`)
    error.cause = cause
    throw error
  }

  if (!response.ok) {
    throw new ApiError(payload.message || `The request failed (HTTP ${response.status}).`, response.status)
  }

  return payload
}

export async function getCurrentUser() {
  const response = await apiRequest('/auth/me')
  if (!response.data) {
    throw new Error('The backend did not return the signed-in user.')
  }
  return response.data
}
