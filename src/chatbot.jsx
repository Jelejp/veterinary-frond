import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import chatbotIcon from '/assets/chatbot.png'; // Asegúrate de que la ruta a la imagen es correcta

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
      { value: 'info_clinica', label: 'Clinic Information', trigger: 'info_clinica' },
    ],
  },
  {
    id: 'pedir_turno',
    message: 'To request an appointment, you can visit our services page and select the one you prefer, or call us at 350-890-4597.',
    trigger: 'final',
  },
  {
    id: 'ver_cuenta',
    message: 'To view your account, please log in to our page and go to the account section.',
    trigger: 'final',
  },
  {
    id: 'info_clinica',
    message: 'We are located at Paraguay 1919, Recoleta. Our hours are from 9 am to 6 pm, Monday through Saturday.',
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
  bubbleStyle: {
    padding: '10px 15px',
    maxWidth: '70%',
  },
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <div className={`fixed-chatbot ${isOpen ? 'chatbot-open' : ''}`}>
      <div className={`chatbot-icon-container ${isOpen ? 'icon-right' : 'icon-center'}`}>
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

export default Chatbot;
