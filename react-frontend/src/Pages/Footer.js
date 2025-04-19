import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

function Footer() {
  return (
    <footer className="app-footer">
      <Container>
        <Row className="footer-content">
          <Col md={4} className="footer-logo mb-4 mb-md-0">
            {/* Replace with your actual logo */}
            <img 
              src="/logo.png" 
              alt="BikeBuddy Logo" 
              className="footer-logo-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150x50?text=BikeBuddy";
              }} 
            />
            <p className="mt-3">Connecting riders for a sustainable future. Share rides, save money, and reduce carbon emissions.</p>
            
            <div className="social-icons mt-3">
              <a href="#" className="me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="me-3"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </Col>
          
          <Col md={8}>
            <Row>
              <Col sm={4} className="footer-section">
                <h3>Navigate</h3>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/team">Our Team</Link></li>
                  <li><Link to="/career">Careers</Link></li>
                </ul>
              </Col>
              
              <Col sm={4} className="footer-section">
                <h3>Services</h3>
                <ul>
                  <li><Link to="/search-rides">Find Rides</Link></li>
                  <li><Link to="/driver/addride">Offer a Ride</Link></li>
                  <li><Link to="/carbon-footprint">Carbon Calculator</Link></li>
                </ul>
              </Col>
              
              <Col sm={4} className="footer-section">
                <h3>Account</h3>
                <ul>
                  <li><Link to="/customer/login">Passenger Login</Link></li>
                  <li><Link to="/driver/login">Driver Login</Link></li>
                  <li><Link to="/customer/signup">Passenger Sign Up</Link></li>
                  <li><Link to="/driver/register">Become a Driver</Link></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      
      <div className="footer-bottom">
        <Container>
          <p className="text-center m-0">&copy; {new Date().getFullYear()} BikeBuddy. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
