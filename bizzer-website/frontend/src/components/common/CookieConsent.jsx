import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_CONSENT_KEY = 'bizzer_cookie_consent'

const defaultPreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  functionality: false,
  marketing: false,
}

export default function CookieConsent() {
  const { t } = useTranslation()
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState(defaultPreferences)

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!savedConsent) {
      setShowBanner(true)
    } else {
      try {
        const parsed = JSON.parse(savedConsent)
        if (parsed.preferences) {
          setPreferences({ ...defaultPreferences, ...parsed.preferences })
        }
      } catch (e) {
        // Legacy format or invalid, show banner again
        setShowBanner(true)
      }
    }
  }, [])

  const saveConsent = (prefs) => {
    const consentData = {
      version: '2.0',
      timestamp: new Date().toISOString(),
      preferences: prefs,
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
    setShowBanner(false)
    setShowSettings(false)

    // Here you would typically trigger/disable analytics, marketing scripts based on preferences
    // For example: window.gtag && window.gtag('consent', 'update', { analytics_storage: prefs.analytics ? 'granted' : 'denied' })
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functionality: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    saveConsent(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functionality: false,
      marketing: false,
    }
    setPreferences(onlyNecessary)
    saveConsent(onlyNecessary)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
  }

  const handlePreferenceChange = (key) => {
    if (key === 'necessary') return // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  // Cookie category descriptions
  const cookieCategories = [
    {
      key: 'necessary',
      title: t('cookies.categories.necessary.title', 'Strictly Necessary'),
      description: t('cookies.categories.necessary.description', 'Essential for the website to function. Cannot be disabled.'),
      required: true,
    },
    {
      key: 'analytics',
      title: t('cookies.categories.analytics.title', 'Analytics'),
      description: t('cookies.categories.analytics.description', 'Help us understand how visitors interact with our website.'),
      required: false,
    },
    {
      key: 'functionality',
      title: t('cookies.categories.functionality.title', 'Functionality'),
      description: t('cookies.categories.functionality.description', 'Enable enhanced features and personalization.'),
      required: false,
    },
    {
      key: 'marketing',
      title: t('cookies.categories.marketing.title', 'Marketing'),
      description: t('cookies.categories.marketing.description', 'Used to display relevant advertisements.'),
      required: false,
    },
  ]

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-light-bgSecondary dark:bg-dark-bgSecondary border-t border-light-border dark:border-dark-border shadow-lg"
        >
          <div className="max-w-6xl mx-auto p-4">
            {!showSettings ? (
              // Main Banner View
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">
                      {t('cookies.banner.title', 'We value your privacy')}
                    </h3>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      {t('cookies.banner.description', 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.')}{' '}
                      <Link to="/cookies" className="underline hover:text-light-text dark:hover:text-dark-text">
                        {t('cookies.policy', 'Cookie Policy')}
                      </Link>
                      {' | '}
                      <Link to="/privacy" className="underline hover:text-light-text dark:hover:text-dark-text">
                        {t('footer.privacy', 'Privacy Policy')}
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={toggleSettings}
                      className="btn-ghost text-sm px-4 py-2"
                    >
                      {t('cookies.settings', 'Cookie Settings')}
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="btn-ghost text-sm px-4 py-2"
                    >
                      {t('cookies.rejectAll', 'Reject All')}
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      {t('cookies.acceptAll', 'Accept All')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Settings View
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-light-text dark:text-dark-text">
                    {t('cookies.settings', 'Cookie Settings')}
                  </h3>
                  <button
                    onClick={toggleSettings}
                    className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text"
                    aria-label="Close settings"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  {t('cookies.settingsDescription', 'Manage your cookie preferences below. You can enable or disable different types of cookies. Note that disabling some cookies may affect your experience on our website.')}
                </p>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cookieCategories.map((category) => (
                    <div
                      key={category.key}
                      className="flex items-start justify-between p-3 bg-light-bg dark:bg-dark-bg rounded-lg"
                    >
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-light-text dark:text-dark-text">
                            {category.title}
                          </span>
                          {category.required && (
                            <span className="text-xs px-2 py-0.5 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded text-light-textSecondary dark:text-dark-textSecondary">
                              {t('cookies.required', 'Required')}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
                          {category.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={preferences[category.key]}
                          onChange={() => handlePreferenceChange(category.key)}
                          disabled={category.required}
                        />
                        <div className={`w-11 h-6 rounded-full peer
                          ${category.required
                            ? 'bg-green-500 cursor-not-allowed'
                            : 'bg-gray-300 dark:bg-gray-600 peer-checked:bg-green-500'
                          }
                          peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:after:translate-x-full`}
                        />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-light-border dark:border-dark-border">
                  <button
                    onClick={handleRejectAll}
                    className="btn-ghost text-sm px-4 py-2"
                  >
                    {t('cookies.rejectAll', 'Reject All')}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="btn-ghost text-sm px-4 py-2"
                  >
                    {t('cookies.acceptAll', 'Accept All')}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    {t('cookies.savePreferences', 'Save Preferences')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Export a function to open cookie settings from anywhere (e.g., footer link)
export function openCookieSettings() {
  localStorage.removeItem(COOKIE_CONSENT_KEY)
  window.location.reload()
}
