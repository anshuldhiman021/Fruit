import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual login logic
    if (email === 'user@example.com' && password === 'password') {
      navigate('/home'); // Navigate to the home page
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the signup page when "Sign Up" is clicked
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <p>By signing in you are agreeing to our <a href="#">Terms and privacy policy</a></p>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="checkbox-field">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember password</label>
            <a href="#">Forget password</a>
          </div>
          <button type="submit">Login</button>
        </form>

        <div className="signup-option">
          <p>Don't have an account?</p>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
