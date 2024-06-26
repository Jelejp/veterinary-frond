import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {isValidPhoneNumber} from '../utils/phone.js'

const MainRegister = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const navigate = useNavigate()


    const validatePassword = (value) => {
        return value.length >= 8
    }


    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        setPasswordValid(validatePassword(value))
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(email)
        console.log(email)
        console.log(email)
                console.log(email)


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
            })
            return
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

        setIsLoading(true)


        const registerDTO = { firstName: firstName, lastName: lastName,  email: email, password: password, phone: phoneNumber }
        console.log(registerDTO)
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
                })
                setTimeout(() => {
                    navigate('/auth/account');
                }, 2000)
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
                })
            }
        } catch (error) {
            console.error('Error during registration:', error)
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
            })
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='flex flex-col md:flex-row h-[100vh] lg:h-[100vh] md:h-[100vh] overflow-y-auto'>
            <article className='article-bgg w-full  md:w-1/2 lg:w-1/2 flex h-full flex-col justify-center items-center text-center'>
                <div className='article-content text-white flex flex-col gap-8 justify-center items-center h-full'>
                    <h2 className='text-3xl'>Already have an account?</h2>
                    <p className='text-center text-lg'>Login with your account</p>
                    <Link className='text-blue-800 mb-5' to={"/Login"}>Log in</Link>
                </div>
            </article>
            <article className='text-center md:w-1/2 lg:w-1/2 h-full flex flex-col justify-center'>
                <h2 className='text-3xl mb-4 font-bold'>Enter your details</h2>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='w-full flex gap-2 justify-center items-center'>
                        <label className='flex flex-grow'>
                            <input className='p-4 mx-2 border rounded-md shadow w-full' type="text" name='FirstName' placeholder='FIRST NAME' onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label className='flex flex-grow'>
                            <input className='p-4 mx-2 border rounded-md shadow w-full' type="text" name='LastName' placeholder='LAST NAME' onChange={(e) => setLastName(e.target.value)} />
                        </label>
                    </div>
                    <label className='flex'>
                        <input className='mx-2 p-4 border rounded-md shadow w-full' type="text" name='PhoneNumber' placeholder='PHONE NUMBER' required onChange={(e) => setPhoneNumber(e.target.value)} />
                    </label>
                    <label className='flex'>
                        <input className='mx-2 p-4 border rounded-md shadow w-full' type="email" name='user' required placeholder='EMAIL' onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <div className='flex items-center gap-2'>
                        <input className='mx-2 p-4 border rounded-md shadow w-full id_password' type="password" name='password' required placeholder='PASSWORD' onChange={handlePasswordChange} />
                    </div>
                    <button type='submit' className='rounded-md p-4 bg-[#FAE7D5] m-2 text-lg text-white cursor-pointer transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95'>
                        {isLoading ? 'Cargando...' : 'SIGN UP'}
                    </button>
                </form>
                <ToastContainer />
            </article>
        </div>
    )
}

export default MainRegister
