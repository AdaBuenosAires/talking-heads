import axios from 'axios'

const AGENTS_URL = import.meta.env.VITE_AGENTS_URL || '/agents'

const agentApi = axios.create({
  baseURL: AGENTS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Store reference - will be set after store creation
let storeRef = null

export const setAgentStore = (store) => {
  storeRef = store
}

// Request interceptor - Add auth token
agentApi.interceptors.request.use(
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
