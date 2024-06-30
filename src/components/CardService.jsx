import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import InputSearch from './InputSearch';
import { Button } from 'reactstrap';

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

			try {
				const response = await axios.get("http://localhost:8080/api-veterinary/offerings/", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setServices(response.data);
				// console.log(response.data);
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
									<button className="bg-[#80b3e2] hover:bg-[#6ca8e0] text-white font-bold py-2 px-4 rounded">
										View Details
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
