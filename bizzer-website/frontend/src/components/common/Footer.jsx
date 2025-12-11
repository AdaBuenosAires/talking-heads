import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { openCookieSettings } from './CookieConsent'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-light-bgSecondary dark:bg-dark-bgSecondary border-t border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
              <li>
                <a href="#" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.solutions')}</h3>
            <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
              <li>
                <a href="#" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  Data Room
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  Gap Analysis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  Deal Visor
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
              <li>
                <Link to="/free-trial" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  {t('nav.freeTrial')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
              <li>
                <Link to="/terms" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-light-text dark:hover:text-dark-text transition-colors">
                  {t('footer.cookies')}
                </Link>
              </li>
              <li>
                <button
                  onClick={openCookieSettings}
                  className="hover:text-light-text dark:hover:text-dark-text transition-colors text-left"
                >
                  {t('cookies.settings')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border text-center text-light-textSecondary dark:text-dark-textSecondary">
          <p>
            &copy; {currentYear} Bizzer. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
