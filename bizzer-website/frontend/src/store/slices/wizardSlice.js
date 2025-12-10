import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import wizardService from '../../services/wizardService'

const initialState = {
  session: null,
  steps: [],
  currentStep: 1,
  responses: {},
  diagnosis: null,
  isLoading: false,
  error: null,
  stepStartTime: null,
}

export const fetchSteps = createAsyncThunk(
  'wizard/fetchSteps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wizardService.getSteps()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch steps' })
    }
  }
)

export const startSession = createAsyncThunk(
  'wizard/startSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wizardService.startSession()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to start session' })
    }
  }
)

export const submitResponse = createAsyncThunk(
  'wizard/submitResponse',
  async ({ sessionId, stepNumber, responseValue, responseData, timeSpent }, { rejectWithValue }) => {
    try {
      const response = await wizardService.submitResponse(sessionId, {
        step_number: stepNumber,
        response_value: responseValue,
        response_data: responseData || {},
        time_spent_seconds: timeSpent || 0,
      })
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to submit response' })
    }
  }
)

export const completeWizard = createAsyncThunk(
  'wizard/complete',
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await wizardService.completeSession(sessionId)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to complete wizard' })
    }
  }
)

export const fetchLatestDiagnosis = createAsyncThunk(
  'wizard/fetchLatestDiagnosis',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wizardService.getLatestDiagnosis()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch diagnosis' })
    }
  }
)

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
      state.stepStartTime = Date.now()
    },
    saveResponse: (state, action) => {
      const { stepNumber, value } = action.payload
      state.responses[stepNumber] = value
    },
    startStepTimer: (state) => {
      state.stepStartTime = Date.now()
    },
    resetWizard: (state) => {
      state.session = null
      state.currentStep = 1
      state.responses = {}
      state.diagnosis = null
      state.stepStartTime = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Steps
      .addCase(fetchSteps.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.isLoading = false
        state.steps = action.payload.steps
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Start Session
      .addCase(startSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.session = action.payload
        state.currentStep = action.payload.current_step
        state.stepStartTime = Date.now()
      })
      .addCase(startSession.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Submit Response
      .addCase(submitResponse.pending, (state) => {
        state.isLoading = true
      })
      .addCase(submitResponse.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentStep = action.payload.current_step
        state.stepStartTime = Date.now()
      })
      .addCase(submitResponse.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Complete Wizard
      .addCase(completeWizard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(completeWizard.fulfilled, (state, action) => {
        state.isLoading = false
        state.diagnosis = action.payload
        if (state.session) {
          state.session.status = 'completed'
        }
      })
      .addCase(completeWizard.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Latest Diagnosis
      .addCase(fetchLatestDiagnosis.fulfilled, (state, action) => {
        state.diagnosis = action.payload
      })
  },
})

export const {
  setCurrentStep,
  saveResponse,
  startStepTimer,
  resetWizard,
  clearError,
} = wizardSlice.actions

export default wizardSlice.reducer
