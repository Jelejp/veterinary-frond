import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, SimpleGrid, Flex, Text, Circle } from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AppointmentTable = ({ setSelectedAppointment, serviceId, serviceName, pets, handlePetChange }) => {
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPetId, setSelectedPetId] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  useEffect(() => {
    handleFetchAvailableSlots(serviceId);
  }, [serviceId]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleFetchAvailableSlots = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api-veterinary/offerings/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.availableSlots);
      const availableSlots = response.data.availableSlots;
      setAvailableSlots(availableSlots);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSlotSelection = (slot) => {
    if (slot.available) {
      setDateTime(`${slot.date}T${slot.availableHours}`);
      setSelectedSlotId(slot.id);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentData = {
      dateTime,
      description,
      status: 'SCHEDULED',
      petId: parseInt(selectedPetId, 10),
      offeringId: parseInt(serviceId, 10),
      slotId: selectedSlotId,
    };

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

      // Confirmación personalizada con SweetAlert2
      const confirmation = await Swal.fire({
        title: 'Confirm Appointment',
        html: `Are you sure you want to book this appointment?<br/><br/>Date: ${formattedDateTime}<br/>Description: ${description}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      });

      if (confirmation.isConfirmed) {
        Swal.fire({
          title: `Your turn for ${serviceName} was correctly booked for ${formattedDateTime}.`,
          icon: 'success'
        });

        const updatedSlots = availableSlots.map(slot =>
          slot.id === selectedSlotId ? { ...slot, available: false } : slot
        );
        setAvailableSlots(updatedSlots);

        setDateTime('');
        setDescription('');
        setSelectedAppointment(dateTime);
      } else {
        Swal.fire({
          title: 'Cancelled',
          text: 'Appointment booking cancelled.',
          icon: 'info',
        });
      }
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
    <Box as="form" onSubmit={handleSubmit} p={4} maxWidth="600px" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormControl>
      <Flex justifyContent="space-between" mb={4}>
        <Flex alignItems="center">
          <Circle size="10px" className="bg-[#8fb0ff]" mr={2} />
          <Text className='mt-[12px]'>Available</Text>
        </Flex>
        <Flex alignItems="center">
          <Circle size="10px" bg="gray" mr={2} />
          <Text className='mt-[12px]'>Occupied</Text>
        </Flex>
      </Flex>
      <SimpleGrid columns={[3, null, 4]} spacing={2} mb={2}>
        {availableSlots.map(slot => (
          <Box
            key={slot.id}
            onClick={() => handleSlotSelection(slot)}
            className={
              selectedSlotId === slot.id
                ? 'bg-[#3b8bd5]'
                : slot.available
                ? 'bg-[#6ca8e0]'
                : 'bg-gray-700'
            }
            color="white"
            p={1}
            borderRadius="md"
            textAlign="center"
            cursor={slot.available ? 'pointer' : 'not-allowed'}
            opacity={slot.available ? 1 : 0.6}
            fontSize="xs"
          >
            <Text>{slot.date}</Text>
            <Text>{slot.availableHours}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Button type="submit" colorScheme="blue" mt={4} isDisabled={!dateTime}>
        Create Appointment
      </Button>
    </Box>
  );
};

export default AppointmentTable;