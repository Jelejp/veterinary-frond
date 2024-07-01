import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isValidPhoneNumber } from '../utils/phone.js';

const MainRegister = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (value) => value.length >= 8;

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordValid(validatePassword(value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!passwordValid) {
            toast.error('The password must be at least 8 characters.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
            return;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            toast.error('Invalid phone number format. Please enter a valid phone number.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            return;
        }

        setIsLoading(true);

        const registerDTO = { firstName, lastName, email, password, phone: phoneNumber };

        try {
            const response = await axios.post('http://localhost:8080/api-veterinary/register', registerDTO);
            if (response.status === 201) {
                toast.success('Account created successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error('An account with this email address already exists.', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Error trying to register. Please try again later.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col md:flex-row min-h-screen'>
            <div className='flex flex-col text-center md:w-1/2 h-full justify-around p-8'>
                <h2 className='text-3xl mt-10 mb-8 font-bold'>Enter your details</h2>
                <form className='flex flex-col gap-4 items-center w-full ' onSubmit={handleSubmit}>
                    <input className='p-3 border rounded-md shadow w-full' type="text" placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                    <input className='p-3 border rounded-md shadow w-full' type="text" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                    <input className='p-3 border rounded-md shadow w-full' type="text" placeholder='Phone Number' required onChange={(e) => setPhoneNumber(e.target.value)} />
                    <input className='p-3 border rounded-md shadow w-full' type="email" required placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input className='p-3 border rounded-md shadow w-full' type="password" required placeholder='Password' onChange={handlePasswordChange} />
                    <button type='submit' className='rounded-md font-bold py-2 px-4 bg-[#8BA8C4] text-lg text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95'>
                        {isLoading ? 'Loading...' : 'SIGN UP'}
                    </button>
                </form>
                <ToastContainer />
            </div>
            <div className='md:hidden flex flex-col justify-center items-center w-full py-8 bg-cover bg-center' style={{ backgroundImage: "url('/assets/register-img.png')" }}>
                <div className='flex flex-col items-center w-full'>
                    <h2 className='text-3xl text-gray-700 text-center mt-4'>Already have an account?</h2>
                    <Link className='text-blue-800 font-bold italic text-lg mt-4' to={"/Login"}>Log in</Link>
                </div>
            </div>
            <div className='hidden md:flex md:w-1/2 bg-cover bg-center' style={{ backgroundImage: "url('/assets/register-img.png')" }}>
                <div className='flex flex-col justify-center items-center w-full'>
                    <h2 className='text-3xl text-gray-700'>Already have an account?</h2>
                    <Link className='text-blue-800 font-bold italic text-lg mt-4' to={"/Login"}>Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default MainRegister;