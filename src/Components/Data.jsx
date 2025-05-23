import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Data = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('cookie');
      if (!token) {
        toast.error('Please login to add products to cart');
        return;
      }
      setLoading(true);
      await axios.post(
     `${import.meta.VITE_APP}/api/cart/add`,
        // 'http://localhost:3000/api/cart/add',
        { product },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Successfully Added");
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Product Already added to cart.');
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      // const res = await axios.get("http://localhost:3000/gethomedata");
      const res = await axios.get(`${import.meta.VITE_APP}/gethomedata`);
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("cookie");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getData();
  }, []);

  const bgGradients = [
    'linear-gradient(90deg, #f8ffae 0%, #43c6ac 100%)',
    'linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(90deg, #c2e9fb 0%, #a1c4fd 100%)',
    'linear-gradient(90deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)',
  ];

  return (
    <div className="py-5" style={{ minHeight: '100vh' }}>
      <Toaster />
      <div className="container">
        
        {/* 🛒 Cart Button at Top Right */}
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-outline-success"
            onClick={() => navigate('/addtocart')}
          >
            🛒 Your Cart
          </button>
        </div>

        <h1 className="text-center mb-5">🌿 Featured Products</h1>

        {cart.map((item, index) => (
          <div
            key={index}
            className="card mb-4 shadow-lg border-0"
            style={{
              background: bgGradients[index % bgGradients.length],
              borderRadius: '20px',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                  src={item.image}
                  alt="product"
                  className="img-fluid rounded-start"
                  style={{ height: '100%', objectFit: 'cover', borderRadius: '20px 0 0 20px' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title fw-bold text-dark">{item.name || 'Product Name'}</h3>
                  <p className="text-success fw-bold mb-1">💰 Price: ₹{item.price}</p>
                  <p className="text-secondary mb-1">📦 Category: {item.category || 'General'}</p>
                  <p className="text-dark mb-1">📝 Description: {item.description || 'No description available.'}</p>
                  <p className="text-dark mb-1">📈 In Stock: {item.stock || 'Available'}</p>
                  <p className="text-warning mb-3">⭐ Rating: {item.rating || '4.5/5'}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="btn btn-dark px-4 mt-3"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
