import React, { useState } from 'react';
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
            { value: 'info_clinica', label: 'Información de la Clínica', trigger: 'info_clinica' },
        ],
    },
    {
        id: 'pedir_turno',
        message: 'Para pedir un turno, puedes visitar nuestra página de servicios y seleccionar el que prefieras o llamarnos al 350-890-4597.',
        trigger: 'final',
    },
    {
        id: 'ver_cuenta',
        message: 'Para ver tu cuenta, inicia sesión en nuestra página y ve a la sección de cuenta.',
        trigger: 'final',
    },
    {
        id: 'info_clinica',
        message: 'Estamos ubicados en la calle Paraguay 1919, Recoleta. Nuestro horario es de 9 am a 6 pm de lunes a sábado.',
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
    bubbleStyle: {
        padding: '10px 15px',
        maxWidth: '70%',
    },
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(true); // Iniciar abierto por defecto

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const closeChatbot = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed-chatbot">
            <button onClick={toggleChatbot} className="chatbot-button">
                {isOpen ? 'Close' : 'ChatBot'}
            </button>
            {isOpen && (
                <div className="chatbot-container">
                    <ThemeProvider theme={theme}>
                        <ChatBot steps={steps} />
                    </ThemeProvider>
                    <button className="close-button" onClick={closeChatbot}>
                        X
                    </button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
