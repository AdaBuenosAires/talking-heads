import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <div className="section">
      <div className="container-narrow">
        <h1 className="text-display-2 mb-8">{t('footer.privacy')}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Last updated: December 2024
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account,
            complete our diagnostic wizard, or contact us for support.
          </p>
          <ul>
            <li>Personal information (name, email, phone)</li>
            <li>Company information (name, size, industry)</li>
            <li>Usage data and preferences</li>
            <li>Communication records</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Communicate with you about our services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with service providers
            who assist in our operations, when required by law, or with your consent.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing</li>
            <li>Data portability</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience. See our Cookie Policy
            for more details.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes
            by posting the new policy on this page.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For questions about this Privacy Policy, please contact us at privacy@bizzer.com.
          </p>
        </div>
      </div>
    </div>
  )
}
