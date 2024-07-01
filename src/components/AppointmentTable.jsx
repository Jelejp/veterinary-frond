import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, SimpleGrid, Flex, Text, Circle } from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { toZonedTime, format as formatTz } from 'date-fns-tz';

const AppointmentTable = ({ setSelectedAppointment, serviceId, serviceName, pets, handlePetChange }) => {
  const [dateTimeModal, setDateTimeModal] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPetId, setSelectedPetId] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredSlots, setFilteredSlots] = useState([]);
  const token = useSelector(store => store.authReducer.token);

  useEffect(() => {
    handleFetchAvailableSlots(serviceId);
  }, [serviceId]);

  
  const handleFetchAvailableSlots = async (serviceId) => {
    try {
      const response = await axios.get(`https://mh-veterinary-api.onrender.com/api-veterinary/offerings/${serviceId}`, {
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
      // Verifica que `slot.date` y `slot.availableHours` son cadenas válidas
      const localDateTimetoPost = new Date(`${slot.date}T${slot.availableHours}:00`);
      DateComponent(localDateTimetoPost)
      setDateTime(DateComponent(localDateTimetoPost))
      if (!slot.date || !slot.availableHours) {
        console.error('Invalid slot data:', slot);
        return;
      }
  
      // Verifica el formato de `slot.availableHours` y convierte `03:00 PM` a `15:00`
      const convertTo24HourFormat = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (modifier === 'PM' && hours !== '12') {
          hours = (parseInt(hours, 10) + 12).toString();
        }
        if (modifier === 'AM' && hours === '12') {
          hours = '00';
        }
        return `${hours.padStart(2, '0')}:${minutes}`;
      };
  
      const availableHours24 = convertTo24HourFormat(slot.availableHours);
      console.log(`Converted Available Hours: ${availableHours24}`);
  
      // Construye la cadena de fecha y hora en formato correcto
      const dateTimeString = `${slot.date}T${availableHours24}:00`;
  
      // Verifica si la cadena de fecha y hora es válida
      const localDateTime = new Date(dateTimeString);
      if (isNaN(localDateTime.getTime())) {
        console.error('Invalid date-time string:', dateTimeString);
        return;
      }
  
      // Formatea `LocalDateTime` para enviar al backend
      const formattedDateTime = localDateTime.toISOString().slice(0, 19); 
      
      console.log(`Formatted Local DateTime: ${formattedDateTime}`);
      setDateTimeModal(availableHours24);
      setSelectedSlotId(slot.id);
    }
  };
  

  const handleCreateAppointment = () => {
    const appointmentData = {
      dateTime,
      description,
      status: 'CONFIRMED',
      petId: parseInt(selectedPetId, 10),
      offeringId: parseInt(serviceId, 10),
      slotId: selectedSlotId,
    };

    Swal.fire({
      title: 'Confirm Appointment',
      html: `Are you sure you want to book this appointment?<br/><br/>Date: ${selectedDate} at ${dateTimeModal}<br/>Description: ${description}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then(async (confirmation) => {
      if (confirmation.isConfirmed) {
        try {
          console.log(appointmentData)
          const response = await axios.post('https://mh-veterinary-api.onrender.com/api-veterinary/appointments/new', appointmentData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 201) {
            Swal.fire({
              title: `Your appointment for ${serviceName} was successfully booked for ${selectedDate} at ${formatTime(dateTimeModal)}.`,
              icon: 'success'
            });

            setDateTimeModal('');
            setDescription('');
            setSelectedAppointment(dateTimeModal);

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

  // const formatDate = (dateString) => {
  //   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  //   return new Date(dateString).toLocaleDateString('en-US', options);
  // };



  const DateComponent = (fechaAFormatear) => {
    // Definir la fecha y hora en la zona horaria de Argentina
    const dateInArgentina = new Date(fechaAFormatear); // Hora local en Argentina
    
    // Convertir la fecha a UTC
    const timeZone = 'America/Argentina/Buenos_Aires';
    const dateInUTC = toZonedTime(dateInArgentina, timeZone);
  
    // Formatear la fecha en UTC en el formato ISO
    const isoStringArgentina = format(dateInUTC, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    return isoStringArgentina
  };


  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Argentina/Buenos_Aires' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  const selectDate = availableSlots.map(slot => {
    return {
      id:slot.id,
        day: slot.day,
        date: slot.date
    };
}).sort((a, b) => new Date(a.date) - new Date(b.date));

  const uniqueDates = [...selectDate.reduce((map, slot) => map.set(slot.date, slot), new Map()).values()];
  
  const handleChangeSelectDate = ({target}) => {
  setSelectedDate(target.value)
  const filtered = availableSlots
    .filter(slot => slot.date === target.value)
    .sort((a, b) => a.availableHours.localeCompare(b.availableHours));
  setFilteredSlots(filtered)
}

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
        <Select value={selectedDate} onChange={handleChangeSelectDate} required>
          <option value="" disabled>Select a date</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date.date}>{`${date.day}, ${date.date}`}</option>
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
        <Flex alignItems="center">
          <Circle size="10px" bg="red" mr={2} />
          <Text className='mt-[12px]'>Selected</Text>
        </Flex>
      </Flex>
      <SimpleGrid columns={[3, null, 4]} spacing={2} mb={2}>
        {filteredSlots.map(slot => (
          <Box
            key={slot.id}
            onClick={() => handleSlotSelection(slot)}
            className={
              selectedSlotId === slot.id
                ? 'bg-[#D32F2F]'
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
            fontSize="xl"
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