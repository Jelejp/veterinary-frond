import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import ClientInfo from '../components/ClientInfo';
import PetCard from '../components/PetCard';
import InvoiceTable from '../components/InvoiceTable';
import AppointmentClientTable from '../components/AppointmentClientTable';
import AddPetModal from '../components/AddPetModal';
import AuthLayout from '../layout/AuthLayout';
import ChatbotAuth from '../ChatBotAuth';

const Account = () => {
  const token = useSelector(store => store.authReducer.token);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {

      try {

        const response = await axios.get('http://localhost:8080/api-veterinary/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setClient(response.data);

      } catch (error) {

        console.error("Error fetching client data:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch client data',
          icon: 'error',
          confirmButtonText: 'Ok'
        });

      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [token, isModalOpen]);

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
          confirmedAppointments: prevClient.confirmedAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, appointmentStatus: 'Cancelled' } : appointment
          ),
        }));
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!client) {
    return <div>No client data found.</div>;
  }

  const addPet = (newPet) => {
    setClient((prevClient) => ({
      ...prevClient,
      pets: [...prevClient.pets, newPet]
    }));
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
                {client.pets.map((pet, id) => (
                  <PetCard key={id} image={pet.imageUrl} petName={pet.petName} species={pet.specie} breed={pet.breed} petAge={pet.petAge} petSize={pet.animalSize} specialTreatment={pet.specialTreatment} />
                ))}
              </div>
              <AddPetModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>

            <h1 className='text-3xl font-bold text-[#6ca8e0] p-2'>Invoices</h1>
            <InvoiceTable invoices={client.chargedInvoices || []} />

            <h1 className='text-3xl font-bold text-[#6ca8e0] p-2'>Appointments</h1>
            <AppointmentClientTable appointments={client.confirmedAppointments} cancelAppointment={cancelAppointment} />
          </div>
          <ChatbotAuth />
        </div>
      </AuthLayout>
    </>
  );
};

export default Account;
