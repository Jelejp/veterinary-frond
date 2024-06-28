import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const NewServiceForm = () => {

	const [newService, setNewService] = useState([]); // Aquí corregido para usar useState correctamente
	const [price, setPrice] = useState(0); // Aquí también corregido
	const [name, setName] = useState(''); // Aquí también corregido
	const [description, setDescription] = useState(''); // Aquí también corregido
	const token = useSelector(store => store.authReducer.token);

	// Estados para manejar los valores del formulario
	const formData = {
		name,
		description,
		price
	};

	const handlePriceChange = (e) =>{
		e.preventDefault();
		setPrice(parseFloat(e.target.value));
	}

	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData)
		try {
			const response = await axios.post('http://localhost:8080/api-veterinary/offerings/create', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			console.log(response.data);
			setNewService(response.data);
			Swal.fire({
				title: 'Success',
				text: 'Service created successfully',
				icon: 'success',
				confirmButtonText: 'Ok'
			});
		} catch (error) {
			console.error(error);
			Swal.fire({
				title: 'Error',
				text: 'Failed to create service',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	};
	return (
		<form className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md w-10/12" onSubmit={handleSubmit}>
			<h3 className="text-lg font-bold mb-4">Create a new Service</h3>
			<div className="mb-4">
				<label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={e => setName(e.target.value)}
					placeholder="Enter service name"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={e => setDescription(e.target.value)}
					placeholder="Enter service description"
					rows="3"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				></textarea>
			</div>
			<div className="mb-4">
				<label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
				<input
					type="number"
					id="price"
					name="price"
					value={formData.price}
					onChange={handlePriceChange}
					placeholder="Enter service price"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="submit"
					className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Create Service
				</button>
			</div>
		</form>
	)
}

export default NewServiceForm