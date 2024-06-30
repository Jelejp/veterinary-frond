import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const activePage = {
        Register: "/assets/register-active.png",
        Login: "/assets/login-active.png",
        Home: "/assets/home-active.png"
    };

    const links = [
        { text: "Home", to: "/", img: "/assets/home.png", activeIcon: activePage.Home },
        { text: "Register", to: "/Register", img: "/assets/register.png", activeIcon: activePage.Register },
        { text: "Login", to: "/Login", img: "/assets/login.png", activeIcon: activePage.Login },
    ];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const isActive = (linkToCheck) => {
        return location.pathname === linkToCheck;
    };

    return (
        <>
            <header className='bg-[#8BA8C4] gap-8 py-5 flex justify-between items-center px-4 md:px-10 lg:px-20 h-[15vh]'>
                <div className='flex items-center'>
                    <picture className='flex gap-2 lg:gap-3 items-center'>
                        <img className='w-8 md:w-20' src="/assets/icono-VetNova.png" alt="logo" />
                        <h1 className='text-white font-bold text-1xl md:text-4xl lg:text-5x1'>VetNova</h1>
                    </picture>
                </div>
                <div className='lg:hidden'>
                    <button onClick={toggleMenu} className='text-white focus:outline-none'>
                        <img
                            className='w-6 h-6'
                            src={menuOpen ? '/assets/icon-Xmenu.png' : '/assets/icon-menu.png'}
                            alt={menuOpen ? 'Close Menu' : 'Open Menu'}
                        />
                    </button>
                </div>
                <nav className='hidden lg:flex lg:items-center mt-[20px]'>
                    <ul className="flex justify-around items-center space-x-4">
                        {links.map((anchor, id) => (
                            <li
                                key={id}
                                className={`text-center ${anchor.text === "Home" ? 'mr-8' : ''} ${anchor.text === "Login" ? 'mr-4' : ''}`}
                            >
                                <Link
                                    to={anchor.to}
                                    className='flex items-center space-x-2 text-white font-medium hover:text-[#FAE7D5]'
                                >
                                    <img
                                        src={isActive(anchor.to) ? anchor.activeIcon : anchor.img}
                                        alt={anchor.text}
                                        className="h-6 w-6"
                                    />
                                    <span>{anchor.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            {menuOpen && (
                <nav className='lg:hidden bg-[#8BA8C4]'>
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        {links.map((anchor, id) => (
                            <li
                                key={id}
                                className={`text-center ${anchor.text === "Home" ? 'mr-[18px]' : ''} ${anchor.text === "Login" ? 'mr-6' : ''}`}
                            >
                                <Link
                                    to={anchor.to}
                                    className='flex items-center space-x-2 text-white font-medium hover:text-[#FAE7D5]'
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <img
                                        src={isActive(anchor.to) ? anchor.activeIcon : anchor.img}
                                        alt={anchor.text}
                                        className="h-6 w-6"
                                    />
                                    <span>{anchor.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </>
    );
};

export default PublicNav;