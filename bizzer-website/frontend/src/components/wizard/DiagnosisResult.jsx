import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

export default function DiagnosisResultCard({ diagnosis }) {
  const { t } = useTranslation()
  const { language } = useSelector((state) => state.language)

  if (!diagnosis) return null

  const solutionDetails = diagnosis.solution_details
  const summary = diagnosis.diagnosis_summary
  const pitch = diagnosis.personalized_pitch
  const features = solutionDetails?.features || []
  const nextSteps = solutionDetails?.next_steps || []

  return (
    <div className="space-y-8">
      {/* Main Solution Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg text-sm rounded-full">
            {t('diagnosis.recommended')}
          </span>
        </div>

        <h2 className="text-display-3 mb-4">{solutionDetails?.title}</h2>
        <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
          {solutionDetails?.description}
        </p>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-light-bgSecondary dark:bg-dark-bgTertiary rounded-apple">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
              {t('diagnosis.urgency')}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-light-bgTertiary dark:bg-dark-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-light-accent dark:bg-dark-accent"
                  style={{ width: `${diagnosis.urgency_score * 10}%` }}
                />
              </div>
              <span className="font-medium">{diagnosis.urgency_score}/10</span>
            </div>
          </div>
          <div className="p-4 bg-light-bgSecondary dark:bg-dark-bgTertiary rounded-apple">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-1">
              {t('diagnosis.fit')}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-light-bgTertiary dark:bg-dark-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-light-accent dark:bg-dark-accent"
                  style={{ width: `${diagnosis.fit_score * 10}%` }}
                />
              </div>
              <span className="font-medium">{diagnosis.fit_score}/10</span>
            </div>
          </div>
        </div>

        {/* Personalized Pitch */}
        {pitch && (
          <div className="p-4 bg-gradient-to-r from-light-bgSecondary to-light-bgTertiary dark:from-dark-bgSecondary dark:to-dark-bgTertiary rounded-apple border-l-4 border-light-accent dark:border-dark-accent">
            <p>{pitch}</p>
          </div>
        )}
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="text-display-3 mb-4">{t('diagnosis.summary')}</h3>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">
          {summary}
        </p>
      </motion.div>

      {/* Features */}
      {features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-display-3 mb-4">{t('diagnosis.features')}</h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-light-accent dark:text-dark-accent flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-display-3 mb-4">{t('diagnosis.nextSteps')}</h3>
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-light-bgSecondary dark:bg-dark-bgTertiary rounded-apple hover:shadow-apple transition-shadow cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <span>{step}</span>
                <svg
                  className="w-5 h-5 ml-auto text-light-textSecondary dark:text-dark-textSecondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
