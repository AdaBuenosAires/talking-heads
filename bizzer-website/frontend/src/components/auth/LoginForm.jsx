import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { login, clearError } from '../../store/slices/authSlice'
import LoadingSpinner from '../common/LoadingSpinner'

export default function LoginForm() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(formData))

    if (login.fulfilled.match(result)) {
      // Redirect to the page they were trying to access, or dashboard
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-apple text-red-600 dark:text-red-400 text-sm">
          {error.detail || t('common.error')}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('auth.login.email')}
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

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('auth.login.password')}
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text"
        >
          {t('auth.login.forgotPassword')}
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? <LoadingSpinner size="sm" /> : t('auth.login.submit')}
      </button>

      <p className="text-center text-sm text-light-textSecondary dark:text-dark-textSecondary">
        {t('auth.login.noAccount')}{' '}
        <Link
          to="/register"
          className="text-light-accent dark:text-dark-accent hover:underline"
        >
          {t('auth.login.register')}
        </Link>
      </p>
    </form>
  )
}
