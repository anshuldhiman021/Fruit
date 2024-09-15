import React, { useEffect, useState } from 'react';
import './FAQ.css'; // Import CSS

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingId, setEditingId] = useState(null); // To handle edit state
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');

  // Fetch FAQs on component mount
  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await fetch('http://localhost:8000/faqs');
      const data = await res.json();
      setFaqs(data);
    };
    fetchFaqs();
  }, []);

  // Create a new FAQ
  const handleCreateFaq = async () => {
    const newFaq = { question: newQuestion, answer: newAnswer };
    const res = await fetch('http://localhost:8000/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFaq),
    });
    const data = await res.json();
    setFaqs([...faqs, data]);
    setNewQuestion('');
    setNewAnswer('');
  };

  // Edit an FAQ (open edit mode)
  const handleEditFaq = (faq) => {
    setEditingId(faq.id);
    setEditedQuestion(faq.question);
    setEditedAnswer(faq.answer);
  };

  // Update an existing FAQ
  const handleUpdateFaq = async (id) => {
    const updatedFaq = { question: editedQuestion, answer: editedAnswer };
    await fetch(`http://localhost:8000/faqs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFaq),
    });
    setFaqs(faqs.map(faq => (faq.id === id ? { ...faq, ...updatedFaq } : faq)));
    setEditingId(null);
  };

  // Delete an FAQ
  const handleDeleteFaq = async (id) => {
    await fetch(`http://localhost:8000/faqs/${id}`, {
      method: 'DELETE',
    });
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2>FAQs</h2>
      </div>

      <div className="create-faq">
        <h3>Create FAQ</h3>
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button onClick={handleCreateFaq}>Create</button>
      </div>

      <ul className="faq-list">
        {faqs.map((faq) => (
          <li key={faq.id} className="faq-item">
            {editingId === faq.id ? (
              <div className="edit-faq">
                <input
                  type="text"
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                />
                <input
                  type="text"
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                />
                <button onClick={() => handleUpdateFaq(faq.id)}>Save</button>
              </div>
            ) : (
              <>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
                <button onClick={() => handleEditFaq(faq)}>Edit</button>
                <button onClick={() => handleDeleteFaq(faq.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
