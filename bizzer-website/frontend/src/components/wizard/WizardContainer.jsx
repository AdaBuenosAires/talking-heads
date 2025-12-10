import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fetchSteps, startSession } from '../../store/slices/wizardSlice'
import WizardProgress from './WizardProgress'
import WizardStep from './WizardStep'
import LoadingSpinner from '../common/LoadingSpinner'

export default function WizardContainer() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { steps, session, currentStep, isLoading } = useSelector((state) => state.wizard)

  useEffect(() => {
    // Fetch steps and start session when component mounts
    dispatch(fetchSteps())
    dispatch(startSession())
  }, [dispatch])

  if (isLoading && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const currentStepData = steps.find((s) => s.step_number === currentStep)
  const totalSteps = steps.length || 6

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-display-2 mb-4">{t('wizard.title')}</h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            {t('wizard.subtitle')}
          </p>
        </motion.div>

        {/* Progress */}
        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Step Content */}
        {currentStepData && (
          <WizardStep
            step={currentStepData}
            totalSteps={totalSteps}
          />
        )}
      </div>
    </div>
  )
}
