import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

const initialState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Login failed' })
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Registration failed' })
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState }) => {
    const { tokens } = getState().auth
    if (tokens?.refresh) {
      await authService.logout(tokens.refresh)
    }
    return null
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { tokens } = getState().auth
      if (!tokens?.refresh) {
        return rejectWithValue({ detail: 'No refresh token' })
      }
      const response = await authService.refreshToken(tokens.refresh)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Token refresh failed' })
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch user' })
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setTokens: (state, action) => {
      state.tokens = action.payload
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.tokens = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        }
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.tokens = null
        state.isAuthenticated = false
      })
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.tokens = {
          ...state.tokens,
          access: action.payload.access,
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null
        state.tokens = null
        state.isAuthenticated = false
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null
        state.tokens = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, setTokens } = authSlice.actions
export default authSlice.reducer
