import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentTable from '../components/AppointmentTable';
import AuthLayout from '../layout/AuthLayout';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ServiceDetails = () => {
  
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const token = useSelector(store => store.authReducer.token);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      
      try {
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
        additionalCharge = basePrice;
        break;
      case 'MEDIUM':
        additionalCharge = basePrice * 1.25;
        break;
      case 'LARGE':
        additionalCharge = basePrice * 1.5;
        break;
      case 'BIGGER':
        additionalCharge = basePrice * 1.75;
        break;
      default:
        additionalCharge = 0;
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
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
            <h2 className="text-3xl font-bold text-red-500  mb-2">Price: ${calculatedPrice ? calculatedPrice.toLocaleString() : service.price.toLocaleString()}</h2>
            <h2 className="text-xl font-bold text-[#5aa6ec] my-4">Book your appointment:</h2>
            <AppointmentTable
              setSelectedAppointment={setSelectedAppointment}
              serviceId={service.id}
              serviceName={service.name}
              pets={pets}
              handlePetChange={handlePetChange}
            />
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default ServiceDetails;