import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { FormGroup, Label, Input, FormText } from 'reactstrap';

const NewServiceForm = () => {

	const [newService, setNewService] = useState([]);
	const [price, setPrice] = useState(0);
	const [name, setName] = useState(''); 
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState("");
	const token = useSelector(store => store.authReducer.token);

	const formData = {
		name,
		description,
		price,
		image
	};

	const handlePriceChange = (e) => {
		e.preventDefault();
		setPrice(parseFloat(e.target.value));
	}

	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			console.log(formData)
			const response = await axios.post('https://mh-veterinary-api.onrender.com/api-veterinary/offerings/create', formData, {
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

	const uploadImage = async (event) => {

    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Veterinary');
    setLoading(true);

    const res = await fetch('https://api.cloudinary.com/v1_1/dmioftmku/image/upload', {
      method: 'POST',
      body: data,
    });

    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);

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
			<FormGroup>
				<Label for="exampleFile">
					File
				</Label>
				<Input
					id="exampleFile"
					name="file"
					type="file"
					onChange={uploadImage}
				/>
				{loading ? (<h3>Uploading Image...</h3>) : (<img src={image} style={{ width: "300px" }} />)}
				<FormText>
					Only *.jpeg and *.png images will be accepted
				</FormText>
			</FormGroup>
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