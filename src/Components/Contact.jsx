import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP}/contact`, formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #fff1e6, #ffe3cc)',
        minHeight: '100vh',
        paddingBottom: '60px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <section
        className="text-center text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #d38312, #a83279)',
        }}
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Get in Touch</h1>
          <p className="lead mt-2">
            We're always here to help and connect with you.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="container py-5">
        <div className="row">
          {/* Contact Info */}
          <div className="col-md-5 mb-4" data-aos="fade-right">
            <h3 className="fw-bold mb-4 text-dark">Contact Information</h3>
            <p className="fs-5 text-muted">
              Reach out to us with your queries, feedback, or suggestions.
            </p>
            <div className="mt-4 text-muted">
              <p><strong>Email:</strong> support@fooddonate.org</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> 123 Hope Street, Pune, India</p>
              <p><strong>Hours:</strong> Mon - Fri | 10:00 AM - 5:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="col-md-7"
            data-aos="fade-left"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            }}
          >
            <h3 className="fw-bold mb-4 text-dark">Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ background: '#fff7f0' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ background: '#fff7f0' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label fw-semibold">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ background: '#fff7f0' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ background: '#fff7f0' }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-100 fw-bold text-white"
                style={{
                  background: 'linear-gradient(to right, #d38312, #a83279)',
                  border: 'none',
                }}
              >
                Send Message
              </button>
              {status && <div className="mt-3 text-center fw-semibold text-success">{status}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer-style CTA */}
      <section
        className="text-center py-5 text-white"
        style={{
          background: 'linear-gradient(to right, #ff9966, #ff5e62)',
        }}
        data-aos="zoom-in"
      >
        <div className="container">
          <h4 className="fw-bold">Thank you for reaching out!</h4>
          <p className="lead mb-0">Together, we can make a meaningful difference.</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;