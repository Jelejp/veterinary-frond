import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const EditServicePrice = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.authReducer.token);


  // Obtener servicios
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api-veterinary/offerings/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // console.log(response.data);
        setServices(response.data);

        if (response.data.length > 0) {
          setSelectedServiceId(response.data[0].id); // Selecciona el primer servicio por defecto
          setPrice(response.data[0].price); // Establece el precio del primer servicio por defecto
        }

      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [token]);

  // Manejar cambio en el select
  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedServiceId(selectedId);
    const selectedService = services.find(service => service.id === parseInt(selectedId));
    setPrice(selectedService.price);
  };

  // Manejar cambio en el precio
  const handlePriceChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatedService = {
      price,
      id: selectedServiceId
    };

    try {

      console.log(updatedService)
      const response = await axios.put(`http://localhost:8080/api-veterinary/offerings/update-price`, updatedService, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Service updated:', response.data);

      Swal.fire({
        title: 'Success',
        text: 'Service updated successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })

    } catch (error) {

      console.error('Error updating service:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update service',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md w-10/12 mb-14">
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service:</label>
        <select
          id="service"
          value={selectedServiceId}
          onChange={handleServiceChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-4'>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-end">
        <button style={{ border: '1px solid black' }}
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Price
        </button>
      </div>
    </form>
  );
};

export default EditServicePrice;
