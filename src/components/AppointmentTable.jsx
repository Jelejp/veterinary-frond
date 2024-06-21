import React, { useState } from 'react';
import { appointments } from '../utils/appointmentsList';

const AppointmentTable = ({ setSelectedAppointment }) => {
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

    const handleSelectClick = (appointment) => {
        setSelectedAppointmentId(appointment.id);
        setSelectedAppointment(`${appointment.date} at ${appointment.time}`);
    };

    const handleCancelClick = () => {
        setSelectedAppointmentId(null);
        setSelectedAppointment(null);
    };

    return (
        <table className="min-w-full bg-[#E0E0E0]">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-200">Date</th>
                    <th className="py-2 px-4 border-b border-gray-200">Time</th>
                    <th className="py-2 px-4 border-b border-gray-200 ">Reservar</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">{appointment.date}</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">{appointment.time}</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                        {selectedAppointmentId === appointment.id ? (
                                <button
                                    onClick={handleCancelClick}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleSelectClick(appointment)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Select
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AppointmentTable;