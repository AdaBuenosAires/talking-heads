import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

// Layout components
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import CookieConsent from './components/common/CookieConsent'
import ChatWidget from './components/chat/ChatWidget'

// Pages
import Home from './pages/Home'
import FreeTrial from './pages/FreeTrial'
import DiagnosisWizard from './pages/DiagnosisWizard'
import DiagnosisResult from './pages/DiagnosisResult'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'

// Auth
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const { theme } = useSelector((state) => state.theme)

  useEffect(() => {
    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-body">
      <Navbar />
      <main className="pt-16">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/free-trial" element={<FreeTrial />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />

          {/* Protected routes */}
          <Route
            path="/diagnosis"
            element={
              <ProtectedRoute>
                <DiagnosisWizard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diagnosis/result"
            element={
              <ProtectedRoute>
                <DiagnosisResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
      <ChatWidget />
    </div>
  )
}

export default App
