import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Translator from './components/Translator';
import FAQ from './components/FAQ.jsx';
import About from './components/About';
import Signup from './components/Signup'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
