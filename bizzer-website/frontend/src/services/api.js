import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Store reference - will be set after store creation
let storeRef = null

export const setStore = (store) => {
  storeRef = store
}

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    if (!storeRef) return config

    const state = storeRef.getState()
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
    if (error.response?.status === 401 && !originalRequest._retry && storeRef) {
      originalRequest._retry = true

      try {
        // Dynamic import to avoid circular dependency
        const { refreshToken, logout } = await import('../store/slices/authSlice')
        const result = await storeRef.dispatch(refreshToken())

        if (refreshToken.fulfilled.match(result)) {
          // Retry original request with new token
          const newToken = result.payload.access
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        const { logout } = await import('../store/slices/authSlice')
        storeRef.dispatch(logout())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
