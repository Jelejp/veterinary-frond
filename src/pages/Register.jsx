import React from 'react'
import PublicNav from '../components/PublicNav'
import MainRegister from '../components/MainRegister'

const Register = () => {
    return (
        <div className='w-full h-screen overflow-y-hidden'>
            <div>
                <PublicNav />
            </div>
            <div>
                <MainRegister/>
            </div>
        </div>
    )
}

export default Register
