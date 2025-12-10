import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_CONSENT_KEY = 'bizzer_cookie_consent'

export default function CookieConsent() {
  const { t } = useTranslation()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-light-bgSecondary dark:bg-dark-bgSecondary border-t border-light-border dark:border-dark-border"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              {t('cookies.message')}{' '}
              <Link to="/cookies" className="underline hover:text-light-text dark:hover:text-dark-text">
                {t('cookies.policy')}
              </Link>
              .
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecline}
                className="btn-ghost text-sm"
              >
                {t('cookies.decline')}
              </button>
              <button
                onClick={handleAccept}
                className="btn-primary text-sm"
              >
                {t('cookies.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
