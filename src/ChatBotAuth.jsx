import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import chatbotIcon from '/assets/chatbot.png';

const steps = [
  {
    id: '1',
    message: 'Hello, welcome to VetNova Clinic. How can I assist you today?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'pedir_turno', label: 'Request an Appointment', trigger: 'pedir_turno' },
      { value: 'ver_cuenta', label: 'View Account', trigger: 'ver_cuenta' },
      { value: 'conocer_veterinarios', label: 'Meet Our Veterinarians', trigger: 'conocer_veterinarios' },
    ],
  },
  {
    id: 'pedir_turno',
    component: (
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#fff', backgroundColor: '#8BA8C4', padding: '10px', borderRadius: '10px', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
        To request an appointment, click on the service you want under "view details" and then check if the appointment is available at your desired time.
        <br /><br />
        <Link 
          to="/auth/services"
          style={{ 
            padding: '10px', 
            backgroundColor: '#fff', 
            color: '#8BA8C4', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
          Go to Services
        </Link>
      </div>
    ),
    trigger: 'final',
  },
  {
    id: 'ver_cuenta',
    component: (
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#fff', backgroundColor: '#8BA8C4', padding: '10px', borderRadius: '10px', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
        To view the details of your account, register a new pet, or see your service details, go to the account section.
        <br /><br />
        <Link 
          to="/auth/account"
          style={{ 
            padding: '10px', 
            backgroundColor: '#fff', 
            color: '#8BA8C4', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
          Go to Account
        </Link>
      </div>
    ),
    trigger: 'final',
  },
  {
    id: 'conocer_veterinarios',
    component: (
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#fff', backgroundColor: '#8BA8C4', padding: '10px', borderRadius: '10px', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
        To see our team of professionals, click here.
        <br /><br />
        <Link 
          to="/auth/veterinary"
          style={{ 
            padding: '10px', 
            backgroundColor: '#fff', 
            color: '#8BA8C4', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
          Go to Our Team
        </Link>
      </div>
    ),
    trigger: 'final',
  },
  {
    id: 'final',
    message: 'Do you need anything else?',
    trigger: 'options',
  },
];

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#8BA8C4',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#8BA8C4',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const ChatbotAuth = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed-chatbot ${isOpen ? 'chatbot-open' : ''}`}>
      <div className="chatbot-icon-container">
        <img src={chatbotIcon} alt="Chatbot Icon" className="chatbot-icon" />
      </div>
      <button onClick={toggleChatbot} className="chatbot-button">
        {isOpen ? '✕' : 'ChatBot'}
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default ChatbotAuth;
