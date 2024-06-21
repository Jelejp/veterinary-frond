import React from 'react';

const HeaderAuth = () => {
    return (
        <>
        <header className='bg-black flex justify-between items-center h-[80px]'>
            <h1 className='text-white pl-4 font-medium text-[25px]'>Veterinary</h1>
            <nav className='text-white flex gap-3 pr-2'>
                <p>
                    Services
                </p>
                <p>
                   Veterinary
                </p>
                <p>
                    Account
                </p>
            <button className='bg-red-600 hover:bg-red-700 text-white px-3 rounded'>
                Log out
            </button>
            </nav>
        </header>
        </>

    );
};

export default HeaderAuth;