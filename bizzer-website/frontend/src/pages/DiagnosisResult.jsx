import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fetchLatestDiagnosis } from '../store/slices/wizardSlice'
import DiagnosisResultCard from '../components/wizard/DiagnosisResult'
import ChatWidget from '../components/chat/ChatWidget'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function DiagnosisResult() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { diagnosis, isLoading } = useSelector((state) => state.wizard)

  useEffect(() => {
    if (!diagnosis) {
      dispatch(fetchLatestDiagnosis())
    }
  }, [dispatch, diagnosis])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            {t('wizard.analyzing')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-display-2 mb-4">{t('diagnosis.title')}</h1>
        </motion.div>

        {diagnosis ? (
          <>
            <DiagnosisResultCard diagnosis={diagnosis} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="btn-primary">
                {t('diagnosis.scheduleDemo')}
              </button>
              <Link to="/dashboard" className="btn-secondary">
                {t('diagnosis.goToDashboard')}
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
              {t('dashboard.noDiagnosis')}
            </p>
            <Link to="/diagnosis" className="btn-primary">
              {t('dashboard.startDiagnosis')}
            </Link>
          </div>
        )}
      </div>
      <ChatWidget />
    </div>
  )
}
