import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const DeleteVeterinarian = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedVeterinarianId, setSelectedVeterinarianId] = useState('');
  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    const fetchVeterinarians = async () => {

      try {

        const response = await axios.get('https://mh-veterinary-api.onrender.com/api-veterinarian/veterinarians/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(response.data);
        setVeterinarians(response.data);

      } catch (error) {
        console.error('Error al obtener la lista de veterinarios:', error);
      }
    };

    fetchVeterinarians();
  }, [token]);

  const handleChange = (e) => {
    setSelectedVeterinarianId(e.target.value);
  };

  const handleDelete = async () => {

    if (!selectedVeterinarianId) {
      Swal.fire({
        title: 'Warning',
        text: 'Please, select a veterinarian.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }

    const data = { id: selectedVeterinarianId }

    try {
      await axios.delete('https://mh-veterinary-api.onrender.com/api-veterinarian/veterinarians/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data 
      });

      Swal.fire({
        title: 'Success',
        text: 'Veterinario eliminado con exito.',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

      setVeterinarians(veterinarians.filter(vet => vet.id !== selectedVeterinarianId));
      setSelectedVeterinarianId('');

    } catch (error) {
      console.error('Error al eliminar el veterinario:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al eliminar el veterinario.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md w-10/12 mb-14">
      <div>
        <label htmlFor="veterinarian" className="block text-sm font-medium text-gray-700">Select a veterinarian:</label>
        <select
          id="veterinarian"
          value={selectedVeterinarianId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a veterinarian</option>
          {veterinarians.map(vet => (
            <option key={vet.id} value={vet.id}>
              {vet.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          style={{ border: '1px solid black' }}
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Delete Veterinary
        </button>
      </div>
    </div>
  );
};

export default DeleteVeterinarian;
