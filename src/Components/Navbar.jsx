import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import './Navbar.css';

const AppNavbar = () => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('cookie');
  const isLoggedIn = !!storedToken;

  const [cartCount, setCartCount] = useState(0);
  const [expanded, setExpanded] = useState(false); // control navbar collapse

  useEffect(() => {
    if (isLoggedIn) {
      axios.get(`${import.meta.VITE_APP}/api/cart/count`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        withCredentials: true,
      })
      .then((res) => setCartCount(res.data.count))
      .catch(() => setCartCount(0));
    } else {
      setCartCount(0);
    }
  }, [isLoggedIn, storedToken]);

  const handleLogout = () => {
    localStorage.removeItem('cookie');
    setExpanded(false); // close navbar on logout
    navigate('/login');
  };

  // Close navbar when clicking any nav link or button inside collapsed menu
  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar id='navbar'
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      variant="dark"
      className="custom-navbar"
      sticky="top"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={closeNavbar}>
          <img
            src="https://img.freepik.com/free-vector/spices-herbs-tag-decorated-with-leaves-dill-basil-bay-powder-curry-paprika-realistic-illustration_1284-61200.jpg?ga=GA1.1.81057377.1744463214&semt=ais_hybrid&w=740"
            alt="Spice Logo"
            height="45"
            className="me-2 rounded-circle"
            style={{ objectFit: 'cover' }}
          />
          <span className="fw-bold fs-4">SpiceShop</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
          <Nav className="me-auto text-center">
            {["home", "products", "about", "contact"].map((path, i) => (
              <Nav.Link
                key={i}
                as={Link}
                to={`/${path}`}
                className="nav-link-custom"
                onClick={closeNavbar}  // close on click
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Nav.Link>
            ))}
            <Nav.Link
              as={Link}
              to="/addtocart"
              className="nav-link-custom position-relative"
              onClick={closeNavbar} // close on click
            >
              <FaShoppingCart className="me-1 fs-4" />
              {cartCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

          <Nav className="text-center">
            {isLoggedIn ? (
              <Button
                className="auth-btn logout-btn"
                onClick={() => {
                  handleLogout();
                  closeNavbar();
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="me-2 auth-btn text-white"
                  as={Link}
                  to="/login"
                  onClick={closeNavbar}
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  className="auth-btn"
                  as={Link}
                  to="/signup"
                  onClick={closeNavbar}
                >
                  Signup
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
