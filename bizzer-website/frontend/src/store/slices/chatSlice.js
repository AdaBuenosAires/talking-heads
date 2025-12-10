import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import agentService from '../../services/agentService'

const initialState = {
  messages: [],
  isOpen: false,
  isLoading: false,
  error: null,
  sessionId: null,
}

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, sessionId }, { rejectWithValue }) => {
    try {
      const response = await agentService.chat(message, sessionId)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to send message' })
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen
    },
    openChat: (state) => {
      state.isOpen = true
    },
    closeChat: (state) => {
      state.isOpen = false
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload
    },
    clearMessages: (state) => {
      state.messages = []
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages.push({
          id: Date.now(),
          role: 'assistant',
          content: action.payload.response,
          timestamp: new Date().toISOString(),
        })
        if (action.payload.session_id) {
          state.sessionId = action.payload.session_id
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const {
  toggleChat,
  openChat,
  closeChat,
  addMessage,
  setSessionId,
  clearMessages,
  clearError,
} = chatSlice.actions

export default chatSlice.reducer
