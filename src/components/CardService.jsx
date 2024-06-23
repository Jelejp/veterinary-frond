import React, { useState } from 'react';
import { services } from '../utils/serviceList';
import { Link } from 'react-router-dom';
import InputSearch from './InputSearch';

const CardService = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <InputSearch searchTerm={searchTerm} onSearch={handleSearch} />
            {filteredServices.length === 0 ? (
                <p className="text-center text-gray-500">No services found with that name.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <div
                            key={service.name}
                            className="bg-[#ffe2c8] hover:bg-[#FAE7D5] rounded-lg shadow-md p-4 flex flex-col justify-between"
                        >
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-64 object-cover rounded-lg mb-4" />
                            <h2 className="text-xl font-bold mb-2">{service.name}</h2>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <div className='flex justify-center w-full'>
                                <Link to={`/auth/service/${service.name}`} >
                                    <button className="relative inline-block px-6 py-3 text-lg font-semibold text-gray-400 bg-transparent border-none rounded-full cursor-pointer transition-all duration-600 ease-in-out shadow-[0_0_0_2px_rgba(255,255,255,0.12)] hover:shadow-[0_0_0_5px_rgba(33,150,243,0.38)] hover:text-white active:scale-95 overflow-hidden hover:bg-[#8BA8C4]">
                                        <span className="relative z-10">View Details</span>
                                        <span className="absolute  bg-[#8BA8C4] rounded-full transition-all duration-800 ease-in-out transform -translate-x-1/2 -translate-y-1/2 hover:w-full hover:h-full hover:opacity-100"></span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardService;
