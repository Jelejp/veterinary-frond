import React from 'react'
import PublicNav from '../components/PublicNav'
import MainLogin from '../components/MainLogin'

const Login = () => {
    return (
        <div className='w-full min-h-screen overflow-y-hidden'>
            <div>
                <PublicNav />
            </div>
            <div >
                <MainLogin/>
            </div>
        </div>
    )
}

export default Login
