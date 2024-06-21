import React from 'react';
import { services } from '../utils/serviceList';
import { Link } from 'react-router-dom';

const CardService = () => {


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service.name}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                    >
                        <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-64 object-cover rounded-lg mb-4"/>
                        <h2 className="text-xl font-bold mb-2">{service.name}</h2>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                     
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View Details
                        </button>
                    
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardService;