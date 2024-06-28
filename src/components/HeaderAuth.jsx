import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LinksAuth from './LinksAuth';

const HeaderAuth = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className='bg-[#8BA8C4] gap-8 flex justify-between  items-center px-4 h-[15vh]'>
                <div className='flex items-center'>
                    <Link to={'/auth/account'}>
                    <picture className='flex gap-2 lg:gap-3 items-center cursor-pointer'>
                        <img className='w-8 md:w-20' src="/assets/icono-VetNova.png" alt="logo" />
                        <h1 className='text-white font-bold text-1xl md:text-4xl lg:text-5x1'>VetNova</h1>
                    </picture>
                    </Link>
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-white focus:outline-none'>
                        <img
                            className='w-6 h-6'
                            src={menuOpen ? '/assets/icon-Xmenu.png' : '/assets/icon-menu.png'}
                            alt={menuOpen ? 'Close Menu' : 'Open Menu'}
                        />
                    </button>
                </div>
                <nav className='hidden md:flex md:items-center mt-[30px]'>
                    <LinksAuth />
                </nav>
            </header>
            {menuOpen && (
                <nav className='md:hidden bg-[#8BA8C4] '>
                    <LinksAuth />
                </nav>
            )}
        </>
    );
};

export default HeaderAuth;