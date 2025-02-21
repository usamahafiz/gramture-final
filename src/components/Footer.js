import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Changed from <a> to <Link>
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, 
  FaYoutube, FaWhatsapp, FaPinterest, FaGithub 
} from "react-icons/fa";

import "../assets/css/footer.css";
import logo from "../assets/images/logo.png.webp";

const Footer = () => {
  return (
    <footer className="footer text-light py-4">
      <Container>
        <Row>
          {/* Logo and Developed By */}
          <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
            <img src={logo} alt="Gramture Logo" className="footer-logo mb-2" />
            <p className="mb-0">
              <small>
                Developed by <strong>
                  <a href="https://muteeb-portfolio1.firebaseapp.com/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-light">
                    Code Nexus
                  </a>
                </strong>
              </small>
            </p>
          </Col>

          {/* Navigation Links */}
          <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
            <nav>
              <ul className="footer-nav list-unstyled d-flex justify-content-center gap-3">
                <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                <li><Link to="/about" className="text-light text-decoration-none">About us</Link></li>
                <li><Link to="/discussion_forum" className="text-light text-decoration-none">Discussion Forum</Link></li>
              </ul>
            </nav>
          </Col>

          {/* Privacy Policy and Rights */}
          <Col xs={12} md={4} className="text-center text-md-center">
            <p className="mb-1">
              <Link to="/privacy-policy" className="text-light text-decoration-none">Privacy Policy</Link> |
              <Link to="/disclaimer" className="text-light text-decoration-none"> Disclaimer</Link>
            </p>
            <p className="mb-0"><small>© 2025 Gramture. All Rights Reserved.</small></p>
            
            {/* Social Icons */}
            <div className="social-icons mt-3">
              <a href="https://www.facebook.com/Gramture" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="social-icon facebook" />
              </a>
              <a href="https://twitter.com/Gramture" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} className="social-icon twitter" />
              </a>
              <a href="https://www.instagram.com/gramture/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="social-icon instagram" />
              </a>
              <a href="https://www.youtube.com/@gramture" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24} className="social-icon youtube" />
              </a>
              <a href="https://wa.me/+923036660025" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24} className="social-icon whatsapp" style={{ color: '#25d366' }} />
              </a>
              <a href="https://www.linkedin.com/in/habib-ahmad-khan-b75a6b9a" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <FaLinkedin size={24} className="social-icon linkedin" style={{ color: '#0e76a8' }} />
              </a>
              <a href="https://github.com/habibahmadakhan" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <FaGithub size={24} className="social-icon github" style={{ color: '#808080' }} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;