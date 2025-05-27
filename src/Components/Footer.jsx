import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // ✅ Import Helmet

const Footer = () => {
  return (
    <>
      {/* ✅ Helmet with meta tags */}
      <Helmet>
        <title>Dhaniya Haldi Shop - Buy Natural Spices Online</title>
        <meta name="description" content="Explore the best natural and organic spices like dhaniya, haldi, and powders. Fast delivery, secure checkout." />
        <meta name="keywords" content="dhaniya, haldi, organic spices, natural herbs, spice powders, Indian spices" />
        <meta name="author" content="Dhaniya Haldi Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Optional: Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="Shop of Dhaniya & Haldi" />
        <meta property="og:description" content="Buy top quality organic dhaniya, haldi, and spice powders online." />
        <meta property="og:image" content="https://example.com/spice-image.jpg" />
        <meta property="og:url" content="https://yourspiceshop.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      <footer
        style={{
          background: 'linear-gradient(90deg, #38ef7d 0%, #11998e 100%)',
          color: '#fff',
          padding: '2.5rem 0',
          fontSize: '1rem',
        }}
      >
        <Container>
          <Row className="mb-4">
            {/* Quick Links */}
            <Col md={4} sm={6} className="mb-3">
              <h5 className="mb-3 fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/products" className="text-white text-decoration-none footer-link">Products</Link></li>
                <li><Link to="/addtocart" className="text-white text-decoration-none footer-link">Cart</Link></li>
                <li><Link to="/about" className="text-white text-decoration-none footer-link">About Us</Link></li>
                <li><Link to="/contact" className="text-white text-decoration-none footer-link">Contact</Link></li>
                <li><Link to="/privacy" className="text-white text-decoration-none footer-link">Privacy Policy</Link></li>
                <li><Link to="/returns" className="text-white text-decoration-none footer-link">Return Policy</Link></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col md={4} sm={6} className="mb-3">
              <h5 className="mb-3 fw-bold">Contact</h5>
              <p className="mb-1">📍 Delhi, India</p>
              <p className="mb-1">📞 +91 98765 43210</p>
              <p>✉️ support@dhaniyahaldi.com</p>
            </Col>

            {/* Social Media */}
            <Col md={4} sm={12} className="mb-3">
              <h5 className="mb-3 fw-bold">Follow Us</h5>
              <p>
                🌐 <a href="#" className="text-white text-decoration-none me-3 footer-link" target="_blank" rel="noopener noreferrer">Facebook</a>
                📸 <a href="#" className="text-white text-decoration-none me-3 footer-link" target="_blank" rel="noopener noreferrer">Instagram</a>
                🐦 <a href="#" className="text-white text-decoration-none footer-link" target="_blank" rel="noopener noreferrer">Twitter</a>
              </p>
            </Col>
          </Row>

          <hr style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
          <p className="text-center mb-0" style={{ fontSize: '0.9rem' }}>
            &copy; 2025 Shop of Dhaniya, Haldi & Powders. All rights reserved.
          </p>
        </Container>

        {/* Inline CSS for hover effect */}
        <style>{`
          .footer-link:hover {
            color: #d1f7d1;
            text-decoration: underline;
            transition: color 0.3s ease;
          }
        `}</style>
      </footer>
    </>
  );
};

export default Footer;
