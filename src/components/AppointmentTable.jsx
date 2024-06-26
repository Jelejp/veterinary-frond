import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AppointmentTable = ({ setSelectedAppointment, serviceId, serviceName, pets, handlePetChange }) => {
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPetId, setSelectedPetId] = useState('');

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentData = {
      dateTime,
      description,
      status: 'SCHEDULED',
      petId: parseInt(selectedPetId, 10),
      offeringId: parseInt(serviceId, 10),
    };

    console.log('Appointment Data:', appointmentData);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api-veterinary/appointments/new', appointmentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 201) {
        throw new Error('Error creating appointment');
      }

      const formattedDateTime = formatDateTime(dateTime);

      Swal.fire({
        title: `Your turn for ${serviceName} was correctly booked for ${formattedDateTime}.`,
        icon: 'success'
      });

      setDateTime('');
      setDescription('');
      setSelectedAppointment(dateTime);
    } catch (error) {
      console.error('There was an error!', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to create appointment',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxWidth="500px" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <FormControl id="petSelect" mb={4}>
        <FormLabel>Select Pet</FormLabel>
        <Select value={selectedPetId} onChange={(e) => {
          setSelectedPetId(e.target.value);
          handlePetChange(e.target.value);
        }} required>
          <option value="">Select a pet</option>
          {pets.map(pet => (
            <option key={pet.id} value={pet.id}>{pet.petName}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="dateTime" mb={4}>
        <FormLabel>Date and Time</FormLabel>
        <Input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" mt={4}>
        Create Appointment
      </Button>
    </Box>
  );
};

export default AppointmentTable;