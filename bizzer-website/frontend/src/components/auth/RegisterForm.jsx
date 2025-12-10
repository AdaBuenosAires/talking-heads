import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { register, login, clearError } from '../../store/slices/authSlice'
import LoadingSpinner from '../common/LoadingSpinner'

export default function RegisterForm() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    re_password: '',
    first_name: '',
    last_name: '',
    company: '',
    company_size: '',
    industry: '',
    phone: '',
    job_title: '',
    accepted_terms: false,
    accepted_privacy: false,
    marketing_consent: false,
  })

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
    if (error) dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.re_password) {
      return
    }

    const result = await dispatch(register(formData))

    if (register.fulfilled.match(result)) {
      // Auto-login after registration
      const loginResult = await dispatch(
        login({ email: formData.email, password: formData.password })
      )

      if (login.fulfilled.match(loginResult)) {
        navigate('/diagnosis')
      }
    }
  }

  const companySizes = [
    { value: 'startup', label: t('auth.companySizes.startup') },
    { value: 'pyme', label: t('auth.companySizes.pyme') },
    { value: 'midmarket', label: t('auth.companySizes.midmarket') },
    { value: 'enterprise', label: t('auth.companySizes.enterprise') },
  ]

  const industries = [
    { value: 'finance', label: t('auth.industries.finance') },
    { value: 'tech', label: t('auth.industries.tech') },
    { value: 'legal', label: t('auth.industries.legal') },
    { value: 'accounting', label: t('auth.industries.accounting') },
    { value: 'healthcare', label: t('auth.industries.healthcare') },
    { value: 'manufacturing', label: t('auth.industries.manufacturing') },
    { value: 'public', label: t('auth.industries.public') },
    { value: 'other', label: t('auth.industries.other') },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-apple text-red-600 dark:text-red-400 text-sm">
          {typeof error === 'object' ? JSON.stringify(error) : error}
        </div>
      )}

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.firstName')} *
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.lastName')} *
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('auth.register.email')} *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.password')} *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
            minLength={8}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.confirmPassword')} *
          </label>
          <input
            type="password"
            name="re_password"
            value={formData.re_password}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('auth.register.company')} *
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      {/* Company Size & Industry */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.companySize')} *
          </label>
          <select
            name="company_size"
            value={formData.company_size}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">-</option>
            {companySizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.industry')} *
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">-</option>
            {industries.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.phone')}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t('auth.register.jobTitle')}
          </label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      {/* Terms & Privacy */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="accepted_terms"
            checked={formData.accepted_terms}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <span className="text-sm">
            {t('auth.register.terms')}{' '}
            <Link to="/terms" className="text-light-accent dark:text-dark-accent hover:underline">
              {t('auth.register.termsLink')}
            </Link>{' '}
            {t('auth.register.privacy')}{' '}
            <Link to="/privacy" className="text-light-accent dark:text-dark-accent hover:underline">
              {t('auth.register.privacyLink')}
            </Link>{' '}
            *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="accepted_privacy"
            checked={formData.accepted_privacy}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <span className="text-sm">
            {t('auth.register.privacy')}{' '}
            <Link to="/privacy" className="text-light-accent dark:text-dark-accent hover:underline">
              {t('auth.register.privacyLink')}
            </Link>{' '}
            *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="marketing_consent"
            checked={formData.marketing_consent}
            onChange={handleChange}
            className="mt-1"
          />
          <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
            {t('auth.register.marketing')}
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.accepted_terms || !formData.accepted_privacy}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isLoading ? <LoadingSpinner size="sm" /> : t('auth.register.submit')}
      </button>

      <p className="text-center text-sm text-light-textSecondary dark:text-dark-textSecondary">
        {t('auth.register.hasAccount')}{' '}
        <Link
          to="/login"
          className="text-light-accent dark:text-dark-accent hover:underline"
        >
          {t('auth.register.login')}
        </Link>
      </p>
    </form>
  )
}
