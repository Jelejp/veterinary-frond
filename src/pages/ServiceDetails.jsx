import React, { useState } from 'react';
import AppointmentTable from '../components/AppointmentTable';
import AuthLayount from '../layout/AuthLayout.jsx';
import Swal from 'sweetalert2';
import { services } from '../utils/serviceList';
import { useParams } from 'react-router-dom';
import ChatbotAuth from '../ChatBotAuth.jsx';


const ServiceDetails = () => {
    const { name } = useParams();
    const service = services.find((service) => service.name === name);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const handleReserveClick = () => {
        Swal.fire({
            title: `Your turn for ${service.name} was correctly booked for ${selectedAppointment}.`,
            icon: "success"
        });
        //aca podriamos crear la factura
    };

    return (
        <>
            <AuthLayount>

                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                        <h1 className="text-3xl font-bold text-[#5aa6ec] mb-4">{service.name}</h1>
                        <p className="text-lg text-gray-700 mb-4">{service.description}</p>
                        <p className="text-lg text-gray-700 mb-4 mt-3">Requirements: {service.requirements}</p>
                        <h2 className="text-2xl font-bold text-[#5aa6ec] mb-2">Price: ${service.price.toFixed(2)}</h2>
                        <h3 className="text-xl font-bold text-[#5aa6ec] mb-4">Attended by: {service.attendedBy}</h3>

                        <h3 className="text-xl font-bold text-[#5aa6ec] mb-4">Available Shifts</h3>
                        <AppointmentTable setSelectedAppointment={setSelectedAppointment} />

                        {selectedAppointment && (
                            <div className="mt-4">
                                <button
                                    onClick={handleReserveClick}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Book an appointment
                                </button>
                            </div>
                        )}
                    </div>
                    <ChatbotAuth/>
                </div>
            </AuthLayount>
        </>
    );
};

export default ServiceDetails;