import React from 'react';

const AppointmentClientTable = ({ appointments, cancelAppointment }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'cancelled':
                return 'text-red-500';
            case 'confirmed':
                return 'text-green-500';
            case 'pending':
                return 'text-yellow-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="mb-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#FAE7D5]">
                    <tr>
                        <th className="py-2 px-4 sm:px-6 text-center">Date</th>
                        <th className="py-2 px-4 sm:px-6 text-center">Time</th>
                        <th className="py-2 px-4 sm:px-6 text-center">Status</th>
                        <th className="py-2 px-4 sm:px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#FAE7D5]">
                    {appointments.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                                No appointments available.
                            </td>
                        </tr>
                    ) : (
                        appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="py-2 px-4 sm:px-6 text-center">{new Date(appointment.dateTime).toLocaleDateString()}</td>
                                <td className="py-2 px-4 sm:px-6 text-center">{new Date(appointment.dateTime).toLocaleTimeString()}</td>
                                <td className={`py-2 px-4 sm:px-6 text-center ${getStatusColor(appointment.appointmentStatus)}`}>
                                    {appointment.appointmentStatus}
                                </td>
                                <td className="py-2 px-4 sm:px-6 text-center">
                                    {appointment.appointmentStatus === 'CONFIRMED' && (
                                        <button
                                            onClick={() => cancelAppointment(appointment.id)}
                                            className="text-red-500 hover:text-red-700 font-bold">
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentClientTable;
