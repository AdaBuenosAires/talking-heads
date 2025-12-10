import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function Home() {
  const { t } = useTranslation()

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: t('home.features.dataRoom.title'),
      description: t('home.features.dataRoom.description'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('home.features.gapAnalysis.title'),
      description: t('home.features.gapAnalysis.description'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t('home.features.dealTeaser.title'),
      description: t('home.features.dealTeaser.description'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: t('home.features.dealVisor.title'),
      description: t('home.features.dealVisor.description'),
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-light-bgSecondary to-light-bg dark:from-dark-bgSecondary dark:to-dark-bg">
        <div className="container-wide text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-1 mb-6"
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto mb-10"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/free-trial" className="btn-primary text-lg px-8 py-4">
              {t('home.hero.cta')}
            </Link>
            <a href="#features" className="btn-secondary text-lg px-8 py-4">
              {t('home.hero.ctaSecondary')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-display-2 mb-4">{t('home.features.title')}</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-light-bgSecondary dark:bg-dark-bgTertiary flex items-center justify-center text-light-accent dark:text-dark-accent">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-light-bgSecondary dark:bg-dark-bgSecondary">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-display-2 mb-4">{t('home.benefits.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔒', text: t('home.benefits.security') },
              { icon: '⚡', text: t('home.benefits.automation') },
              { icon: '🔗', text: t('home.benefits.integration') },
              { icon: '💬', text: t('home.benefits.support') },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-bg p-6 rounded-apple-lg text-center"
              >
                <span className="text-3xl mb-3 block">{benefit.icon}</span>
                <p className="font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-r from-light-bgSecondary to-light-bgTertiary dark:from-dark-bgSecondary dark:to-dark-bgTertiary"
          >
            <h2 className="text-display-2 mb-4">{t('home.cta.title')}</h2>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-8">
              {t('home.cta.subtitle')}
            </p>
            <Link to="/free-trial" className="btn-primary text-lg px-8 py-4">
              {t('home.cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
