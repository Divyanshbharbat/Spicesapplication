import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const AddToCart = () => {
  let navigate=useNavigate()
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('cookie');

  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(()=>{
    let token =localStorage.getItem("cookie")
    if(!token){
      navigate("/login")
    }
  },[])

 const fetchCart = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Ensure res.data.cart is an array
    if (Array.isArray(res.data.cart)) {
      setCart(res.data.cart);
    } else {
      setCart([]);  // fallback empty array
    }
  } catch (error) {
    console.error('Fetch cart error:', error);
    setCart([]);  // fallback empty array on error
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
      // await axios.delete(`http://localhost:3000/api/cart/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
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
      const res = await axios.post(
        // 'http://localhost:3000/api/order/place',
        `${import.meta.env.VITE_APP}/api/order/place`,
        
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Order placed successfully!');
      setCart([]); // Clear cart
    } catch (error) {
      toast.error('Failed to place order');
      console.error('Place order error:', error);
    }
  };

  return (
    <div className="container py-5">
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
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => updateQuantity(item.id, 'decrement')}
                        disabled={item.quantity <= 1}
                      >-</button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-sm btn-outline-success ms-2"
                        onClick={() => updateQuantity(item.id, 'increment')}
                      >+</button>
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
          <NavLink to="/placeorder"><button className="btn btn-success px-4 py-2 fw-bold rounded-pill shadow" onClick={placeOrder}>
              🛍️ Place Order
            </button></NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
