import api from './api'

const wizardService = {
  async getSteps() {
    const response = await api.get('/wizard/steps/')
    return response.data
  },

  async getStep(stepNumber) {
    const response = await api.get(`/wizard/steps/${stepNumber}/`)
    return response.data
  },

  async startSession(sessionId = null) {
    const response = await api.post('/wizard/sessions/', {
      session_id: sessionId,
    })
    return response.data
  },

  async getCurrentSession() {
    const response = await api.get('/wizard/sessions/current/')
    return response.data
  },

  async getSession(sessionId) {
    const response = await api.get(`/wizard/sessions/${sessionId}/`)
    return response.data
  },

  async submitResponse(sessionId, data) {
    const response = await api.post(
      `/wizard/sessions/${sessionId}/submit_response/`,
      data
    )
    return response.data
  },

  async completeSession(sessionId) {
    const response = await api.post(`/wizard/sessions/${sessionId}/complete/`)
    return response.data
  },

  async abandonSession(sessionId) {
    const response = await api.post(`/wizard/sessions/${sessionId}/abandon/`)
    return response.data
  },

  async getDiagnosis(diagnosisId) {
    const response = await api.get(`/wizard/diagnoses/${diagnosisId}/`)
    return response.data
  },

  async getLatestDiagnosis() {
    const response = await api.get('/wizard/diagnoses/latest/')
    return response.data
  },
}

export default wizardService
