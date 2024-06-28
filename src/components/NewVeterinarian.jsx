import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const NewVeterinarian = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const token = useSelector((state) => state.authReducer.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const veterinarianData = {
      name,
      specialty,
      address,
      phone,
      email
    };

    try {
      const response = await axios.post('http://localhost:8080/api-veterinarian/veterinarians/new', veterinarianData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Veterinario creado con éxito:', response.data);
      Swal.fire({
        title: 'Success',
        text: 'Veterinario creado con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

    } catch (error) {
      console.error('Error al crear veterinario:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al crear veterinario',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md w-10/12 mb-14">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Especialidad:</label>
        <input
          type="text"
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-end">
        <button style={{ border: '1px solid black' }}
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Veterinario
        </button>
      </div>
    </form>
  );
  
};

export default NewVeterinarian;
