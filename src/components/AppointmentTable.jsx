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
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    handleFetchAvailableSlots(serviceId);
  }, [serviceId]);

  const handleFetchAvailableSlots = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api-veterinary/offerings/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSlotSelection = (slot) => {
    if (slot.available) {
      const localDateTime = new Date(`${slot.date}T${slot.availableHours}:00`);
      setDateTime(localDateTime.toISOString());
      setSelectedSlotId(slot.id);
    }
  };

  const handleCreateAppointment = () => {
    const appointmentData = {
      dateTime,
      description,
      status: 'SCHEDULED',
      petId: parseInt(selectedPetId, 10),
      offeringId: parseInt(serviceId, 10),
      slotId: selectedSlotId,
    };

    Swal.fire({
      title: 'Confirm Appointment',
      html: `Are you sure you want to book this appointment?<br/><br/>Date: ${formatDate(dateTime)} at ${formatTime(dateTime)}<br/>Description: ${description}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then(async (confirmation) => {
      if (confirmation.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:8080/api-veterinary/appointments/new', appointmentData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 201) {
            Swal.fire({
              title: `Your appointment for ${serviceName} was successfully booked for ${formatDate(dateTime)} at ${formatTime(dateTime)}.`,
              icon: 'success'
            });

            setDateTime('');
            setDescription('');
            setSelectedAppointment(dateTime);

            await handleFetchAvailableSlots(serviceId);
          } else {
            throw new Error('Error creating appointment');
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
      }
    });
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Argentina/Buenos_Aires' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  const uniqueDates = [...new Set(availableSlots.map(slot => slot.date))]
    .sort((a, b) => new Date(a) - new Date(b));

  const filteredSlots = availableSlots
    .filter(slot => slot.date === selectedDate)
    .sort((a, b) => a.availableHours.localeCompare(b.availableHours));

  return (
    <Box as="form" onSubmit={(e) => e.preventDefault()} p={4} maxWidth="600px" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
      <FormControl id="dateSelect" mb={4}>
        <FormLabel>Select Date</FormLabel>
        <Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required>
          <option value="">Select a date</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>{formatDate(date)}</option>
          ))}
        </Select>
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
        {filteredSlots.map(slot => (
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
            <Text>{slot.availableHours}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Button onClick={handleCreateAppointment} colorScheme="blue" mt={4} isDisabled={!dateTime}>
        Create Appointment
      </Button>
    </Box>
  );
};

export default AppointmentTable;
