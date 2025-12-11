import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  submitResponse,
  completeWizard,
  saveResponse,
} from '../../store/slices/wizardSlice'
import QuickWinCard from './QuickWinCard'
import LoadingSpinner from '../common/LoadingSpinner'

export default function WizardStep({ step, totalSteps }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { language } = useSelector((state) => state.language)
  const { session, responses, isLoading, stepStartTime, currentStep } = useSelector(
    (state) => state.wizard
  )

  const [selectedValue, setSelectedValue] = useState('')
  const [textValue, setTextValue] = useState('')

  // Get localized content
  const title = language === 'es' ? step.title_es : step.title_en
  const quickWin = language === 'es' ? step.quick_win_es : step.quick_win_en
  const placeholder = language === 'es' ? step.placeholder_es : step.placeholder_en

  // Get options with localized labels and ensure each has a unique identifier
  const options = step.options?.map((opt, index) => ({
    ...opt,
    id: opt.id ?? opt.value ?? index,
    label: language === 'es' ? opt.label_es : opt.label_en,
  })) || []

  // Restore previous response if exists
  useEffect(() => {
    const previousResponse = responses[step.step_number]
    if (previousResponse) {
      if (step.question_type === 'text') {
        setTextValue(previousResponse)
      } else {
        setSelectedValue(previousResponse)
      }
    } else {
      setSelectedValue('')
      setTextValue('')
    }
  }, [step.step_number, responses, step.question_type])

  const calculateTimeSpent = () => {
    if (!stepStartTime) return 0
    return Math.round((Date.now() - stepStartTime) / 1000)
  }

  const handleSubmit = async () => {
    const value = step.question_type === 'text' ? textValue : selectedValue

    if (!value && step.is_required) return

    // Save locally
    dispatch(saveResponse({ stepNumber: step.step_number, value }))

    // Submit to server
    const timeSpent = calculateTimeSpent()

    await dispatch(
      submitResponse({
        sessionId: session.id,
        stepNumber: step.step_number,
        responseValue: value,
        timeSpent,
      })
    )

    // Check if this was the last step
    if (step.step_number >= totalSteps) {
      const result = await dispatch(completeWizard(session.id))
      if (completeWizard.fulfilled.match(result)) {
        navigate('/diagnosis/result')
      }
    }
  }

  const isValid = step.question_type === 'text' ? textValue.trim() : selectedValue

  return (
    <motion.div
      key={step.step_number}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      {/* Quick Win */}
      {quickWin && <QuickWinCard content={quickWin} />}

      {/* Question */}
      <h2 className="text-display-3 mb-6">{title}</h2>

      {/* Options/Input */}
      {step.question_type === 'single_choice' && (
        <div className="space-y-3 mb-8">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedValue(option.id)}
              className={`w-full text-left p-4 rounded-apple border transition-all duration-300 ${
                selectedValue === option.id
                  ? 'border-light-accent dark:border-dark-accent bg-light-bgSecondary dark:bg-dark-bgTertiary'
                  : 'border-light-border dark:border-dark-border hover:bg-light-bgSecondary dark:hover:bg-dark-bgTertiary'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedValue === option.id
                      ? 'border-light-accent dark:border-dark-accent'
                      : 'border-light-border dark:border-dark-border'
                  }`}
                >
                  {selectedValue === option.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-light-accent dark:bg-dark-accent" />
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {step.question_type === 'text' && (
        <textarea
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder={placeholder || t('wizard.placeholder')}
          className="input min-h-32 mb-8"
        />
      )}

      {step.question_type === 'multiple_choice' && (
        <div className="space-y-3 mb-8">
          {options.map((option) => {
            const isSelected = selectedValue.includes(option.id)
            return (
              <button
                key={option.id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedValue(
                      selectedValue.filter((v) => v !== option.id)
                    )
                  } else {
                    setSelectedValue([...selectedValue, option.id])
                  }
                }}
                className={`w-full text-left p-4 rounded-apple border transition-all duration-300 ${
                  isSelected
                    ? 'border-light-accent dark:border-dark-accent bg-light-bgSecondary dark:bg-dark-bgTertiary'
                    : 'border-light-border dark:border-dark-border hover:bg-light-bgSecondary dark:hover:bg-dark-bgTertiary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-light-accent dark:border-dark-accent bg-light-accent dark:bg-dark-accent'
                        : 'border-light-border dark:border-dark-border'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white dark:text-dark-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{option.label}</span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || isLoading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : currentStep >= totalSteps ? (
          t('common.finish')
        ) : (
          t('common.continue')
        )}
      </button>
    </motion.div>
  )
}
