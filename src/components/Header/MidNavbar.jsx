import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/navbar.css"; // Include your own styles here
import logo from "../../assets/images/navbarlogo.webp"; // Replace with the actual logo
import styled from "styled-components";

// Styled component for the animated and elegant text
const ElegantText = styled.h1`
  font-size: 2rem; /* Decreased size to fit in one line */
  color: rgb(0, 0, 0);
  text-align: right;
  font-family: "Georgia", serif;
  background-image: linear-gradient(45deg, rgb(0, 0, 0), rgb(0, 0, 0));
  -webkit-background-clip: text; /* Gradient text */
  color: transparent;
  font-weight: bold;
  letter-spacing: 2px;
  animation: animateText 5s infinite ease-in-out;
  z-index: 7800000;

  @media (max-width: 1200px) {
    font-size: 1.8rem;
    text-align: center;
  }

  @media (max-width: 992px) {
    font-size: 1.6rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    text-align: center;
  }

  @media (max-width: 576px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

// New styled component for the additional text
const SubHeading = styled.h3`
  font-size: 1.3rem; /* Decreased size for better fit */
  color: rgb(0, 0, 0);
  font-family: "Arial", sans-serif;
  font-weight: normal;
  text-align: right;
  margin-top: 5px; /* Reduced spacing between heading and subheading */
  
  @media (max-width: 1200px) {
    font-size: 1.2rem;
    text-align: center;
  }

  @media (max-width: 992px) {
    font-size: 1.1rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    text-align: center;
  }
`;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState([
    "Introduction to English",
    "Grammar Basics",
    "Letters and Applications",
    "Moral Stories",
    "Poem Book III",
    "Short Stories",
    "Plays Book III",
    "Goodbye Mr. Chips",
    "Book Prose II",
    "Heroes",
  ]);

  return (
    <header className="header container-fluid" style={{ backgroundColor: "#fcf9f9", marginTop: "50px" }}>
      {/* Large Screen Header */}
      <div className="row align-items-center d-none d-md-flex">
        {/* Empty space for centering the logo */}
        <div className="col-4"></div>
        
        {/* Logo centered */}
        <div className="col-4 text-center">
          <img src={logo} alt="Logo" className="logo m-1" />
        </div>

        {/* English Grammar & Structure text on the right */}
        <div className="col-4 text-right">
          <ElegantText>English Grammar & Structure</ElegantText>
          {/* New SubHeading added below the ElegantText */}
          <SubHeading>Class Tests | Notes | Past Papers | MCQs | Much More</SubHeading>
        </div>
      </div>

      {/* Small Screen Header (Logo centered and text on the right) */}
      <div className="row align-items-center justify-content-center d-flex d-md-none">
        {/* Logo centered */}
        <div className="col-12 text-center">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        {/* English Grammar & Structure text on the right */}
        <div className="col-12 text-center">
          <ElegantText>English Grammar & Structure</ElegantText>
          {/* New SubHeading added below the ElegantText */}
          <SubHeading>Class Tests | Notes | Past Papers | MCQs | Much More</SubHeading>
        </div>
      </div>
    </header>
  );
};

export default Header;
