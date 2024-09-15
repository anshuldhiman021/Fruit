import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importing a CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Fruit.Ai</h1>
      <p className="subtitle">"Be Healthy!"</p>
      <div className="button-grid">
        <Link to="/chatbot" className="button chat">Chat</Link>
        <Link to="/translator" className="button translator">Translator</Link>
        <Link to="/faq" className="button faq">FAQs</Link>
        <Link to="/about" className="button about">About</Link>
      </div>
    </div>
  );
}

export default Home;
