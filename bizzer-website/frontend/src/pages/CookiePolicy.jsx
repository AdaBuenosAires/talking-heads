import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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

          <p>
            This Cookie Policy explains how Bizzer Inc. ("Bizzer", "we", "us", or "our")
            uses cookies and similar tracking technologies on our website and services. This policy
            should be read together with our{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>

          <h2>1. Data Controller</h2>
          <p>The data controller responsible for cookies placed on this website is:</p>
          <ul>
            <li><strong>Company Name:</strong> Bizzer Inc.</li>
            <li><strong>Registered Address:</strong> [PLACEHOLDER_US_ADDRESS], [PLACEHOLDER_US_CITY], [PLACEHOLDER_US_STATE] [PLACEHOLDER_US_ZIP], United States</li>
            <li><strong>Email:</strong> privacy@bizzer.com</li>
          </ul>

          <h3>EU Representative (Article 27 GDPR)</h3>
          <ul>
            <li><strong>Name:</strong> [PLACEHOLDER_EU_REP_NAME]</li>
            <li><strong>Address:</strong> [PLACEHOLDER_EU_REP_ADDRESS], [PLACEHOLDER_EU_REP_CITY], [PLACEHOLDER_EU_REP_COUNTRY]</li>
            <li><strong>Email:</strong> eu-representative@bizzer.com</li>
          </ul>

          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer, smartphone, or other
            device when you visit a website. They are widely used to make websites work more
            efficiently, provide a better user experience, and provide information to website owners.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your
            device for a set period or until you delete them, while session cookies are deleted
            when you close your browser.
          </p>

          <h2>3. Legal Basis for Using Cookies</h2>
          <p>
            In accordance with the EU ePrivacy Directive (2002/58/EC as amended by 2009/136/EC) and
            the General Data Protection Regulation (GDPR), we use cookies based on the following
            legal grounds:
          </p>
          <ul>
            <li>
              <strong>Strictly Necessary Cookies:</strong> These are exempt from consent requirements
              as they are essential for the website to function properly (Article 5(3) of the
              ePrivacy Directive).
            </li>
            <li>
              <strong>All Other Cookies:</strong> We require your explicit consent before placing
              these cookies on your device. We obtain this consent through our cookie consent banner
              when you first visit our website.
            </li>
          </ul>

          <h2>4. Types of Cookies We Use</h2>

          <h3>4.1 Strictly Necessary Cookies</h3>
          <p>
            These cookies are essential for you to browse our website and use its features. Without
            these cookies, services you have asked for cannot be provided. These cookies do not
            require your consent.
          </p>
          <table className="w-full border-collapse border border-light-border dark:border-dark-border my-4 text-sm">
            <thead>
              <tr className="bg-light-bgSecondary dark:bg-dark-bgSecondary">
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Cookie Name</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Provider</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Purpose</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">bizzer_cookie_consent</td>
                <td className="border border-light-border dark:border-dark-border p-2">Bizzer</td>
                <td className="border border-light-border dark:border-dark-border p-2">Stores your cookie consent preferences</td>
                <td className="border border-light-border dark:border-dark-border p-2">12 months</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">session_id</td>
                <td className="border border-light-border dark:border-dark-border p-2">Bizzer</td>
                <td className="border border-light-border dark:border-dark-border p-2">Maintains your session state while logged in</td>
                <td className="border border-light-border dark:border-dark-border p-2">Session</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">csrf_token</td>
                <td className="border border-light-border dark:border-dark-border p-2">Bizzer</td>
                <td className="border border-light-border dark:border-dark-border p-2">Security token to prevent cross-site request forgery</td>
                <td className="border border-light-border dark:border-dark-border p-2">Session</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">language</td>
                <td className="border border-light-border dark:border-dark-border p-2">Bizzer</td>
                <td className="border border-light-border dark:border-dark-border p-2">Remembers your language preference</td>
                <td className="border border-light-border dark:border-dark-border p-2">12 months</td>
              </tr>
            </tbody>
          </table>

          <h3>4.2 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting
            and reporting information. This helps us improve our website. These cookies require
            your consent.
          </p>
          <table className="w-full border-collapse border border-light-border dark:border-dark-border my-4 text-sm">
            <thead>
              <tr className="bg-light-bgSecondary dark:bg-dark-bgSecondary">
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Cookie Name</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Provider</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Purpose</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">_ga</td>
                <td className="border border-light-border dark:border-dark-border p-2">Google Analytics</td>
                <td className="border border-light-border dark:border-dark-border p-2">Distinguishes unique users by assigning a randomly generated number</td>
                <td className="border border-light-border dark:border-dark-border p-2">2 years</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">_ga_*</td>
                <td className="border border-light-border dark:border-dark-border p-2">Google Analytics</td>
                <td className="border border-light-border dark:border-dark-border p-2">Used to persist session state</td>
                <td className="border border-light-border dark:border-dark-border p-2">2 years</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">_gid</td>
                <td className="border border-light-border dark:border-dark-border p-2">Google Analytics</td>
                <td className="border border-light-border dark:border-dark-border p-2">Distinguishes users</td>
                <td className="border border-light-border dark:border-dark-border p-2">24 hours</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">_gat</td>
                <td className="border border-light-border dark:border-dark-border p-2">Google Analytics</td>
                <td className="border border-light-border dark:border-dark-border p-2">Used to throttle request rate</td>
                <td className="border border-light-border dark:border-dark-border p-2">1 minute</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Third-party provider information:</strong> Google Analytics is provided by Google LLC.
            For EU users, we use Google Analytics with IP anonymization enabled.
            For more information, see{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Google's Privacy Policy
            </a>.
          </p>

          <h3>4.3 Functionality Cookies</h3>
          <p>
            These cookies allow our website to remember choices you make (such as your username,
            language, or region) and provide enhanced, more personal features. These cookies require
            your consent.
          </p>
          <table className="w-full border-collapse border border-light-border dark:border-dark-border my-4 text-sm">
            <thead>
              <tr className="bg-light-bgSecondary dark:bg-dark-bgSecondary">
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Cookie Name</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Provider</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Purpose</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">theme_preference</td>
                <td className="border border-light-border dark:border-dark-border p-2">Bizzer</td>
                <td className="border border-light-border dark:border-dark-border p-2">Remembers your dark/light mode preference</td>
                <td className="border border-light-border dark:border-dark-border p-2">12 months</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">sidebar_state</td>
                <td className="border border-light-border dark:border-dark-border p-2">Bizzer</td>
                <td className="border border-light-border dark:border-dark-border p-2">Remembers sidebar expanded/collapsed state</td>
                <td className="border border-light-border dark:border-dark-border p-2">Session</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">recent_searches</td>
                <td className="border border-light-border dark:border-dark-border p-2">Bizzer</td>
                <td className="border border-light-border dark:border-dark-border p-2">Stores your recent search queries for quick access</td>
                <td className="border border-light-border dark:border-dark-border p-2">30 days</td>
              </tr>
            </tbody>
          </table>

          <h3>4.4 Marketing/Advertising Cookies</h3>
          <p>
            These cookies are used to track visitors across websites to display relevant advertisements.
            They are also used to limit the number of times you see an advertisement and to measure
            the effectiveness of advertising campaigns. These cookies require your consent.
          </p>
          <table className="w-full border-collapse border border-light-border dark:border-dark-border my-4 text-sm">
            <thead>
              <tr className="bg-light-bgSecondary dark:bg-dark-bgSecondary">
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Cookie Name</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Provider</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Purpose</th>
                <th className="border border-light-border dark:border-dark-border p-2 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">_fbp</td>
                <td className="border border-light-border dark:border-dark-border p-2">Meta (Facebook)</td>
                <td className="border border-light-border dark:border-dark-border p-2">Used to deliver advertisements on Facebook</td>
                <td className="border border-light-border dark:border-dark-border p-2">3 months</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">_gcl_au</td>
                <td className="border border-light-border dark:border-dark-border p-2">Google Ads</td>
                <td className="border border-light-border dark:border-dark-border p-2">Used for conversion tracking</td>
                <td className="border border-light-border dark:border-dark-border p-2">3 months</td>
              </tr>
              <tr>
                <td className="border border-light-border dark:border-dark-border p-2">li_sugr</td>
                <td className="border border-light-border dark:border-dark-border p-2">LinkedIn</td>
                <td className="border border-light-border dark:border-dark-border p-2">Used for LinkedIn ad analytics</td>
                <td className="border border-light-border dark:border-dark-border p-2">3 months</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <strong>Third-party provider information:</strong>
          </p>
          <ul className="text-sm">
            <li>
              Meta Platforms: See{' '}
              <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="underline">
                Meta Privacy Policy
              </a>
            </li>
            <li>
              Google: See{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                Google Privacy Policy
              </a>
            </li>
            <li>
              LinkedIn: See{' '}
              <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">
                LinkedIn Privacy Policy
              </a>
            </li>
          </ul>

          <h2>5. How to Manage Your Cookie Preferences</h2>

          <h3>5.1 Our Cookie Consent Tool</h3>
          <p>
            When you first visit our website, you will see a cookie consent banner that allows you
            to accept or decline non-essential cookies. You can change your preferences at any time
            by clicking the "Cookie Settings" link in the footer of our website.
          </p>

          <h3>5.2 Browser Settings</h3>
          <p>
            You can also control cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Block all cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p>
            Please note that blocking all cookies may affect your experience on our website, as some
            features may not work properly.
          </p>
          <p>Here are links to cookie management instructions for common browsers:</p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="underline">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline">
                Apple Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline">
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h3>5.3 Opt-Out of Third-Party Tracking</h3>
          <p>
            You can opt out of interest-based advertising from participating companies through:
          </p>
          <ul>
            <li>
              <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="underline">
                Your Online Choices (EU)
              </a>
            </li>
            <li>
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="underline">
                Network Advertising Initiative
              </a>
            </li>
            <li>
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="underline">
                Digital Advertising Alliance
              </a>
            </li>
          </ul>

          <h2>6. Other Tracking Technologies</h2>
          <p>
            In addition to cookies, we may use other tracking technologies:
          </p>
          <ul>
            <li>
              <strong>Web Beacons/Pixels:</strong> Small graphic images in emails or on web pages
              that help us track whether emails have been opened or pages visited.
            </li>
            <li>
              <strong>Local Storage:</strong> Similar to cookies but can store larger amounts of
              data locally on your device.
            </li>
            <li>
              <strong>Session Storage:</strong> Similar to local storage but data is cleared when
              the browser session ends.
            </li>
          </ul>
          <p>
            These technologies are governed by the same consent requirements as cookies.
          </p>

          <h2>7. Consent Withdrawal</h2>
          <p>
            You have the right to withdraw your consent at any time. Withdrawing consent does not
            affect the lawfulness of processing based on consent before its withdrawal.
          </p>
          <p>To withdraw your consent:</p>
          <ol>
            <li>Click on "Cookie Settings" in the website footer</li>
            <li>Adjust your preferences and save</li>
            <li>Or contact us at privacy@bizzer.com</li>
          </ol>
          <p>
            After withdrawing consent, non-essential cookies will be removed and will not be placed
            again unless you provide new consent.
          </p>

          <h2>8. Updates to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology,
            legislation, or our data practices. When we make changes, we will update the "Last
            updated" date at the top of this policy.
          </p>

          <h2>9. Your Rights</h2>
          <p>
            Under GDPR (for EU users) and applicable US privacy laws, you have rights regarding your personal
            data collected through cookies, including:
          </p>
          <ul>
            <li>Right to access information about cookies we use</li>
            <li>Right to withdraw consent</li>
            <li>Right to erasure of data collected via cookies</li>
            <li>Right to lodge a complaint with a supervisory authority (EU users)</li>
          </ul>
          <p>
            For more information about your rights, please see our{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy or our use of cookies, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> privacy@bizzer.com</li>
            <li><strong>Data Protection Officer:</strong> dpo@bizzer.com</li>
            <li><strong>EU Representative:</strong> eu-representative@bizzer.com</li>
            <li><strong>US Address:</strong> Bizzer Inc., [PLACEHOLDER_US_ADDRESS], [PLACEHOLDER_US_CITY], [PLACEHOLDER_US_STATE] [PLACEHOLDER_US_ZIP], USA</li>
            <li><strong>EU Address:</strong> [PLACEHOLDER_EU_REP_NAME], [PLACEHOLDER_EU_REP_ADDRESS], [PLACEHOLDER_EU_REP_CITY], [PLACEHOLDER_EU_REP_COUNTRY]</li>
          </ul>

          <h2>11. Supervisory Authority (EU Users)</h2>
          <p>
            If you believe our use of cookies violates data protection laws, you have the right to
            lodge a complaint with a supervisory authority in the EU. You may contact the supervisory
            authority in your country of residence or in [PLACEHOLDER_EU_REP_COUNTRY] where our EU
            representative is located.
          </p>
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
        </div>
      </div>
    </div>
  )
}
