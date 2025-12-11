import api from './api'

const authService = {
  async login(credentials) {
    const response = await api.post('/auth/jwt/create/', credentials)
    return response.data
  },

  async register(userData) {
    const response = await api.post('/auth/users/', userData)
    return response.data
  },

  async logout() {
    // Token invalidation is handled client-side by removing from storage
    // Server-side blacklisting is optional and not implemented
    return Promise.resolve()
  },

  async refreshToken(refreshToken) {
    const response = await api.post('/auth/jwt/refresh/', {
      refresh: refreshToken,
    })
    return response.data
  },

  async getCurrentUser() {
    const response = await api.get('/auth/users/me/')
    return response.data
  },

  async updateProfile(data) {
    const response = await api.patch('/users/me/', data)
    return response.data
  },

  async updateLanguage(language) {
    const response = await api.post('/users/update_language/', { language })
    return response.data
  },

  async changePassword(data) {
    const response = await api.post('/auth/users/set_password/', data)
    return response.data
  },

  async resetPasswordRequest(email) {
    const response = await api.post('/auth/users/reset_password/', { email })
    return response.data
  },

  async resetPasswordConfirm(data) {
    const response = await api.post('/auth/users/reset_password_confirm/', data)
    return response.data
  },
}

export default authService
