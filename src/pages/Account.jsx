import React, { useState } from 'react';
import ClientInfo from '../components/ClientInfo';
import PetCard from '../components/PetCard';
import InvoiceTable from '../components/InvoiceTable';
import AppointmenClientTable from '../components/AppointmentClientTable';
import AuthLayout from '../layout/AuthLayout';
import Swal from 'sweetalert2';

const Account = () => {
    const [client, setClient] = useState({
        id: 1,
        name: 'Juan Lopez',
        email: 'juan.lopez@gmail.com',
        phone: '123-456-7890',
        pets: [
            { id: 1, name: 'Firulais', species: 'Dog', breed: 'Labrador' },
            { id: 2, name: 'Michi', species: 'Cat', breed: 'Persian' },
        ],
        invoices: [
            { id: 1, date: '2024-06-25', amount: 50.00, paid: true },
            { id: 2, date: '2024-06-28', amount: 120.00, paid: false },
        ],
        appointments: [
            { id: 1, date: '2024-06-27', time: '10:00 AM', service: 'Grooming', status: 'Active' },
            { id: 2, date: '2024-06-30', time: '02:00 PM', service: 'Vaccination', status: 'Pending' },
            { id: 3, date: '2024-07-02', time: '11:30 AM', service: 'Check-up', status: 'Cancelled' },
        ],
    });

    const cancelAppointment = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setClient((prevClient) => ({
                    ...prevClient,
                    appointments: prevClient.appointments.map((appointment) =>
                        appointment.id === id ? { ...appointment, status: 'Cancelled' } : appointment
                    ),
                }));
                Swal.fire({
                    title: 'Cancelled!',
                    text: 'Your appointment has been cancelled.',
                    icon: 'success'
                });
            }
        });
    };

    return (
        <>
        <AuthLayout>
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-[#6ca8e0] mb-4">Account Details</h1>
                <ClientInfo client={client} />

                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Pets:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {client.pets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </div>
                </div>
                <h1 className='text-3xl font-bold text-[#6ca8e0] p-2'>Invoices</h1>

                <InvoiceTable invoices={client.invoices} />

                <h1 className='text-3xl font-bold text-[#6ca8e0] p-2'>Appointments</h1>
                <AppointmenClientTable appointments={client.appointments} cancelAppointment={cancelAppointment} />
            </div>
        </div>

        </AuthLayout>
        </>
    );
};

export default Account;