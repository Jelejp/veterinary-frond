import React, { useState } from 'react';
import AppointmentTable from '../components/AppointmentTable';
import AuthLayount from '../layout/AuthLayout.jsx';
import Swal from 'sweetalert2';
import { services } from '../utils/serviceList';
import { useParams } from 'react-router-dom';


const ServiceDetails = () => {
    const { name } = useParams();
    const service = services.find((service) => service.name === name);
    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const handleReserveClick = () => {
        Swal.fire({
            title: `Your turn for Canine Hairdressing was correctly booked for ${selectedAppointment}.`,
            icon: "success"
          });
        //aca podriamos crear la factura
    };

    return (
        <>
             <AuthLayount>

             {/*   <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <img
                            src="src\assets\canineHaird.png"
                            alt="Canine Hairdressing"
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                        <h1 className="text-3xl font-bold text-green-700 mb-4">Canine Hairdressing</h1>
                        <p className="text-lg text-gray-700 mb-4">Grooming service to keep your pet clean and healthy.</p>
                        <ul className='list-disc pl-4'>
                            <li>
                            Complete bath: Use of shampoos and conditioners specific to the dog's coat and skin type, which help to keep the coat clean, soft and tangle-free.
                            Professional drying: Use of specialised dryers to remove moisture from the coat without causing discomfort to the dog.
                            </li>
                            <li>
                            Professional drying: Use of specialised dryers to remove moisture from the coat without causing discomfort to the dog.
                            </li>
                            <li>
                            Breed cutting: Specific haircuts according to the standards of each breed.
                            </li>
                            <li>
                            Functional cut: Adaptation of the cut to make it practical and comfortable for the dog, especially for dogs with coats that tangle easily.
                            </li>
                            <li>
                            Regular brushing: Elimination of loose hair and prevention of knots and tangles.
                            </li>
                            <li>
                            Untangling: Use of specific tools to remove knots and tangles in a gentle and painless way for the dog.
                            </li>
                            <li>
                            Safe and accurate trimming: Use of appropriate scissors and nail clippers to keep nails at a comfortable length, avoiding mobility problems and pain.
                            </li>
                            <li>
                            Regular cleaning: Removal of ear wax and dirt accumulated in the ears to prevent infection and maintain good hearing hygiene.
                            </li>
                            <li>
                            Basic dental cleaning: Brushing teeth and gums to reduce plaque build-up and prevent oral diseases.
                            </li>
                            <li>
                            Flea and tick treatments: Application of specialised products to prevent and treat infestations of parasites.
                            </li>
                        </ul>
                        <p className="text-lg text-gray-700 mb-4 mt-3">Requirements: None</p>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">Price: $40.00</h2>
                        <h3 className="text-xl font-bold text-green-700 mb-4">Attended by: Dr. Pepe Perez</h3>

                        <h3 className="text-xl font-bold text-green-700 mb-4">Available Shifts</h3>
                        <AppointmentTable setSelectedAppointment={setSelectedAppointment} />

                        {selectedAppointment && (
                            <div className="mt-4">
                                <button
                                    onClick={handleReserveClick}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Book an appointment
                                </button>
                            </div>
                        )}
                    </div>
                </div> */}

<div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <img
                        src={services.image}
                        alt={services.name}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                    <h1 className="text-3xl font-bold text-green-700 mb-4">{services.name}</h1>
                    <p className="text-lg text-gray-700 mb-4">{services.description}</p>
                    <ul className="list-disc pl-4">
                        
                    </ul>
                    <p className="text-lg text-gray-700 mb-4 mt-3">Requirements: {service.requirements}</p>
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Price: ${service.price.toFixed(2)}</h2>
                    <h3 className="text-xl font-bold text-green-700 mb-4">Attended by: {service.attendedBy}</h3>

                    <h3 className="text-xl font-bold text-green-700 mb-4">Available Shifts</h3>
                    <AppointmentTable setSelectedAppointment={setSelectedAppointment} />

                    {selectedAppointment && (
                        <div className="mt-4">
                            <button
                                onClick={handleReserveClick}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Book an appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>
            </AuthLayount>
        </>
    );
};

export default ServiceDetails;