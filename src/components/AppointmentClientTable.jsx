import React from 'react';

const AppointmenClientTable = ({ appointments, cancelAppointment }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'cancelled':
                return 'text-red-500';
            case 'active':
                return 'text-green-500';
            case 'pending':
                return 'text-yellow-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="mb-6">
            <table className="min-w-full divide-y divide-gray-200 mt-3">
                <thead className="bg-[#FAE7D5]">
                    <tr>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Time</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#FAE7D5]">
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td className="py-2 px-4 text-center">{appointment.date}</td>
                            <td className="py-2 px-4 text-center">{appointment.time}</td>
                            <td className={`py-2 px-4 text-center ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                            </td>
                            <td className="py-2 px-4 text-center">
                                {appointment.status === 'Active' && (
                                    <button
                                        onClick={() => cancelAppointment(appointment.id)}
                                        className="text-red-500 hover:text-red-700 font-bold">
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmenClientTable;