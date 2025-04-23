import React, { useState, useEffect, useRef } from "react";
import "./ChatButton.css";

const predefinedQuestions = [
  "What are the symptoms of COVID-19?",
  "How can I prevent seasonal flu?",
  "What should I do if I have a fever?",
  "What are the signs of dehydration?",
  "How can I maintain a healthy diet?",
  "Tips for better sleep?",
  "When should I get a health checkup?",
  "I want to talk to a doctor",
];

const responses = {
  "What are the symptoms of COVID-19?":
    "COVID-19 symptoms include fever, dry cough, fatigue, and loss of taste or smell. Some may experience sore throat, body aches, or difficulty breathing.",
  "How can I prevent seasonal flu?":
    "Get a flu vaccine annually, wash your hands often, avoid close contact with sick people, and maintain good hygiene habits.",
  "What should I do if I have a fever?":
    "Stay hydrated, get plenty of rest, and take fever-reducing medicine like acetaminophen if needed. Consult a doctor if it lasts more than 3 days.",
  "What are the signs of dehydration?":
    "Common signs include dry mouth, dark yellow urine, dizziness, and fatigue. Drink water regularly, especially in hot weather or after exercise.",
  "How can I maintain a healthy diet?":
    "Eat a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, sugar, and excessive salt.",
  "Tips for better sleep?":
    "Stick to a regular sleep schedule, avoid screens before bed, limit caffeine, and create a calm, dark sleep environment.",
  "When should I get a health checkup?":
    "Annually is ideal for most adults, or more often if you have a chronic condition or specific risk factors.",
  "I want to talk to a doctor":
    "Thank you! A healthcare professional will reach out to you shortly.",
};

const ChatButton = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! This is ChatButton. How may I help you?" },
  ]);

  const sendMessage = (text) => {
    const newMessages = [...messages, { from: "user", text }];
    const reply = responses[text] || "Let me get back to you on that.";
    newMessages.push({ from: "bot", text: reply });
    setMessages(newMessages);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>ChatBot</span>
        <button onClick={onClose}>End Conversation</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-questions">
        <p>Tap a question:</p>
        {predefinedQuestions.map((q, i) => (
          <button key={i} onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatButton;
