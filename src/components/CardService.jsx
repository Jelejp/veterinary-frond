import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputSearch from './InputSearch';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const CardService = () => {
    const token = useSelector(store => store.authReducer.token)
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const mensajeError = () => {
        toast.error('Error fetching services', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    useEffect(() => {
        const getServices = async () => {
            // const token = localStorage.getItem('token');
            console.log("Token retrieved from localStorage:", token); // Debugging line
            if (!token) {
                console.error("No token found in localStorage");
                mensajeError();
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:8080/api-veterinary/offerings/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setServices(response.data);
            } catch (error) {
                console.log("Error in API call:", error);
                mensajeError();
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <InputSearch searchTerm={searchTerm} onSearch={handleSearch} />
            {loading ? (
                <p className="text-center text-gray-500">Loading services...</p>
            ) : filteredServices.length === 0 ? (
                <p className="text-center text-gray-500">No services found with that name.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-[#ffe2c8] hover:bg-[#FAE7D5] rounded-lg shadow-md p-4 flex flex-col justify-between"
                        >
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-64 object-cover rounded-lg mb-4" />
                            <h2 className="text-xl font-bold mb-2">{service.name}</h2>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <div className='flex justify-center w-full'>
                                <Link to={`/auth/service/${service.id}`} >
                                    <button className="relative  px-6 py-3 text-lg font-semibold text-gray-400 bg-transparent border-none rounded-full cursor-pointer transition-all duration-600 ease-in-out shadow-[0_0_0_2px_rgba(255,255,255,0.12)] hover:shadow-[0_0_0_5px_rgba(33,150,243,0.38)] hover:text-white active:scale-95 overflow-hidden hover:bg-[#8BA8C4]">
                                        <span className="relative z-10">View Details</span>
                                        <span className="absolute bg-[#8BA8C4] rounded-full transition-all duration-800 ease-in-out transform -translate-x-1/2 -translate-y-1/2 hover:w-full hover:h-full hover:opacity-100 "></span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CardService;
