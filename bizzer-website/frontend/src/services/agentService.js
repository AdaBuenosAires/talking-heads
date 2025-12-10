import axios from 'axios'

const AGENTS_URL = import.meta.env.VITE_AGENTS_URL || '/agents'

const agentApi = axios.create({
  baseURL: AGENTS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Lazy import to avoid circular dependency
const getStore = () => require('../store').store

// Request interceptor - Add auth token
agentApi.interceptors.request.use(
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

const agentService = {
  async chat(message, sessionId = null) {
    const response = await agentApi.post('/chat/', {
      message,
      session_id: sessionId,
    })
    return response.data
  },

  async getHistory(sessionId) {
    const response = await agentApi.get(`/chat/history/${sessionId}/`)
    return response.data
  },

  async healthCheck() {
    const response = await agentApi.get('/health/')
    return response.data
  },

  async uploadDocument(file, metadata = {}) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('metadata', JSON.stringify(metadata))
    const response = await agentApi.post('/knowledge/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async searchKnowledge(query) {
    const response = await agentApi.get('/knowledge/search/', {
      params: { query },
    })
    return response.data
  },
}

export default agentService
