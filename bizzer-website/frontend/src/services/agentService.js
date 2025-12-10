import axios from 'axios'

const AGENTS_URL = import.meta.env.VITE_AGENTS_URL || '/agents'

const agentApi = axios.create({
  baseURL: AGENTS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Set auth token dynamically (avoids circular import)
export const setAuthToken = (token) => {
  if (token) {
    agentApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete agentApi.defaults.headers.common['Authorization']
  }
}

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
