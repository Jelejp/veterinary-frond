import React from 'react';
import { useState } from 'react';
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
            { value: 'conocer_veterinarios', label: 'Conocer a nuestros Veterinarios', trigger: 'conocer_veterinarios' },
            { value: 'conocer_servicios', label: 'Conocer todos nuestros Servicios', trigger: 'conocer_servicios' },
        ],
    },
    {
        id: 'pedir_turno',
        message: 'Para sacar un turno, presiona en el servicio a seleccionar en "view details" y luego verifica si el turno en el horario deseado esta  disponible.',
        trigger: 'final',
    },
    {
        id: 'ver_cuenta',
        message: 'Para conocer el detalle de tu cuenta, registrar a una mascota nueva, o ver los detalles de tus servicios ve a la sección de cuenta.',
        trigger: 'final',
    },
    {
        id: 'info_clinica',
        message: 'Estamos ubicados en la calle Paraguay 1919, Recoleta y nuestro horario es de 9 am a 6 pm de lunes a sábados.',
        trigger: 'final',
    },
    {
        id: 'conocer_veterinarios',
        message: 'Si quieres conocer a nuestros veterinarios, navega a la sección "veterinary" y conoce a nuestro equipo de trabajo.',
        trigger: 'final',
    },
    {
        id: 'conocer_servicios',
        message: 'Conoce todos nuestros servicios en la sección "services".',
        trigger: 'final',
    },
    {
        id: 'final',
        message: '¿Necesitas algo más?',
        trigger: 'options',
    },
]

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
}


const ChatbotAuth = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatbot = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="fixed-chatbot">
            <button onClick={toggleChatbot} className="chatbot-button">
                {isOpen ? 'Close' : 'ChatBot'}
            </button>
            {isOpen && (
                <ThemeProvider theme={theme}>
                    <ChatBot steps={steps} />
                </ThemeProvider>
            )}
        </div>
    )
}

export default ChatbotAuth