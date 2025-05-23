import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const History = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchOrders = async () => {
      try {
        const storedToken = token || localStorage.getItem("cookie");
        // const res = await axios.get("http://localhost:3000/api/orders/history", {
        //   headers: { Authorization: `Bearer ${storedToken}` },
        // });
        const res = await axios.get(`${import.meta.env.VITE_APP}/api/orders/history`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <h5 className="text-muted">Loading your order history...</h5>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center my-5">
        <h5 className="text-muted">No past orders found.</h5>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4 fw-bold"
        style={{
          background: "linear-gradient(90deg, #38ef7d 0%, #11998e 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        data-aos="fade-down"
      >
        🧾 Order History
      </h2>

      {orders.map((order, idx) => (
        <div
          key={order._id}
          className="card shadow mb-4"
          style={{
            borderLeft: "6px solid #38ef7d",
            borderRadius: "16px",
            backgroundColor: "#f8f9fa",
          }}
          data-aos="fade-up"
          data-aos-delay={idx * 100}
        >
          <div className="card-body">
            <h5 className="card-title text-success fw-semibold">
              📅 Placed On:{" "}
              {new Date(order.placedAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </h5>
            <p className="mb-1">
              <strong>🏠 Address:</strong> {order.address}
            </p>
            <p className="mb-1">
              <strong>📞 Phone:</strong> {order.phone}
            </p>
            <p className="mb-3">
              <strong>💳 Payment:</strong> {order.payment || "Cash on Delivery"}
            </p>

            <h6 className="fw-bold text-primary">🛒 Products:</h6>
            <ul className="list-group mb-3">
              {order.products.map((product, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "#e9f7f4" }}
                >
                  {product.name} (x{product.quantity})
                  <span className="text-success fw-semibold">
                    ₹{product.price * product.quantity}
                  </span>
                </li>
              ))}
            </ul>

            <h5 className="fw-bold text-end text-success">
              💰 Total Paid: ₹{order.totalPrice}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
