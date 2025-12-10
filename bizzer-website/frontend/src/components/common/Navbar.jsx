import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { logout } from '../../store/slices/authSlice'
import ThemeToggle from './ThemeToggle'
import LanguageSelector from './LanguageSelector'

export default function Navbar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-display font-bold text-xl">
            Bizzer
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/free-trial"
              className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
            >
              {t('nav.freeTrial')}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  {t('nav.dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary">
                  {t('nav.register')}
                </Link>
              </>
            )}

            <div className="flex items-center gap-4 pl-4 border-l border-light-border dark:border-dark-border">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-light-border dark:border-dark-border"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/free-trial"
                className="block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.freeTrial')}
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="block py-2 w-full text-left"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}

              <div className="flex items-center gap-4 pt-4 border-t border-light-border dark:border-dark-border">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
