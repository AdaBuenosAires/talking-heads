import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function FreeTrial() {
  const { t } = useTranslation()
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className="section">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-display-1 mb-6">{t('wizard.title')}</h1>
          <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary mb-10">
            {t('wizard.subtitle')}
          </p>

          {isAuthenticated ? (
            <Link to="/diagnosis" className="btn-primary text-lg px-8 py-4">
              {t('home.hero.cta')}
            </Link>
          ) : (
            <div className="space-y-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 block">
                {t('nav.register')}
              </Link>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                {t('auth.register.hasAccount')}{' '}
                <Link to="/login" className="text-light-accent dark:text-dark-accent hover:underline">
                  {t('auth.register.login')}
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
