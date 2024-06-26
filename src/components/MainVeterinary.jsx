import React, { useState } from 'react'
import { veterinarians } from '../utils/veterinariams'
import InputSearch from './InputSearch'


const MainVeterinary = () => {

    return (
        <div>
            <div>
                <picture className="object-cover text-center">
                    <img className='w-full h-[400px] text-center' src="/assets/banner-veterinario.jpeg" alt="Banner Veterinariam" />
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

export default MainVeterinary
