import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store, persistor } from './store'
import { initializeApi } from './services/api'
import { refreshToken, logout } from './store/slices/authSlice'
import './i18n'
import './styles/globals.css'

// Initialize API with store reference (breaks circular dependency)
initializeApi(store, { refreshToken, logout })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
