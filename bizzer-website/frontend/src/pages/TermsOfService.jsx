import { useTranslation } from 'react-i18next'

export default function TermsOfService() {
  const { t } = useTranslation()

  return (
    <div className="section">
      <div className="container-narrow">
        <h1 className="text-display-2 mb-8">{t('footer.terms')}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Last updated: December 2024
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Bizzer's services, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any of these terms,
            you are prohibited from using or accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use Bizzer's services for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate and complete information.
            You are responsible for safeguarding the password and for all activities that occur under
            your account.
          </p>

          <h2>4. Privacy</h2>
          <p>
            Your use of Bizzer's services is also governed by our Privacy Policy. Please review our
            Privacy Policy for information on how we collect, use, and share your information.
          </p>

          <h2>5. Disclaimer</h2>
          <p>
            The services are provided on an "as is" and "as available" basis. Bizzer makes no
            warranties, expressed or implied, and hereby disclaims all other warranties.
          </p>

          <h2>6. Limitations</h2>
          <p>
            In no event shall Bizzer be liable for any damages arising out of the use or inability
            to use the services.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable laws.
          </p>

          <h2>8. Contact</h2>
          <p>
            For any questions regarding these Terms of Service, please contact us at legal@bizzer.com.
          </p>
        </div>
      </div>
    </div>
  )
}
