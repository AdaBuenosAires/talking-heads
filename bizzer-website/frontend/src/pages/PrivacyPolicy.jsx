import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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

          <p>
            Bizzer Inc. ("Bizzer", "we", "us", or "our") is committed to protecting your
            privacy. This Privacy Policy complies with the General Data Protection Regulation (GDPR) -
            Regulation (EU) 2016/679 - for EU users and applicable US privacy laws.
          </p>

          <h2>1. Data Controller Information</h2>
          <p>The data controller responsible for your personal data is:</p>
          <ul>
            <li><strong>Company Name:</strong> Bizzer Inc.</li>
            <li><strong>Registered Address:</strong> [PLACEHOLDER_US_ADDRESS], [PLACEHOLDER_US_CITY], [PLACEHOLDER_US_STATE] [PLACEHOLDER_US_ZIP], United States</li>
            <li><strong>State of Incorporation:</strong> Delaware, USA</li>
            <li><strong>EIN:</strong> [PLACEHOLDER_EIN]</li>
            <li><strong>Email:</strong> privacy@bizzer.com</li>
            <li><strong>Phone:</strong> [PLACEHOLDER_PHONE]</li>
          </ul>

          <h2>2. EU Representative (Article 27 GDPR)</h2>
          <p>
            As a company established outside the European Union that processes personal data of EU
            residents, we have appointed an EU representative pursuant to Article 27 of the GDPR:
          </p>
          <ul>
            <li><strong>Name:</strong> [PLACEHOLDER_EU_REP_NAME]</li>
            <li><strong>Address:</strong> [PLACEHOLDER_EU_REP_ADDRESS], [PLACEHOLDER_EU_REP_CITY], [PLACEHOLDER_EU_REP_COUNTRY]</li>
            <li><strong>Email:</strong> eu-representative@bizzer.com</li>
          </ul>

          <h2>3. Data Protection Officer (DPO)</h2>
          <p>
            We have appointed a Data Protection Officer to oversee our data protection strategy and
            ensure compliance with GDPR requirements. You can contact our DPO at:
          </p>
          <ul>
            <li><strong>Email:</strong> dpo@bizzer.com</li>
            <li><strong>Address:</strong> Data Protection Officer, c/o [PLACEHOLDER_EU_REP_NAME], [PLACEHOLDER_EU_REP_ADDRESS], [PLACEHOLDER_EU_REP_CITY], [PLACEHOLDER_EU_REP_COUNTRY]</li>
          </ul>

          <h2>4. Data Processing Location</h2>
          <p>
            <strong>For EU users:</strong> All personal data of users located in the European Economic
            Area (EEA) is processed and stored exclusively on servers located within the European Union.
            Our EU data centers are located in [PLACEHOLDER_EU_DATACENTER_LOCATION] and are operated by
            [PLACEHOLDER_EU_HOSTING_PROVIDER].
          </p>
          <p>
            <strong>For US users:</strong> Your data may be processed in the United States. We maintain
            equivalent security standards across all our data centers.
          </p>

          <h2>5. Categories of Personal Data We Collect</h2>
          <p>We collect and process the following categories of personal data:</p>

          <h3>5.1 Data You Provide Directly</h3>
          <ul>
            <li><strong>Identity Data:</strong> First name, last name, username, title</li>
            <li><strong>Contact Data:</strong> Email address, telephone number, postal address</li>
            <li><strong>Professional Data:</strong> Company name, job title, industry, company size</li>
            <li><strong>Account Data:</strong> Username, password (encrypted), account preferences</li>
            <li><strong>Communication Data:</strong> Messages, support requests, feedback</li>
            <li><strong>Diagnostic Data:</strong> Responses to business diagnostic questionnaires</li>
          </ul>

          <h3>5.2 Data Collected Automatically</h3>
          <ul>
            <li><strong>Technical Data:</strong> IP address, browser type and version, device type, operating system, time zone</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, navigation paths, clicks, scrolling behavior</li>
            <li><strong>Cookie Data:</strong> See our <Link to="/cookies" className="underline">Cookie Policy</Link> for details</li>
          </ul>

          <h3>5.3 Data from Third Parties</h3>
          <ul>
            <li><strong>Social Login Data:</strong> If you sign up using Google or other social providers, we receive your name, email, and profile picture</li>
            <li><strong>Analytics Data:</strong> Aggregated data from analytics providers</li>
          </ul>

          <h2>6. Legal Basis for Processing (GDPR Article 6)</h2>
          <p>
            For EU users, we process your personal data based on the following legal grounds:
          </p>

          <table className="w-full border-collapse border border-light-border dark:border-dark-border my-4">
            <thead>
              <tr className="bg-light-bgSecondary dark:bg-dark-bgSecondary">
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Purpose</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Account registration and management</td>
                <td className="border border-light-border dark:border-dark-border p-2">Contract performance (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Providing our services</td>
                <td className="border border-light-border dark:border-dark-border p-2">Contract performance (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Business diagnostic assessments</td>
                <td className="border border-light-border dark:border-dark-border p-2">Contract performance (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Customer support</td>
                <td className="border border-light-border dark:border-dark-border p-2">Contract performance (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Marketing communications</td>
                <td className="border border-light-border dark:border-dark-border p-2">Consent (Art. 6(1)(a))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Analytics and service improvement</td>
                <td className="border border-light-border dark:border-dark-border p-2">Legitimate interest (Art. 6(1)(f))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Non-essential cookies</td>
                <td className="border border-light-border dark:border-dark-border p-2">Consent (Art. 6(1)(a))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Legal compliance and fraud prevention</td>
                <td className="border border-light-border dark:border-dark-border p-2">Legal obligation (Art. 6(1)(c))</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Security and platform protection</td>
                <td className="border border-light-border dark:border-dark-border p-2">Legitimate interest (Art. 6(1)(f))</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Legitimate Interest Assessment:</strong> Where we rely on legitimate interests,
            we have conducted a balancing test to ensure your rights and freedoms are not overridden.
            You can request details of this assessment by contacting our DPO.
          </p>

          <h2>7. How We Use Your Personal Data</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul>
            <li>Create and manage your user account</li>
            <li>Provide personalized business diagnostics and recommendations</li>
            <li>Connect you with relevant service providers</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative notifications (account updates, security alerts)</li>
            <li>Send marketing communications (only with your consent)</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Analyze usage patterns to improve our services</li>
            <li>Detect and prevent fraud and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>8. Data Sharing and Recipients</h2>
          <p>
            <strong>We do not sell your personal data.</strong> We may share your data with the
            following categories of recipients:
          </p>

          <h3>8.1 Service Providers</h3>
          <ul>
            <li><strong>Cloud Hosting (EU):</strong> [PLACEHOLDER_EU_HOSTING_PROVIDER] - for EU user data storage</li>
            <li><strong>Email Services:</strong> For transactional and marketing emails</li>
            <li><strong>Analytics:</strong> For understanding service usage (with anonymization for EU users)</li>
            <li><strong>Payment Processors:</strong> For handling payments securely</li>
            <li><strong>Customer Support Tools:</strong> For managing support requests</li>
          </ul>

          <h3>8.2 Business Partners</h3>
          <p>
            With your explicit consent, we may share your diagnostic results with service providers
            in our network to facilitate connections and provide you with relevant business solutions.
          </p>

          <h3>8.3 Legal Requirements</h3>
          <p>We may disclose your data when required by law or to:</p>
          <ul>
            <li>Comply with legal processes or government requests</li>
            <li>Enforce our Terms of Service</li>
            <li>Protect our rights, privacy, safety, or property</li>
            <li>Respond to emergencies involving potential safety threats</li>
          </ul>

          <h3>8.4 Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, or sale of assets, your personal data may be
            transferred. We will notify you of any such change and your options regarding your data.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            <strong>For EU users:</strong> Your personal data is stored and processed within the EU.
            We do not transfer EU user data outside the EEA except when strictly necessary and with
            appropriate safeguards in place.
          </p>
          <p>
            When transfers outside the EEA are necessary, we ensure appropriate safeguards:
          </p>
          <ul>
            <li><strong>Adequacy Decisions:</strong> Transfers to countries with an EU adequacy decision</li>
            <li><strong>Standard Contractual Clauses:</strong> EU-approved SCCs with data recipients</li>
            <li><strong>Supplementary Measures:</strong> Additional technical and organizational measures as required post-Schrems II</li>
          </ul>
          <p>
            You can obtain a copy of the safeguards we use by contacting our DPO at dpo@bizzer.com.
          </p>

          <h2>10. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes for
            which it was collected:
          </p>

          <table className="w-full border-collapse border border-light-border dark:border-dark-border my-4">
            <thead>
              <tr className="bg-light-bgSecondary dark:bg-dark-bgSecondary">
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Data Type</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Retention Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Account data</td>
                <td className="border border-light-border dark:border-dark-border p-2">Duration of account + 3 years after deletion</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Transaction records</td>
                <td className="border border-light-border dark:border-dark-border p-2">7 years (US tax requirements) / 6 years (EU)</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Marketing consent records</td>
                <td className="border border-light-border dark:border-dark-border p-2">Duration of consent + 3 years</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Support communications</td>
                <td className="border border-light-border dark:border-dark-border p-2">3 years from resolution</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Analytics data</td>
                <td className="border border-light-border dark:border-dark-border p-2">26 months (anonymized thereafter)</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">Cookie consent preferences</td>
                <td className="border border-light-border dark:border-dark-border p-2">12 months</td>
              </tr>
            </tbody>
          </table>

          <h2>11. Your Rights Under GDPR (EU Users)</h2>
          <p>
            As a data subject in the EU, you have the following rights under GDPR. To exercise any of these
            rights, please contact us at privacy@bizzer.com or dpo@bizzer.com.
          </p>

          <h3>11.1 Right of Access (Art. 15)</h3>
          <p>
            You have the right to obtain confirmation of whether we process your personal data and
            to access that data, along with information about how it is processed.
          </p>

          <h3>11.2 Right to Rectification (Art. 16)</h3>
          <p>
            You have the right to have inaccurate personal data corrected and incomplete data completed.
          </p>

          <h3>11.3 Right to Erasure / "Right to be Forgotten" (Art. 17)</h3>
          <p>
            You have the right to request deletion of your personal data when:
          </p>
          <ul>
            <li>The data is no longer necessary for its original purpose</li>
            <li>You withdraw consent (where consent was the legal basis)</li>
            <li>You object to processing and there are no overriding legitimate grounds</li>
            <li>The data was unlawfully processed</li>
            <li>Deletion is required for legal compliance</li>
          </ul>

          <h3>11.4 Right to Restriction of Processing (Art. 18)</h3>
          <p>
            You can request restriction of processing when you contest data accuracy, processing
            is unlawful, we no longer need the data but you need it for legal claims, or you have
            objected to processing pending verification.
          </p>

          <h3>11.5 Right to Data Portability (Art. 20)</h3>
          <p>
            You have the right to receive your personal data in a structured, commonly used, and
            machine-readable format, and to transmit that data to another controller.
          </p>

          <h3>11.6 Right to Object (Art. 21)</h3>
          <p>
            You have the right to object to processing based on legitimate interests or for direct
            marketing purposes. For direct marketing, we will stop processing immediately upon objection.
          </p>

          <h3>11.7 Rights Related to Automated Decision-Making (Art. 22)</h3>
          <p>
            You have the right not to be subject to decisions based solely on automated processing,
            including profiling, which produces legal effects or significantly affects you.
          </p>

          <h3>11.8 Right to Withdraw Consent</h3>
          <p>
            Where processing is based on consent, you may withdraw your consent at any time without
            affecting the lawfulness of processing based on consent before its withdrawal.
          </p>

          <h3>Exercising Your Rights</h3>
          <p>
            To exercise your rights, please contact us at privacy@bizzer.com. We will respond to
            your request within one month. This period may be extended by two further months for
            complex requests, in which case we will inform you of the extension.
          </p>

          <h2>12. Your Rights (US Users)</h2>
          <p>
            Depending on your state of residence, you may have rights under state privacy laws such as
            the California Consumer Privacy Act (CCPA) or similar legislation. These rights may include:
          </p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of the sale of personal information (we do not sell personal data)</li>
            <li>Right to non-discrimination for exercising privacy rights</li>
          </ul>
          <p>
            To exercise these rights, contact us at privacy@bizzer.com.
          </p>

          <h2>13. Automated Decision-Making and Profiling</h2>
          <p>
            We may use automated processing for the following purposes:
          </p>
          <ul>
            <li><strong>Business Diagnostics:</strong> Our diagnostic tools analyze your responses to provide personalized recommendations. This does not produce legal effects but helps tailor our services to your needs.</li>
            <li><strong>Service Provider Matching:</strong> We may use algorithms to match you with relevant service providers based on your business profile and needs.</li>
          </ul>
          <p>
            These automated processes do not make decisions that produce legal effects or
            significantly affect you. You can always request human intervention or object to
            automated processing by contacting us.
          </p>

          <h2>14. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to ensure a level of
            security appropriate to the risk, including:
          </p>
          <ul>
            <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
            <li>Secure password hashing and multi-factor authentication</li>
            <li>Regular security assessments and penetration testing</li>
            <li>Access controls and role-based authentication</li>
            <li>Employee training on data protection</li>
            <li>Incident response procedures</li>
            <li>Regular backups with geographic redundancy within EU</li>
            <li>SOC 2 Type II certified infrastructure</li>
          </ul>
          <p>
            In the event of a personal data breach that poses a risk to your rights and freedoms,
            we will notify the relevant supervisory authority within 72 hours and, where required,
            notify affected individuals without undue delay.
          </p>

          <h2>15. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and track information about
            your use of our services. For detailed information about the cookies we use and how to
            manage your preferences, please see our{' '}
            <Link to="/cookies" className="underline">Cookie Policy</Link>.
          </p>

          <h2>16. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 16 (or 13 in the US).
            We do not knowingly collect personal data from children. If you are a parent or guardian and
            believe your child has provided us with personal data, please contact us at
            privacy@bizzer.com, and we will take steps to delete such information.
          </p>

          <h2>17. Third-Party Links</h2>
          <p>
            Our services may contain links to third-party websites or services that are not operated
            by us. We are not responsible for the privacy practices of these third parties. We
            encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          <h2>18. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or legal requirements. We will notify you of any material changes by:
          </p>
          <ul>
            <li>Posting the updated policy on our website</li>
            <li>Updating the "Last updated" date</li>
            <li>Sending you an email notification (for registered users)</li>
          </ul>

          <h2>19. Right to Lodge a Complaint (EU Users)</h2>
          <p>
            If you believe that we have violated your data protection rights, you have the right to
            lodge a complaint with a supervisory authority. You may contact:
          </p>
          <ul>
            <li>The supervisory authority in your country of residence</li>
            <li>The supervisory authority in [PLACEHOLDER_EU_REP_COUNTRY] where our EU representative is located</li>
          </ul>
          <p>
            A list of EU supervisory authorities is available at:{' '}
            <a
              href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              https://edpb.europa.eu/about-edpb/about-edpb/members_en
            </a>
          </p>

          <h2>20. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, your personal data, or wish to
            exercise your rights, please contact us:
          </p>
          <ul>
            <li><strong>General Inquiries:</strong> privacy@bizzer.com</li>
            <li><strong>Data Protection Officer:</strong> dpo@bizzer.com</li>
            <li><strong>EU Representative:</strong> eu-representative@bizzer.com</li>
            <li><strong>US Address:</strong> Bizzer Inc., [PLACEHOLDER_US_ADDRESS], [PLACEHOLDER_US_CITY], [PLACEHOLDER_US_STATE] [PLACEHOLDER_US_ZIP], USA</li>
            <li><strong>EU Address:</strong> [PLACEHOLDER_EU_REP_NAME], [PLACEHOLDER_EU_REP_ADDRESS], [PLACEHOLDER_EU_REP_CITY], [PLACEHOLDER_EU_REP_COUNTRY]</li>
            <li><strong>Phone:</strong> [PLACEHOLDER_PHONE]</li>
          </ul>
          <p>
            We aim to respond to all legitimate requests within one month.
          </p>
        </div>
      </div>
    </div>
  )
}
