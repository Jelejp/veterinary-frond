import React from 'react';
import CardService from '../components/CardService';
import HeaderAuth from '../components/HeaderAuth';
import FooterAuth from '../components/FooterAuth';
import AuthLayout from '../layout/AuthLayout';

const Services = () => {
    return (
        <>
        <AuthLayout>

        <section className=' min-h-screen'>
            <h1 className="text-3xl text-center font-bold mb-6 pt-7">Our services</h1>
            <CardService/>
        </section>
        </AuthLayout>
        </>
    );
};

export default Services;