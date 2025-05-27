import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PlaceOrder = ({ token }) => {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [payment] = useState('Cash on Delivery');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });

    const fetchCart = async () => {
      try {
        const storedToken = token || localStorage.getItem('cookie');
        const res = await axios.get(`${import.meta.env.VITE_APP}/api/cart`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setCart(res.data.cart);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error('Cart fetch error', err);
      }
    };
    fetchCart();
  }, [token]);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += change;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    setCart(updatedCart);
  };

  const handlePlaceOrder = async () => {
    if (!username || !email || !address || !phone) {
      Swal.fire('Missing Information', 'Please fill all the fields.', 'warning');
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Order',
      html: `
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        <p><strong>Total:</strong> ₹${calculateTotal()}</p>
        <p>Do you want to place the order?</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, place order',
    });

    if (result.isConfirmed) {
      try {
        const storedToken = token || localStorage.getItem('cookie');
        await axios.post(
          `${import.meta.env.VITE_APP}/api/placeorder`,
          { username, email, address, phone, payment, cart },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        Swal.fire('Success!', 'Your order has been placed.', 'success').then(() => {
          setCart([]);
          setAddress('');
          setPhone('');
          navigate('/history');
        });
      } catch (err) {
        console.error('Order error:', err);
        Swal.fire('Error', 'Failed to place order.', 'error');
      }
    }
  };

  return (
    <div className="container my-5" data-aos="fade-up">
      <div className="row justify-content-center">
        <div
          className="col-md-8 p-5 rounded shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
            color: '#ffffff',
            boxShadow: '0 8px 20px rgba(0, 201, 255, 0.5)',
            border: '2px solid #ffffff33',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="mb-4 text-center" style={{ fontWeight: '700', color: '#ffffff' }}>
            Place Your Order
          </h2>

          {[
            { label: 'Username', value: username, setter: setUsername, type: 'text' },
            { label: 'Email', value: email, setter: setEmail, type: 'email' },
            { label: 'Phone', value: phone, setter: setPhone, type: 'text' },
          ].map(({ label, value, setter, type }) => (
            <div className="mb-3" key={label}>
              <label className="form-label" style={{ fontWeight: '600', color: '#fff' }}>
                {label}
              </label>
              <input
                type={type}
                className="form-control"
                value={value}
                onChange={(e) => setter(e.target.value)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1.5px solid #ffffff88',
                  borderRadius: '8px',
                  backdropFilter: 'blur(5px)',
                }}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '600', color: '#fff' }}>
              Address
            </label>
            <textarea
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1.5px solid #ffffff88',
                borderRadius: '8px',
                minHeight: '80px',
                backdropFilter: 'blur(5px)',
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: '600', color: '#fff' }}>
              Payment Method
            </label>
            <input
              className="form-control"
              type="text"
              value={payment}
              readOnly
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1.5px solid #ffffff88',
                borderRadius: '8px',
              }}
            />
          </div>

          <h5 className="mb-3" style={{ borderBottom: '1px solid #fff', paddingBottom: '5px', color: '#fff' }}>
            Cart Summary:
          </h5>
          <ul className="list-group mb-4">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: idx % 2 === 0 ? '#00c9ff33' : '#92fe9d33',
                  color: '#fff',
                  border: 'none',
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginRight: '12px',
                    }}
                  />
                  <div>
                    <div>{item.name}</div>
                    <div className="mt-1 d-flex align-items-center">
                      <button
                        onClick={() => updateQuantity(idx, -1)}
                        style={{
                          background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
                          border: 'none',
                          color: '#fff',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          marginRight: '8px',
                          transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(idx, 1)}
                        style={{
                          background: 'linear-gradient(45deg, #00b09b, #96c93d)',
                          border: 'none',
                          color: '#fff',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          marginLeft: '8px',
                          transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <h5 style={{ fontWeight: '700', color: '#ffffff' }}>Total: ₹{calculateTotal()}</h5>
          <button
            onClick={handlePlaceOrder}
            className="btn w-100 mt-3"
            style={{
              background: 'linear-gradient(90deg, #8e2de2 0%, #4a00e0 100%)',
              color: '#fff',
              fontWeight: '700',
              letterSpacing: '1px',
              padding: '14px 0',
              fontSize: '18px',
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(138, 43, 226, 0.5)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = 'linear-gradient(90deg, #4a00e0 0%, #8e2de2 100%)')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = 'linear-gradient(90deg, #8e2de2 0%, #4a00e0 100%)')
            }
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
