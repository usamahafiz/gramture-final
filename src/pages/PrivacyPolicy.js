import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../assets/css/privacypolicy.css"; // Custom CSS for additional styling

const PrivacyPolicy = () => {
  const [lastUpdatedDate, setLastUpdatedDate] = useState("");

  // Set the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
    setLastUpdatedDate(formattedDate);
  }, []);

  return (
    <Container className="privacy-policy my-5 p-4 rounded">
      <h1 className="text-center mb-4">Privacy Policy</h1>
      <p>
        At <strong>Gramture</strong>, the privacy of our visitors is of utmost importance to us. 
        This <strong>Privacy Policy</strong> outlines the types of personal information 
        collected and received by <a href="https://gramture.com/" target="_blank" rel="noopener noreferrer">
        https://gramture.com/</a> and how we use, protect, and disclose that information.
      </p>

      <h3 className="mt-4">1. Information Collection and Use</h3>
      <p>
        When you visit our website, we may collect certain <strong>non-personally identifiable information</strong>, 
        such as your IP address, browser type, operating system, and the date and time of your visit. 
        This information helps us to improve the website's functionality and provide a better user experience. 
        We do not collect any personally identifiable information unless you willingly submit it to us, 
        such as through contact forms or comments.
      </p>

      <h3 className="mt-4">2. Cookies</h3>
      <p>
        Our website may use <strong>cookies</strong> to enhance the user experience. Cookies are small text files 
        placed on your device to store information about your preferences and activities on our website. 
        Cookies enable us to understand how you interact with our website, personalize your experience, 
        and track usage patterns. You can control the use of cookies through your browser settings.
      </p>

      <h3 className="mt-4">3. Link to Third-Party Websites</h3>
      <p>
        Our website may contain links to <strong>third-party websites</strong> for your reference and convenience. 
        Please note that we have no control over the content, privacy policies, or practices of these third-party websites. 
        We encourage you to review the privacy policies of those websites as they may differ from ours.
      </p>

      <h3 className="mt-4">4. Information Security</h3>
      <p>
        We have implemented appropriate security measures to protect the information we collect and 
        prevent unauthorized access, alteration, or disclosure. However, please be aware that <strong>no method of transmission</strong> 
        over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h3 className="mt-4">5. Children's Privacy</h3>
      <p>
        Our services are <strong>not intended for individuals under the age of 13</strong>. 
        We do not knowingly collect or solicit any personal information from children. 
        If you believe that we may have inadvertently collected personal information from a child under the age of 13, 
        please contact us immediately, and we will promptly remove the information from our records.
      </p>

      <h3 className="mt-4">6. Changes to this Privacy Policy</h3>
      <p>
        We may update this <strong>Privacy Policy</strong> from time to time. Any changes will be posted on this page, 
        and the <strong>"Last Updated"</strong> date at the bottom will be revised accordingly. 
        We encourage you to review this Privacy Policy periodically to stay informed about how we collect, 
        use, and protect your personal information.
      </p>

      <h3 className="mt-4">7. Contact Us</h3>
      <p>
        If you have any questions, concerns, or suggestions regarding this Privacy Policy or our privacy practices, 
        please contact us at <strong>[email address]</strong>.
      </p>

      <p className="text-muted mt-4"><small>Last Updated: {lastUpdatedDate}</small></p>

      <p className="mt-4 color-gray">
        Please note that this privacy policy only applies to <a href="https://gramture.com/" target="_blank" rel="noopener noreferrer">
        https://gramture.com/</a> and not to any other websites or services that may be linked to our website.
      </p>
    </Container>
  );
};

export default PrivacyPolicy;
