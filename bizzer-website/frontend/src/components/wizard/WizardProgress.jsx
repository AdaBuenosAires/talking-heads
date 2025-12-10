import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function WizardProgress({ currentStep, totalSteps }) {
  const { t } = useTranslation()
  const progress = ((currentStep - 1) / totalSteps) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
          {t('wizard.step')} {currentStep} {t('wizard.of')} {totalSteps}
        </span>
        <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
