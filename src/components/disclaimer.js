import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Disclaimer = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '20px',
  };

  const highlightedTextStyle = {
    backgroundColor: '#ffeb3b',
    fontWeight: 'bold',
  };

  const responsiveStyle = {
    margin: '10px 0',
  };

  const iconStyle = {
    marginRight: '10px',
    color: '#ff0000',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        <FaExclamationTriangle style={iconStyle} />
        Disclaimer
      </h1>
      <p style={paragraphStyle}>
        Please read this disclaimer ("disclaimer") carefully before using <span style={highlightedTextStyle}>Gramture</span> website (“website”, "service") operated by <span style={highlightedTextStyle}>Habib Ahmad Khan</span>.
      </p>
      <p style={paragraphStyle}>
        The content displayed on the website is the intellectual property of <span style={highlightedTextStyle}>Gramture Team</span>. You may not reuse, republish, or reprint such content without our written consent.
      </p>
      <p style={paragraphStyle}>
        All information posted is merely for <span style={highlightedTextStyle}>educational and informational purposes</span>. It is not intended as a substitute for professional advice. Should you decide to act upon any information on this website, you do so at your own risk.
      </p>
      <p style={paragraphStyle}>
        While the information on this website has been verified to the best of our abilities, we cannot guarantee that there are no mistakes or errors.
      </p>
      <p style={paragraphStyle}>
        We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.
      </p>
      <p style={{ ...paragraphStyle, ...responsiveStyle }}>
        <span style={highlightedTextStyle}>Save your time</span> and take the guesswork out of the legal jargon with our <span style={highlightedTextStyle}>smart generators</span> trusted by thousands. Create a <span style={highlightedTextStyle}>bulletproof legal disclaimer</span> personalized to your needs in minutes.
      </p>
    </div>
  );
};

export default Disclaimer;
