import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Lazy import to avoid circular dependency
// store -> authSlice -> authService -> api -> store
const getStore = () => require('../store').store
const getAuthActions = () => require('../store/slices/authSlice')

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const store = getStore()
    const state = store.getState()
    const token = state.auth.tokens?.access

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add language header
    const language = state.language?.language || 'es'
    config.headers['Accept-Language'] = language

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and not already retrying, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const store = getStore()
        const { refreshToken, logout } = getAuthActions()
        const result = await store.dispatch(refreshToken())

        if (refreshToken.fulfilled.match(result)) {
          // Retry original request with new token
          const newToken = result.payload.access
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        const store = getStore()
        const { logout } = getAuthActions()
        store.dispatch(logout())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
