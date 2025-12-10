import { createSlice } from '@reduxjs/toolkit'

// Detect browser language
const getBrowserLanguage = () => {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language || navigator.userLanguage
    return lang.startsWith('es') ? 'es' : 'en'
  }
  return 'es'
}

const initialState = {
  language: getBrowserLanguage(),
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    toggleLanguage: (state) => {
      state.language = state.language === 'es' ? 'en' : 'es'
    },
  },
})

export const { setLanguage, toggleLanguage } = languageSlice.actions
export default languageSlice.reducer
