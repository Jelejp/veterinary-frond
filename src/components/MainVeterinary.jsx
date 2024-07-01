import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';


const MainVeterinary = () => {

const [loading, setLoading] = useState(false);
  const [veterinarians, setVeterinarians] = useState([]);
  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    const fetchVeterinarians = async () => {

      setLoading(true);

      try {

        const response = await axios.get('https://mh-veterinary-api.onrender.com/api-veterinarian/veterinarians/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVeterinarians(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error al obtener la lista de veterinarios:', error);
      }
      setLoading(false);
    };

    fetchVeterinarians();

  }, []);

  if (loading) {
		return <Spinner />;
	}

  return (
    <div className='my-8'>
      <div>
        <picture className="object-cover text-center">
          <img className='w-full h-[400px] text-center object-cover' src="/assets/banner-veterinario.jpeg" alt="Banner Veterinariam" />
        </picture>
      </div>
      <div className='flex flex-wrap w-full px-2 py-8'>
        <div className="flex flex-wrap w-full gap-4 justify-center">
          {veterinarians.map((vet) => (
            <div
              key={vet.name}
              className="bg-[#ffe2c8] hover:bg-[#FAE7D5] rounded-lg shadow-md p-4 flex flex-col justify-between w-full md:w-2/5"
              style={{ maxWidth: '400px' }}
            >
              <img
                src={vet.image}
                alt={vet.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div>
                <h2 className="text-base font-bold mb-2">{vet.name}</h2>
                <p className="text-gray-600 mb-2 text-sm"><span className='font-bold'>Specialty:</span> {vet.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainVeterinary;



/* import React, { useState } from 'react'
import { veterinarians } from '../utils/veterinariams'
import InputSearch from './InputSearch'
import axios from 'axios'



const MainVeterinary = () => {

  return (
    <div>
      
      <div className='flex flex-wrap w-full px-2 py-8'>
        <div className="flex flex-wrap w-full gap-4 justify-center">
          {veterinarians.map((vet) => (
            <div
              key={vet.name}
              className="bg-[#ffe2c8] hover:bg-[#FAE7D5] rounded-lg shadow-md p-4 flex flex-col justify-between w-full md:w-2/5"
              style={{ maxWidth: '400px' }}
            >
              <img
                src={vet.image}
                alt={vet.name}
                className="w-full h-64 object-cover rounded-lg mb-4" />
              <h2 className="text-base font-bold mb-2">{vet.name}</h2>
              <p className="text-gray-600 mb-2 text-sm">Specialty: {vet.specialty}</p>
              <p className="text-gray-600 mb-4 text-sm">Education: {vet.education}</p>
              <p className="text-gray-600 text-sm mb-2">Age: {vet.age}</p>
              <div className='flex justify-center w-full'>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainVeterinary */
