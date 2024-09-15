import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import CSS

const Signup = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder logic for signup, modify as per your requirements
    if (userId && password && email) {
      navigate('/home');
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="redirect">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
