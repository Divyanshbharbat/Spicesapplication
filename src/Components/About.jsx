import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import   pic from  '../assets/divyanshpic.jpg'
const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f7fafc, #e0f2f1)',
        color: '#1b1b1b',
        padding: '4rem 0',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container>
        <h1 className="text-center mb-5 fw-bold" style={{ letterSpacing: '1.2px' }}>
          🌿 Our Natural Spice Journey
        </h1>

        {/* Story Section */}
        <Row className="align-items-center mb-5">
          <Col
            md={6}
            data-aos="fade-right"
            style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
          >
            <Image
              src="https://img.freepik.com/premium-photo/fresh-herbs-spices-wooden-background_392895-164122.jpg?ga=GA1.1.109368830.1743779497&semt=ais_hybrid&w=740"
              alt="Farm Spices"
              fluid
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
              rounded
            />
          </Col>
          <Col md={6} data-aos="fade-left" className="ps-md-5 mt-4 mt-md-0">
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Welcome to <strong>Shop of Dhani, Haldi & Powder</strong>, where tradition meets purity. Our roots lie deep
              within India’s rich spice heritage, handcrafting ingredients passed down through generations of
              sustainable farming.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Each spice tells a story — sun-kissed turmeric, naturally dried dhania, and stone-ground powders — nurtured
              with care and free from harmful chemicals. We’re proud to deliver farm-fresh, soul-nourishing ingredients
              straight to your kitchen.
            </p>
          </Col>
        </Row>

        {/* Mission Section */}
        <Row className="align-items-center mb-5 flex-md-row-reverse">
          <Col
            md={6}
            data-aos="fade-left"
            style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
          >
            <Image
              src="https://img.freepik.com/free-vector/positive-tiny-people-sitting-walking-near-huge-target-with-arrow-isolated-flat-vector-illustration-cartoon-business-team-achieving-goal-aim-marketing-strategy-achievement-concept_74855-10139.jpg?ga=GA1.1.109368830.1743779497&semt=ais_hybrid&w=740"
              alt="Traditional Processing"
              fluid
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
              rounded
            />
          </Col>
          <Col md={6} data-aos="fade-right" className="pe-md-5 mt-4 mt-md-0">
            <h3 className="fw-bold mb-3" style={{ letterSpacing: '0.5px' }}>
              🌱 Our Mission
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              We’re on a mission to revive and celebrate India’s traditional wellness and culinary practices by:
            </p>
            <ul style={{ fontSize: '1.05rem', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
              <li>✅ Supporting organic and regenerative farming</li>
              <li>✅ Uplifting local farmers and women-led cooperatives</li>
              <li>✅ Delivering authentic, chemical-free spices</li>
            </ul>
          </Col>
        </Row>

        {/* Values Section */}
        <Row className="mb-5" data-aos="fade-up">
          <h3 className="fw-bold text-center mb-4" style={{ letterSpacing: '0.8px' }}>
            🌍 What We Stand For
          </h3>
          {[
            {
              icon: '🌿',
              title: 'Sustainability',
              desc: 'We follow eco-conscious farming and use biodegradable packaging to reduce our carbon footprint.',
            },
            {
              icon: '🧪',
              title: 'Purity',
              desc: 'No synthetic additives or colorants. Every batch is lab-tested for quality and authenticity.',
            },
            {
              icon: '🤝',
              title: 'Fair Trade',
              desc: 'We ensure fair pricing and profit-sharing with farmers and community cooperatives.',
            },
          ].map((val, i) => (
            <Col md={4} key={i} className="text-center mb-4">
              <div
                className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center"
                style={{ transition: 'transform 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <h1 style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>{val.icon}</h1>
                <h5 className="fw-bold mb-2">{val.title}</h5>
                <p className="mb-0" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                  {val.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Owner Section */}
        <Row className="align-items-center mt-5">
          <Col
            md={6}
            data-aos="fade-right"
            className="d-flex justify-content-center"
          >
            <Image
              src={pic}
              alt="Founder"
              fluid
              roundedCircle
              className="shadow-lg"
              style={{ maxWidth: '300px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6} data-aos="fade-left" className="mt-4 mt-md-0 ps-md-4">
            <h3 className="fw-bold mb-3" style={{ letterSpacing: '0.5px' }}>
              👨‍🌾 Meet the Visionary Behind It All
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              <strong>Raghav Sharma</strong> — a third-generation spice farmer and lifelong Ayurveda enthusiast — founded this brand to revive India’s forgotten spice wisdom.
            </p>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6', color: '#4a4a4a' }}>
              “In today’s synthetic world, my dream is to return to the roots — the earth, the sun, and nature’s healing touch.”
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              His relentless passion for purity, sustainability, and community continues to shape every product we offer.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
