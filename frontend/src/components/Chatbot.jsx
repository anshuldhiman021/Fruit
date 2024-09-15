import React, { useState } from 'react';
import './Chatbot.css'; // Create a separate CSS file for styles

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }]);

    // Simulate bot response after user message
    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }, { text: response, sender: 'bot' }]);
    }, 500);

    // Clear input field
    setInput('');
  };

  const getBotResponse = (input) => {
    // Basic response logic
    const lowercasedInput = input.toLowerCase();
    if (lowercasedInput.includes('apple')) {
      return 'Apple is a red fruit, sweet and crunchy.';
    } else if (lowercasedInput.includes('banana')) {
      return 'Banana is a yellow fruit, soft and sweet.';
    } else {
      return 'Sorry, I don’t understand that.';
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h3>John Doe</h3>
        <span className="status">Online</span>
      </div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>
          <i className="send-icon">➤</i> {/* Icon similar to the arrow in your image */}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
