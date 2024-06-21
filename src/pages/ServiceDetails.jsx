import React, { useState } from 'react'; 
import AppointmentTable from '../components/AppointmentTable';
 

const ServiceDetails = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const handleReserveClick = () => {
        alert(`Su turno para Canine Hairdressing fue reservado correctamente para ${selectedAppointment}.`);
        //aca podriamos crear la factura
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <img
                    src="https://via.placeholder.com/400x200"
                    alt="Canine Hairdressing"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h1 className="text-3xl font-bold text-green-700 mb-4">Canine Hairdressing</h1>
                <p className="text-lg text-gray-700 mb-4">Grooming service to keep your pet clean and healthy.</p>
                <p className="text-lg text-gray-700 mb-4">Requirements: None</p>
                <h2 className="text-2xl font-bold text-green-700 mb-2">Price: $40.00</h2>
                <h3 className="text-xl font-bold text-green-700 mb-4">Attended by: Dr. Pepe Perez</h3>

                <h3 className="text-xl font-bold text-green-700 mb-4">Available Shifts</h3>
                <AppointmentTable setSelectedAppointment={setSelectedAppointment} />

                {selectedAppointment && (
                    <div className="mt-4">
                        <button
                            onClick={handleReserveClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                           book an appointment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDetails;