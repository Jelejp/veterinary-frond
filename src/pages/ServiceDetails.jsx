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
  const [selectedPet, setSelectedPet] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [additionalChargeMessage, setAdditionalChargeMessage] = useState('');

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
        setCalculatedPrice(serviceResponse.data.price);

      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch data',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    };

    fetchServiceDetails();
  }, [id]);

  const calculatePrice = (petSize) => {
    const basePrice = service.price;
    let additionalCharge = 0;

    switch (petSize) {
      case 'SMALL':
        additionalCharge = 0;
        break;
      case 'MEDIUM':
        additionalCharge = 10;
        break;
      case 'LARGE':
        additionalCharge = 20;
        break;
      case 'BIGGER':
        additionalCharge = 30;
        break;
      default:
        break;
    }

    return basePrice + additionalCharge;
  };

  const handlePetChange = (petId) => {
    const selectedPet = pets.find(pet => pet.id === parseInt(petId, 10));
    if (selectedPet) {
      setSelectedPet(selectedPet);
      const updatedPrice = calculatePrice(selectedPet.animalSize);
      setCalculatedPrice(updatedPrice);

      if (selectedPet.animalSize !== 'SMALL') {
        setAdditionalChargeMessage(`Please note that additional charges apply based on the size of your pet. The updated price is $${updatedPrice.toLocaleString()}.`);
      } else {
        setAdditionalChargeMessage('');
      }
    }
  };

  if (!service) {
    return <div>Loading...</div>;
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
          <h3 className="text-xl font-bold text-[#5aa6ec] mb-2">Attended by: {service.attendedBy}</h3>
          <h2 className="text-2xl font-bold text-[#5aa6ec] mb-2">Price: ${calculatedPrice ? calculatedPrice.toLocaleString() : service.price.toLocaleString()}</h2>

          {additionalChargeMessage && (
            <p className="text-red-500 mb-4">{additionalChargeMessage}</p>
          )}

          <h2 className="text-xl font-bold text-[#5aa6ec] mt-3">Book your appointment:</h2>
          <AppointmentTable
            setSelectedAppointment={(dateTime) => setSelectedAppointment(dateTime)}
            serviceId={service.id}
            serviceName={service.name}
            pets={pets}
            handlePetChange={handlePetChange}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ServiceDetails;
