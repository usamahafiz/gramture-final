import React from 'react';
import { Row, Col, Image } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import myImage from '../assets/images/owner.jpg';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';

import img from '../assets/images/about.jpg'; // Your logo image

const About = () => {
  return (
    <div className='container about-section' id='about'>
      {/* Top Banner Section */}
      <div className="top-banner mb-4">
        <Image
          width="100%"
          height="auto"  // Set height to auto for a natural image ratio
          src={img} // Use your desired banner image URL here
          alt="Top Banner"
          className="img-fluid"
          style={{ objectFit: 'cover', height: '400px' }} // Make image cover the entire width and maintain aspect ratio
        />
      </div>

      {/* About Grammar Section */}
      <Row>
        <Col xs={24} md={24} className='about-grammar-section'>
          <div className="about-grammar-content mt-4 text-center">
            <div className="heading mt-2 mb-2">
              <b style={{ fontSize: '30px', fontWeight: '700' }}>Welcome to the Gramture platform!</b>
            </div>
            <p style={{ fontSize: '18px', color: '#333' }}>
              Gramture is a Novelty brand name. Gramture helps you understand the{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                grammatical concepts and structure
              </span> in a simple way.
            </p>
            <p style={{ fontSize: '18px', color: '#333' }}>
              Gramture <b>[gram-cher]</b> is a blend of two words,{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                grammar and structure
              </span>, as smog is coined by blending smoke and fog, or motel, from motor
              and hotel. In linguistics, Gramture is considered a clipped compound.
              The new word combines both the sounds and meanings of the originals.
            </p>
            <p style={{ fontSize: '18px', color: '#333' }}>
              To form Gramture, the first segment of the{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>‘grammar’ (gram)</span>
              word is attached to the final segment of{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>‘structure’ (ture)</span>.
              Gramture is a single naming word for the two terms grammar and structure.
            </p>
            <p style={{ fontSize: '18px', color: '#333' }}>
              Gramture is more than just a name; it’s a vision. By seamlessly blending{' '}
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>grammar and structure</span>,
              it embodies simplicity, clarity, and innovation in understanding language. With
              Gramture, mastering the building blocks of language becomes effortless, empowering
              learners to communicate with confidence and precision.
            </p>
          </div>
        </Col>
      </Row>

      {/* About Us Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8} className='about-left'>
          <div className="profile-img mb-4 text-center">
            <Image
              width={230}
              height={230}
              src={myImage}
              alt='profile-pic'
              className='rounded-circle'
            />
          </div>
          <div className="profile-info mb-4 text-center">
            <h4 style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>Habib Ahmad Khan</h4>
            <p>
              <b>Email</b>: <a href='mailto:gramture@gmail.com'>gramture@gmail.com</a>
            </p>
            <p>
              <b>Phone/WhatsApp No</b>: +92 3036660025
            </p>
            {/* Social Media Icons */}
            <div className="social-icons text-center">
              <a
                 href="https://www.facebook.com/Gramture"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon facebook"
               >
                 <FaFacebook size={24} />
               </a>
               <a
                 href="https://twitter.com/Gramture"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon twitter"
               >
                 <FaTwitter size={24} />
               </a>
               <a
                 href="https://www.instagram.com/gramture/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon instagram"
               >
                 <FaInstagram size={24} />
               </a>
               
               <a
                 href="https://www.youtube.com/@gramture"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon youtube"
               >
                 <FaYoutube size={24} />
               </a>
               <a
                 href="https://wa.me/+923036660025"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="social-icon youtube"
                 style={{color: '#25d366' }}
               >
                 <FaWhatsapp size={24} />
               </a>
              
               
             </div>
          </div>
        </Col>

        <Col xs={24} md={16} className="right-section text-center">
          <p className="about-description" style={{ fontSize: '30px', fontWeight: '400', marginTop: '20px' }}>
            The word ‘Gramture’ was introduced in this sense by{' '}
            <b>Habib Ahmad Khan</b> on the web domain{' '}
            <a href="https://gramture.com" target="_blank" rel="noopener noreferrer">gramture.com</a>,{' '}
            <a href="https://gramture.com" target="_blank" rel="noopener noreferrer">gramture</a> and in the books, Gramture Publications, and also on social media.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default About;
