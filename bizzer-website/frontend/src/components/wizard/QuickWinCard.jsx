import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function QuickWinCard({ content }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="quick-win mb-6"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-light-accent dark:bg-dark-accent flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-white dark:text-dark-bg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-light-accent dark:text-dark-accent mb-1">
            {t('wizard.quickWin')}
          </p>
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
