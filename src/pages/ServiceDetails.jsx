import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentTable from '../components/AppointmentTable';
import AuthLayout from '../layout/AuthLayout';
import Swal from 'sweetalert2';
import axios from 'axios';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const serviceResponse = await axios.get(`http://localhost:8080/api-veterinary/offerings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const clientResponse = await axios.get('http://localhost:8080/api-veterinary/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setService(serviceResponse.data);
        setPets(clientResponse.data.pets);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch data',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handlePetChange = (event) => {
    setSelectedPetId(event.target.value);
  };

  const handleReserveClick = () => {
    Swal.fire({
      title: `Your turn for ${service.name} was correctly booked for ${selectedAppointment}.`,
      icon: "success"
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>No service found.</div>;
  }

  return (
    <AuthLayout>
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

          <AppointmentTable setSelectedAppointment={setSelectedAppointment} serviceId={service.id} petId={selectedPetId} pets={pets} />

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
      </div>
    </AuthLayout>
  );
};

export default ServiceDetails;
