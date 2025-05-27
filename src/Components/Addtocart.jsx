import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AddToCart.css'; // make sure this file exists and is imported

const AddToCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('cookie');

  useEffect(() => {
    AOS.init({ duration: 1000 });

    if (!token) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(res.data.cart)) {
        setCart(res.data.cart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      setCart([]);
    }
  };

  const updateQuantity = async (id, action) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP}/api/cart/update`,
        { id, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (error) {
      console.error('Update quantity error:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP}/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Item removed from cart');
      fetchCart();
    } catch (error) {
      toast.error('Failed to remove item');
      console.error('Delete item error:', error);
    }
  };

  const placeOrder = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP}/api/order/place`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Order placed successfully!');
      setCart([]);
    } catch (error) {
      toast.error('Failed to place order');
      console.error('Place order error:', error);
    }
  };

  return (
    <div className="container py-5" data-aos="fade-up">
      <h2 className="text-center fw-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted">No items in your cart.</p>
      ) : (
        <>
          <div className="row g-4">
            {cart.map(item => (
              <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                <div className="card shadow border-0 h-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="mb-1"><strong>₹{item.price}</strong></p>
                    <div className="d-flex justify-content-center align-items-center mb-3 quantity-controls">
                      <button
                        className="btn btn-increment-decrement me-3"
                        onClick={() => updateQuantity(item.id, 'decrement')}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span className="quantity-number">{item.quantity}</span>

                      <button
                        className="btn btn-increment-decrement ms-3"
                        onClick={() => updateQuantity(item.id, 'increment')}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => deleteItem(item.id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <NavLink to="/placeorder">
              <button
                className="btn btn-gradient px-4 py-2 fw-bold rounded-pill shadow"
                onClick={placeOrder}
              >
                🛍️ Place Order
              </button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
