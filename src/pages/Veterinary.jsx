import React from 'react'
import AuthLayout from '../layout/AuthLayout'
import MainVeterinary from '../components/MainVeterinary'

const Veterinary = () => {
    return (
        <AuthLayout>
            <section>
                <MainVeterinary/>
            </section>
        </AuthLayout>
    )
}

export default Veterinary
