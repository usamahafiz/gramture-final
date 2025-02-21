import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../../assets/images/logo.png.webp"; // Replace with your actual logo URL
const WorkInProgress = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="work-in-progress-container">
      <div className="logo-container">
        {/* Updated logo URL */}
        <img
          src={img} // Replace with your actual logo URL
          alt="Logo"
          className="logo"
        />
      </div>
      <h2 className="message">Our coding team is working on this. Thanks for your patience!</h2>
      
      {/* Home button */}
      <button className="home-button" onClick={handleHomeClick}>
        Go to Home
      </button>

      <style jsx>{`
        /* Global Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-color:rgb(255, 255, 255);
        }

        /* Work In Progress Container */
        .work-in-progress-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1.5s ease-in-out;
          margin-top: 20px;
        }

        /* Logo Styling */
        .logo-container {
          margin-bottom: 40px;
        }

        .logo {
          width: 200px;
          height: 150px;
          
        }

        /* Message Styling */
        .message {
          font-size: 24px;
          color: #333;
          margin: 20px 0;
          animation: fadeInText 2s ease-in-out;
        }

        /* Home Button Styling */
        .home-button {
          padding: 12px 24px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .home-button:hover {
          background-color: #2980b9;
        }

        /* Keyframes for Animations */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateLogo {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default WorkInProgress;


