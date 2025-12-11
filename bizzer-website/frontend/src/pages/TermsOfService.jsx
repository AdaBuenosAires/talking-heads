import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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

          <h2>1. Provider Identification</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the services provided by:
          </p>
          <ul>
            <li><strong>Company Name:</strong> Bizzer Inc.</li>
            <li><strong>Registered Address:</strong> [PLACEHOLDER_US_ADDRESS], [PLACEHOLDER_US_CITY], [PLACEHOLDER_US_STATE] [PLACEHOLDER_US_ZIP], United States</li>
            <li><strong>State of Incorporation:</strong> Delaware, USA</li>
            <li><strong>EIN:</strong> [PLACEHOLDER_EIN]</li>
            <li><strong>Email:</strong> legal@bizzer.com</li>
            <li><strong>Phone:</strong> [PLACEHOLDER_PHONE]</li>
          </ul>

          <h3>EU Representative (Article 27 GDPR)</h3>
          <p>
            For users in the European Union, our designated representative pursuant to Article 27 of the GDPR is:
          </p>
          <ul>
            <li><strong>Name:</strong> [PLACEHOLDER_EU_REP_NAME]</li>
            <li><strong>Address:</strong> [PLACEHOLDER_EU_REP_ADDRESS], [PLACEHOLDER_EU_REP_CITY], [PLACEHOLDER_EU_REP_COUNTRY]</li>
            <li><strong>Email:</strong> eu-representative@bizzer.com</li>
          </ul>

          <h2>2. Acceptance of Terms</h2>
          <p>
            By accessing and using Bizzer's services, you agree to be bound by these Terms of Service,
            our <Link to="/privacy" className="underline">Privacy Policy</Link>, and our{' '}
            <Link to="/cookies" className="underline">Cookie Policy</Link>. If you do not agree with
            any of these terms, you must not use our services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and Bizzer Inc.
            regarding your use of our platform and services.
          </p>

          <h2>3. Description of Services</h2>
          <p>
            Bizzer provides a digital platform connecting businesses with service providers for
            business solutions including but not limited to:
          </p>
          <ul>
            <li>Business diagnostic tools and assessments</li>
            <li>Connection with qualified service providers</li>
            <li>Business process optimization recommendations</li>
            <li>Communication and project management tools</li>
          </ul>

          <h2>4. Data Processing Location</h2>
          <p>
            To ensure compliance with European data protection regulations, all personal data of users
            located in the European Economic Area (EEA) is processed and stored on servers located
            within the European Union. Our EU data centers are located in [PLACEHOLDER_EU_DATACENTER_LOCATION].
          </p>

          <h2>5. User Registration and Accounts</h2>
          <p>
            To access certain features of our services, you must register for an account. When registering, you agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and accept all risks of unauthorized access</li>
            <li>Immediately notify us of any unauthorized use of your account</li>
            <li>Be at least 18 years of age or have legal capacity to enter into contracts</li>
          </ul>
          <p>
            You are responsible for all activities that occur under your account. We reserve the right
            to suspend or terminate accounts that violate these Terms.
          </p>

          <h2>6. User Obligations and Prohibited Conduct</h2>
          <p>When using our services, you agree NOT to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Transmit harmful, fraudulent, or deceptive content</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use automated systems to access our services without permission</li>
            <li>Interfere with the proper functioning of our services</li>
            <li>Engage in harassment, discrimination, or abusive behavior</li>
            <li>Use the services for any illegal or unauthorized purpose</li>
          </ul>

          <h2>7. Intellectual Property Rights</h2>
          <p>
            All content, features, and functionality of our services, including but not limited to
            text, graphics, logos, icons, images, software, and the compilation thereof, are the
            exclusive property of Bizzer Inc. or its licensors and are protected by
            international copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            We grant you a limited, non-exclusive, non-transferable, and revocable license to access
            and use our services for their intended purpose, subject to these Terms.
          </p>

          <h2>8. Data Protection and Privacy</h2>
          <p>
            Your privacy is important to us. Our collection and use of personal data is governed by
            our <Link to="/privacy" className="underline">Privacy Policy</Link>, which complies with
            the General Data Protection Regulation (GDPR) for EU users and applicable US privacy laws.
          </p>
          <p>
            By using our services, you consent to the processing of your data as described in our
            Privacy Policy, where such processing is based on consent.
          </p>

          <h2>9. Right of Withdrawal (EU Consumer Users)</h2>
          <p>
            If you are a consumer (a natural person acting for purposes outside your trade, business,
            craft, or profession) within the European Union, you have the right to withdraw from any
            contract entered into with us within 14 days without giving any reason.
          </p>
          <p>
            The withdrawal period will expire after 14 days from the day of the conclusion of the contract.
          </p>
          <p>
            To exercise the right of withdrawal, you must inform us of your decision to withdraw by an
            unequivocal statement (e.g., a letter sent by post or email). You may use the model
            withdrawal form below, but it is not obligatory:
          </p>
          <div className="bg-light-bgSecondary dark:bg-dark-bgSecondary p-4 rounded-lg my-4">
            <p className="font-semibold">Model Withdrawal Form</p>
            <p>To Bizzer Inc., [PLACEHOLDER_US_ADDRESS], legal@bizzer.com:</p>
            <p>I hereby give notice that I withdraw from my contract for the provision of the following service: [describe service]</p>
            <p>Ordered on: [date] / Received on: [date]</p>
            <p>Name of consumer: [your name]</p>
            <p>Address of consumer: [your address]</p>
            <p>Signature of consumer (only if submitted on paper): [signature]</p>
            <p>Date: [date]</p>
          </div>
          <p>
            <strong>Exception:</strong> The right of withdrawal does not apply to services that have
            been fully performed if the performance has begun with your prior express consent and
            acknowledgment that you will lose your right of withdrawal once the contract has been
            fully performed by us.
          </p>

          <h2>10. Pricing and Payment</h2>
          <p>
            Prices are displayed in US Dollars (USD) for US users and Euros (EUR) for EU users.
            All prices for EU consumers include applicable taxes (VAT) unless otherwise stated.
            For business users (B2B), prices may be shown excluding VAT where applicable.
          </p>
          <p>
            We reserve the right to change our pricing at any time, but changes will not affect orders
            already placed. Payment terms and methods are specified during the checkout process.
          </p>

          <h2>11. Warranties and Disclaimers</h2>
          <p>
            We strive to provide reliable and high-quality services. However, to the extent permitted
            by applicable law:
          </p>
          <ul>
            <li>Our services are provided on an "as is" and "as available" basis</li>
            <li>We do not guarantee that our services will be uninterrupted, timely, secure, or error-free</li>
            <li>We do not warrant the accuracy or completeness of information provided through our services</li>
          </ul>
          <p>
            <strong>For consumers in the European Union:</strong> These disclaimers do not affect your
            statutory rights under applicable consumer protection laws, including the legal guarantee
            of conformity for digital services under EU Directive 2019/770.
          </p>

          <h2>12. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Bizzer Inc. shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages, including loss
            of profits, data, or goodwill.
          </p>
          <p>
            <strong>For consumers in the European Union:</strong> This limitation does not affect
            liability for death or personal injury caused by negligence, fraud, or any other liability
            that cannot be limited or excluded under applicable law.
          </p>
          <p>
            Our total liability for any claims arising from or related to these Terms or our services
            shall not exceed the amount paid by you to us in the twelve (12) months preceding the claim.
          </p>

          <h2>13. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Bizzer Inc., its officers,
            directors, employees, agents, and affiliates from and against any claims, damages, losses,
            liabilities, costs, and expenses (including legal fees) arising from your use of our
            services or violation of these Terms. This clause does not apply to EU consumers to the
            extent prohibited by applicable consumer protection laws.
          </p>

          <h2>14. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of any material
            changes by posting the updated Terms on our platform and updating the "Last updated" date.
          </p>
          <p>
            For existing users, material changes will become effective 30 days after notification.
            Your continued use of our services after that period constitutes acceptance of the modified Terms.
          </p>

          <h2>15. Termination</h2>
          <p>
            You may terminate your account at any time by contacting us at legal@bizzer.com. Upon
            termination, your right to use our services will immediately cease.
          </p>
          <p>
            We may suspend or terminate your access to our services at any time, with or without cause,
            upon notice to you. Provisions of these Terms that by their nature should survive
            termination shall survive.
          </p>

          <h2>16. Governing Law and Jurisdiction</h2>
          <p>
            <strong>For US users:</strong> These Terms shall be governed by and construed in accordance
            with the laws of the State of Delaware, United States, without regard to its conflict of
            law provisions.
          </p>
          <p>
            <strong>For EU consumers:</strong> If you are a consumer residing in the European Union, you
            will benefit from any mandatory provisions of the law of the country in which you are
            resident. Nothing in these Terms affects your rights as a consumer to rely on such mandatory
            provisions of local law. Any disputes may be brought before the courts of your country of residence.
          </p>
          <p>
            <strong>For EU business users:</strong> Disputes shall be subject to the exclusive jurisdiction
            of the courts of [PLACEHOLDER_EU_REP_COUNTRY], or at our option, the courts of Delaware, USA.
          </p>

          <h2>17. Alternative Dispute Resolution (EU Users)</h2>
          <p>
            In accordance with Regulation (EU) No 524/2013, we inform you that the European Commission
            provides an Online Dispute Resolution (ODR) platform, which you can access at:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            Our email address for ODR purposes is: legal@bizzer.com
          </p>
          <p>
            We are committed to resolving disputes amicably and are willing to participate in
            out-of-court dispute resolution procedures before a consumer arbitration body.
          </p>

          <h2>18. Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid, illegal, or unenforceable, the
            remaining provisions shall continue in full force and effect. The invalid provision shall
            be replaced by a valid provision that most closely achieves the economic and legal purpose
            of the original provision.
          </p>

          <h2>19. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire
            agreement between you and Bizzer Inc. regarding your use of our services and
            supersede any prior agreements.
          </p>

          <h2>20. Language</h2>
          <p>
            These Terms are provided in English and Spanish. In case of any discrepancy between
            language versions, the English version shall prevail.
          </p>

          <h2>21. Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service, please contact us at:
          </p>
          <ul>
            <li><strong>Email:</strong> legal@bizzer.com</li>
            <li><strong>US Address:</strong> Bizzer Inc., [PLACEHOLDER_US_ADDRESS], [PLACEHOLDER_US_CITY], [PLACEHOLDER_US_STATE] [PLACEHOLDER_US_ZIP], USA</li>
            <li><strong>EU Representative:</strong> [PLACEHOLDER_EU_REP_NAME], [PLACEHOLDER_EU_REP_ADDRESS], [PLACEHOLDER_EU_REP_CITY], [PLACEHOLDER_EU_REP_COUNTRY]</li>
            <li><strong>Phone:</strong> [PLACEHOLDER_PHONE]</li>
          </ul>
          <p>
            We will endeavor to respond to all inquiries within 30 days.
          </p>
        </div>
      </div>
    </div>
  )
}
