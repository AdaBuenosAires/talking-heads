import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Store reference (set after store initialization to avoid circular import)
let storeRef = null
let authActions = null

export const initializeApi = (store, actions) => {
  storeRef = store
  authActions = actions
}

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    if (storeRef) {
      const state = storeRef.getState()
      const token = state.auth?.tokens?.access

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      const language = state.language?.language || 'es'
      config.headers['Accept-Language'] = language
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry && storeRef && authActions) {
      originalRequest._retry = true

      try {
        const result = await storeRef.dispatch(authActions.refreshToken())

        if (authActions.refreshToken.fulfilled.match(result)) {
          const newToken = result.payload.access
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        storeRef.dispatch(authActions.logout())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
