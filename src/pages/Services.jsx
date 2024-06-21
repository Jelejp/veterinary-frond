import React from 'react';
import CardService from '../components/CardService';
import HeaderAuth from '../components/HeaderAuth';
import FooterAuth from '../components/FooterAuth';

const Services = () => {
    return (
        <>
        <HeaderAuth/>
        <section className=' min-h-screen'>
            <h1 className="text-3xl text-center font-bold mb-6 pt-7">Our services</h1>
            <CardService/>
            <FooterAuth/>
        </section>
        </>
    );
};

export default Services;