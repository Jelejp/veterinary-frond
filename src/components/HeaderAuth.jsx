import React from 'react';
import LinksAuth from './LinksAuth';

const HeaderAuth = () => {
// #E0E0E0
// #8BB3D0
// #FAE7D5
    return (
        <>
        <header className='bg-[#8BA8C4] gap-8 py-5 flex justify-between items-center px-4 md:px-10 lg:px-20 h-[15vh]'>
            <div className='flex items-center'>
                <picture className='flex gap-2  lg:gap-3 items-center'>
                    <img className=' w-8 md:w-20' src="src\assets\icono-VetNova.png" alt="logo" />
                    <h1 className='text-white font-bold text-1xl md:text-4xl lg:text-5x1'>VetNova</h1>
                </picture>
            </div>
            <LinksAuth/>
        </header>
        </>

    );
};

export default HeaderAuth;