import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions/authActions'
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner'

const MainLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const mensajeError = () => {
    
    toast.error('Email or Password incorrect', {
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
  }

  const mensajeSuccess = () => {
    toast.success('Login Success, Welcome', {
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
  }

  const handleLogin = async () => {

    setLoading(true)

    const user = {
      email: username,
      password: password
    }

    try {

      const response = await axios.post('https://mh-veterinary-api.onrender.com/api-veterinary/login', user);
      let token = response.data
      console.log(response.data);

      const responseCurrentClient = await axios.get("https://mh-veterinary-api.onrender.com/api-veterinary/current", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      let client = responseCurrentClient.data;

      client.token = token

      console.log(client);

      dispatch(login(client))

      console.log(client.admin)

      if (client.admin == true) {
        navigate("/auth/admin")
      } else {
        navigate("/auth/account")
      }

      mensajeSuccess()
    } catch (error) {
      console.error('Error:', error)
      mensajeError();
    } finally {
      setLoading(false)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  if (loading) {
		return <Spinner />;
	}

  return (
    <div className='flex flex-col md:flex-row h-[100vh] lg:h-[100vh] md:h-[100vh] '>
      <article className='text-center md:w-1/2 h-full flex flex-col justify-center'>
        <h2 className='font-bold text-3xl my-10 m lg:mt-4 lg:mb-8'>Login to your account</h2>
        <form className='flex flex-col items-center gap-8'>
          <label className='flex w-8/12 lg:w-6/12'>
            <input onChange={handleUsernameChange} type="email" name='user' required placeholder='EMAIL' className='shadow mx-2 p-4 rounded-md w-full' />
          </label>
          <label className='flex w-8/12 lg:w-6/12 items-center gap-2 relative'>
            <input onChange={handlePasswordChange} type="password" name='password' required placeholder='PASSWORD' className='shadow mx-2 p-4 rounded-md w-full id_password' />
          </label>
          <div className='flex justify-around items-center gap-2 flex-wrap-reverse '>
            <button className='flex justify-center items-center'>
              <small className='text-lg'>Forgot your password?</small>
            </button>
            <label className='flex justify-center items-center gap-2 '>
              <input type="checkbox" name='id' />
              <small className='text-lg'>Remember me</small>
            </label>
          </div>
          <button type='button' className='rounded-md max-h-14 font-bold py-2 px-4 bg-[#8BA8C4] m-2 h text-lg text-white cursor-pointer transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95 my-4' onClick={handleLogin}>LOG IN</button>
        </form>
      </article>
      <article className='article-bg md:w-1/2 flex flex-col justify-center items-center '>
        <div className='article-content text-white flex flex-col gap-14 justify-center items-center'>
          <h2 className='font-bold text-gray-700 text-3xl'>New at VetNova?</h2>
          <p className='text-gray-700 text-center text-lg'>Discover the benefits of being part of VetNova</p>
          <p className='text-gray-700 text-center text-lg p-4'>Haven't an account? 
          <Link className='text-blue-800 font-bold italic ml-4' to={"/Register"}>Sign up here</Link></p>
        </div>
      </article>
      <ToastContainer />
    </div>
  )
}

export default MainLogin
