import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setStore } from '../services/api'
import { setAgentStore } from '../services/agentService'

import authReducer from './slices/authSlice'
import wizardReducer from './slices/wizardSlice'
import chatReducer from './slices/chatSlice'
import themeReducer from './slices/themeSlice'
import languageReducer from './slices/languageSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  wizard: wizardReducer,
  chat: chatReducer,
  theme: themeReducer,
  language: languageReducer,
})

const persistConfig = {
  key: 'bizzer',
  version: 1,
  storage,
  whitelist: ['auth', 'theme', 'language'], // Only persist these reducers
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Set store reference for api interceptors (avoids circular dependency)
setStore(store)
setAgentStore(store)

export const persistor = persistStore(store)
