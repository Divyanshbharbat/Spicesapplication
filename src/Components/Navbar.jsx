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
      axios.get(`${import.meta.env.VITE_APP}/api/cart/count`, {
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

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar
      id="navbar"
      expanded={expanded}
      onToggle={setExpanded}
      expand="lg"
      variant="dark"
      className="custom-navbar"
      sticky="top"
      collapseOnSelect
    >
      <Container>
        {/* Brand logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
          onClick={closeNavbar}
        >
          <img
            src="https://img.freepik.com/free-vector/spices-herbs-tag-decorated-with-leaves-dill-basil-bay-powder-curry-paprika-realistic-illustration_1284-61200.jpg?ga=GA1.1.81057377.1744463214&semt=ais_hybrid&w=740"
            alt="Spice Logo"
            height="45"
            className="me-2 rounded-circle"
            style={{ objectFit: 'cover' }}
          />
          <span className="fw-bold fs-4">SpiceShop</span>
        </Navbar.Brand>

        {/* Right-side: Products, Auth, Cart, Toggle */}
        <div className="d-flex align-items-center order-lg-2 ms-auto gap-3">
          {/* Products link */}
          <Nav.Link
            as={Link}
            to="/products"
            className="nav-link-custom text-white"
            onClick={closeNavbar}
          >
            Products
          </Nav.Link>

          {/* Auth buttons */}
          {isLoggedIn ? (
            <Button
              className="auth-btn logout-btn text-white px-3 py-1"
              style={{ backgroundColor: '#006eff', border: 'none' }}
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
                className="auth-btn text-white px-3 py-1"
                as={Link}
                to="/login"
                onClick={closeNavbar}
              >
                Login
              </Button>
              <Button
                variant="light"
                className="auth-btn px-3 py-1"
                as={Link}
                to="/signup"
                onClick={closeNavbar}
              >
                Signup
              </Button>
            </>
          )}

          {/* Cart icon */}
          <Nav.Link
            as={Link}
            to="/addtocart"
            className="nav-link-custom position-relative text-white"
            onClick={closeNavbar}
          >
            <FaShoppingCart className="fs-4" />
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

          {/* Toggle for mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        {/* Collapsible nav items */}
        <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
          <Nav className="me-auto text-center">
            {/* "Products" excluded here since it's always visible */}
            {['home', 'about', 'contact'].map((path, i) => (
              <Nav.Link
                key={i}
                as={Link}
                to={`/${path}`}
                className="nav-link-custom"
                onClick={closeNavbar}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
