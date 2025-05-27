import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // fixed import
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import Meta from './Meta';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/products");
  };

  const handleabout = () => {
    navigate("/about");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const pieData = {
    labels: ['Haldi', 'Dhaniya', 'Herbal Powders'],
    datasets: [
      {
        label: 'Top Selling Categories',
        data: [45, 30, 25],
        backgroundColor: ['#FFD700', '#32CD32', '#BA55D3'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f3f8f2 50%, #f5f5f5 100%)',
        minHeight: '100vh',
        paddingTop: '2rem',
        color: '#222'
      }}
    >
        <Meta 
        title="Spice Shop - Home"
        description="Welcome to the best online spice store. Browse our quality spices."
        keywords="home, spice shop, online spices"
      />
      <Container className="text-dark">

        {/* Hero Section */}
        <Row className="align-items-center mb-5 py-2">
          <Col md={6} className="my-2" data-aos="fade-right">
            <h1 className="fw-bold display-4">Welcome to Nature's Best Spices 🌿</h1>
            <p className="lead">
              Experience the richness of traditional, natural spices harvested fresh and delivered to your doorstep.
            </p>
            <Button variant="success" onClick={handlenavigate} className="me-3 text-light fw-semibold">
              Explore Products
            </Button>
            <Button variant="outline-secondary" onClick={handleabout} className="fw-semibold">
              Our Story
            </Button>
            
          </Col>
          <Col md={6} data-aos="fade-left">
            <img
              src="https://img.freepik.com/free-vector/beautiful-frame-with-edges-cooking-herbs-placers-spices-wooden-dishes_1284-6093.jpg?ga=GA1.1.81057377.1744463214&semt=ais_hybrid&w=740"
              alt="Spices"
              className="img-fluid rounded shadow-lg"
            />
          </Col>
        </Row>

        {/* Why Choose Us */}
        <Row className="text-center mb-5 py-4">
          <h2 className="mb-4 fw-bold">🌱 Why Choose Us</h2>
          {[
            { icon: '✅', text: '100% Natural Ingredients' },
            { icon: '🚚', text: 'Fast 48hr Delivery' },
            { icon: '🔬', text: 'Lab-tested Purity' },
            { icon: '👨‍🌾', text: 'Sourced from Local Farmers' },
          ].map((item, idx) => (
            <Col md={3} key={idx} data-aos="zoom-in">
              <Card className="p-3 shadow-sm h-100 border-0" style={{ background: '#ffffffee', borderRadius: '1rem' }}>
                <h1>{item.icon}</h1>
                <p className="fw-bold">{item.text}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pie Chart Section */}
        <Row className="mb-5 py-4 align-items-center">
          <Col md={6} data-aos="fade-up">
            <h3 className="fw-bold mb-3">📊 Our Top-Selling Categories</h3>
            <p>See what customers love the most!</p>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                background: 'white',
                padding: '1rem',
                borderRadius: '1rem'
              }}
            >
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Col>

          <Col md={6} className="mt-5 pt-5" data-aos="fade-left">
            <img
              src="https://img.freepik.com/free-vector/smart-factory-working-person-using-wireless-technology-control_1150-43092.jpg?ga=GA1.1.109368830.1743779497&semt=ais_hybrid&w=740"
              alt="Top-Selling Categories"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>

        {/* Featured Highlights */}
        <Row className="mb-5 py-4">
          <h2 className="text-center mb-4 fw-bold">🔥 Featured Products</h2>
          {[
            {
              title: 'Premium Haldi Powder',
              image:
                'https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/d472ca16-63b0-41fe-a88c-3b4a18264dd7/Leonardo_Phoenix_10_A_vibrant_and_visually_appealing_image_of_0.jpg',
            },
            {
              title: 'Chilli powder',
              image:
                'https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/53c632a8-9130-45c1-8d1f-2c4eccd32fa6/Leonardo_Phoenix_10_A_vibrant_and_sleek_image_featuring_a_brig_1.jpg',
            },
            {
              title: 'Pure Dhania Powder',
              image:
                'https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/b182ca9f-2eef-4424-984a-6ea8ffd976fe/Leonardo_Phoenix_10_A_vibrant_and_highquality_image_of_dhania_3.jpg',
            },
          ].map((item, i) => (
            <Col md={4} key={i}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="shadow-sm h-100 border-0" data-aos="zoom-in" style={{ borderRadius: '1rem' }}>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <NavLink to="/products">
                      <Button variant="outline-success" className="fw-semibold">
                        Buy Now
                      </Button>
                    </NavLink>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Health Benefits */}
        <Row className="mb-5 py-4">
          <h2 className="text-center mb-4 fw-bold">🌿 Health Benefits of Our Spices</h2>
          <Col md={4} data-aos="fade-right">
            <Card className="p-3 shadow-sm border-0 h-100">
              <h4>Haldi (Turmeric)</h4>
              <p>Rich in curcumin, turmeric is a natural anti-inflammatory and antioxidant.</p>
            </Card>
          </Col>
          <Col md={4} data-aos="fade-up">
            <Card className="p-3 shadow-sm border-0 h-100">
              <h4>Dhaniya (Coriander)</h4>
              <p>Helps in digestion and controls blood sugar levels naturally.</p>
            </Card>
          </Col>
          <Col md={4} data-aos="fade-left">
            <Card className="p-3 shadow-sm border-0 h-100">
              <h4>Amla Powder</h4>
              <p>Boosts immunity, promotes hair growth, and improves digestion.</p>
            </Card>
          </Col>
        </Row>

        {/* Testimonials */}
        <Row className="mb-5 py-4">
          <h2 className="text-center mb-4 fw-bold">🛒 What Our Customers Say</h2>
          {[
            { name: 'Priya Sharma', review: 'Absolutely loved the haldi! Authentic aroma and perfect packaging.' },
            { name: 'Amit Verma', review: 'Very fast delivery and excellent product quality. 5 stars!' },
          ].map((user, i) => (
            <Col md={6} key={i} data-aos="zoom-in">
              <Card className="shadow-sm p-3 mb-3 bg-white">
                <p>“{user.review}”</p>
                <h6 className="text-muted">- {user.name}</h6>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Delivery & Packaging */}
        <Row className="mb-5 py-4 text-center">
          <h2 className="fw-bold mb-3">📦 Delivery & Eco-Friendly Packaging</h2>
          <p>
            We use biodegradable packaging and deliver your orders within 48 hours, ensuring freshness and sustainability.
          </p>
          <img style={{height:"60vh",width:"80vh"}}
            src="https://img.freepik.com/premium-vector/conveyor-belt-warehouse-concept-illustration_86047-805.jpg?ga=GA1.1.109368830.1743779497&semt=ais_hybrid&w=740"
            className="img-fluid rounded shadow mx-auto mt-3"
            alt="Eco Packaging"
          />
        </Row>

      </Container>
    </div>
  );
};

export default Landing;
