import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
  {
    id: '1',
    message: 'Hola, bienvenido a la Clínica VetNova. ¿En qué puedo ayudarte hoy?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      { value: 'pedir_turno', label: 'Pedir Turno', trigger: 'pedir_turno' },
      { value: 'ver_cuenta', label: 'Ver Cuenta', trigger: 'ver_cuenta' },
      { value: 'conocer_veterinarios', label: 'Conocer a nuestros Veterinarios', trigger: 'conocer_veterinarios' },
    ],
  },
  {
    id: 'pedir_turno',
    component: (
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#fff', backgroundColor: '#8BA8C4', padding: '10px', borderRadius: '10px', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
        Para sacar un turno, presiona en el servicio a seleccionar en "view details" y luego verifica si el turno en el horario deseado está disponible.
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
          Ir a Servicios
        </Link>
      </div>
    ),
    trigger: 'final',
  },
  {
    id: 'ver_cuenta',
    component: (
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#fff', backgroundColor: '#8BA8C4', padding: '10px', borderRadius: '10px', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
        Para conocer el detalle de tu cuenta, registrar a una mascota nueva, o ver los detalles de tus servicios ve a la sección de cuenta.
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
          Ir a Cuenta
        </Link>
      </div>
    ),
    trigger: 'final',
  },
  {
    id: 'conocer_veterinarios',
    component: (
      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#fff', backgroundColor: '#8BA8C4', padding: '10px', borderRadius: '10px', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
        Para ver nuestro equipo de trabajo, presiona aquí.
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
          Ir a Equipo de Trabajo
        </Link>
      </div>
    ),
    trigger: 'final',
  },
  {
    id: 'final',
    message: '¿Necesitas algo más?',
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
  const [isOpen, setIsOpen] = useState(true); // Inicia el chatbot abierto

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed-chatbot">
      <button onClick={toggleChatbot} className="chatbot-button">
        {isOpen ? 'Cerrar' : 'ChatBot'}
      </button>
      {isOpen && (
        <ThemeProvider theme={theme}>
          <ChatBot steps={steps} />
        </ThemeProvider>
      )}
    </div>
  );
};

export default ChatbotAuth;
