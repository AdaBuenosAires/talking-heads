import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fetchLatestDiagnosis } from '../store/slices/wizardSlice'
import { fetchCurrentUser } from '../store/slices/authSlice'
import ChatWidget from '../components/chat/ChatWidget'

export default function Dashboard() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { diagnosis } = useSelector((state) => state.wizard)
  const { language } = useSelector((state) => state.language)

  useEffect(() => {
    dispatch(fetchCurrentUser())
    dispatch(fetchLatestDiagnosis())
  }, [dispatch])

  const solutionDetails = diagnosis?.solution_details

  return (
    <div className="section">
      <div className="container-wide">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-display-2 mb-2">
            {t('dashboard.welcome')}, {user?.first_name || 'User'}
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            {user?.company}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Diagnosis Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-display-3 mb-4">{t('dashboard.yourDiagnosis')}</h2>

              {diagnosis ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg text-sm rounded-full">
                      {t('diagnosis.recommended')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {solutionDetails?.title}
                  </h3>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                    {solutionDetails?.description}
                  </p>
                  <Link
                    to="/diagnosis/result"
                    className="text-light-accent dark:text-dark-accent hover:underline"
                  >
                    {t('common.learnMore')} →
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                    {t('dashboard.noDiagnosis')}
                  </p>
                  <Link to="/diagnosis" className="btn-primary">
                    {t('dashboard.startDiagnosis')}
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="font-semibold mb-4">{t('dashboard.quickActions')}</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-apple hover:bg-light-bgSecondary dark:hover:bg-dark-bgTertiary transition-colors flex items-center gap-3">
                  <svg className="w-5 h-5 text-light-accent dark:text-dark-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('dashboard.scheduleCall')}
                </button>
                <button className="w-full text-left p-3 rounded-apple hover:bg-light-bgSecondary dark:hover:bg-dark-bgTertiary transition-colors flex items-center gap-3">
                  <svg className="w-5 h-5 text-light-accent dark:text-dark-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('dashboard.downloadDocs')}
                </button>
                <button className="w-full text-left p-3 rounded-apple hover:bg-light-bgSecondary dark:hover:bg-dark-bgTertiary transition-colors flex items-center gap-3">
                  <svg className="w-5 h-5 text-light-accent dark:text-dark-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {t('dashboard.contactSupport')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  )
}
