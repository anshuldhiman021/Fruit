import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import './Translator.css'; // Import the CSS file

const Translator = () => {
  const [text, setText] = useState(''); // Input text
  const [translated, setTranslated] = useState(''); // Translated text
  const [targetLanguage, setTargetLanguage] = useState('hi'); // Default language: Hindi

  const handleTranslate = async () => {
    const url = 'https://libretranslate.de/translate'; // LibreTranslate API URL

    const requestBody = {
      q: text,
      source: 'en', // Source language (default is English)
      target: targetLanguage,
      format: 'text',
    };

    try {
      console.log('Request Body:', requestBody); // Log request body

      const response = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response Data:', response.data); // Log response data

      if (response.data && response.data.translatedText) {
        setTranslated(response.data.translatedText);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Translation error:', error.message);
      setTranslated(`Error: ${error.message}`);
    }
  };

  return (
    <div className="translator-container">
      <h2>Translator</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
        <option value="zh">Chinese (Simplified)</option>
      </select>

      <button onClick={handleTranslate}>Translate</button>

      {translated && <p>Translation: {translated}</p>}
    </div>
  );
};

export default Translator;
