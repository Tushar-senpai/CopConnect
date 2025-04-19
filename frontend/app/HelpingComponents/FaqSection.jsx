'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FaqSection = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Fetch all FAQs (questions only)
  useEffect(() => {
    axios.get('http://localhost:5001/api/faqs/getFaq')
      .then((res) => {
        console.log("Fetched FAQs:", res.data); // DEBUG
        setQuestions(res.data);
      })
      .catch((err) => console.error('Error fetching questions:', err));
  }, []);
  

  // On clicking a question, fetch its answer
  const handleClick = async (question) => {
    if (question === activeQuestion) {
      setSelectedAnswer(null);
      setActiveQuestion(null);
      return;
    }

    try {
      const encodedQuestion = encodeURIComponent(question);
      const res = await axios.get(`http://localhost:5001/api/faqs/getAnswers/${encodedQuestion}`);
      setSelectedAnswer(res.data.answer);
      setActiveQuestion(question);
    } catch (err) {
      console.error('Error fetching answer:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Community Help – FAQs</h2>
      <div className="space-y-3">
        {questions.map((faq) => (
          <div key={faq._id} className="border rounded-lg p-4">
            <button
              className="w-full text-left font-medium"
              onClick={() => handleClick(faq.question)}
            >
              {faq.question}
            </button>
            {activeQuestion === faq.question && (
              <p className="mt-2 text-gray-700">{selectedAnswer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
