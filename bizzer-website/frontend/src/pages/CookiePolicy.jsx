import { useTranslation } from 'react-i18next'

export default function CookiePolicy() {
  const { t } = useTranslation()

  return (
    <div className="section">
      <div className="container-narrow">
        <h1 className="text-display-2 mb-8">{t('footer.cookies')}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Last updated: December 2024
          </p>

          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you
            visit our website. They help us provide you with a better experience.
          </p>

          <h2>Types of Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core
            functionality such as security, network management, and accessibility.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting
            and reporting information anonymously.
          </p>

          <h3>Functionality Cookies</h3>
          <p>
            These cookies enable the website to provide enhanced functionality and personalization,
            such as remembering your preferences and settings.
          </p>

          <h3>Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites to display relevant and
            engaging advertisements.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            You can set your browser to refuse all or some browser cookies, or to alert you when
            websites set or access cookies. If you disable or refuse cookies, some parts of this
            website may become inaccessible or not function properly.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at privacy@bizzer.com.
          </p>
        </div>
      </div>
    </div>
  )
}
