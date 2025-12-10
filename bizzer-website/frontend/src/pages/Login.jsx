import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import LoginForm from '../components/auth/LoginForm'

export default function Login() {
  const { t } = useTranslation()

  return (
    <div className="section min-h-[calc(100vh-4rem)]">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-display-2 mb-2">{t('auth.login.title')}</h1>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              {t('auth.login.subtitle')}
            </p>
          </div>
          <div className="card">
            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
