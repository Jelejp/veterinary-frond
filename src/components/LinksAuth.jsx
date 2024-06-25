import React from 'react';
import LinkTo from './LinkTo';
import { Link } from 'react-router-dom';

const LinksAuth = () => {
    const activePage = {
        Services: "/assets/services-active.png",
        Veterinary: "/assets/veterinary-active.png",
        Account: "/assets/user-active.png",
        Logout: "/assets/logout-active.png" 
    };

    const links = [
        { text: "Services", to: "/auth/services", img: "/assets/services.png", activeIcon: activePage.Services },
        { text: "Veterinary", to: "/auth/veterinary", img: "/assets/veterinary.png", activeIcon: activePage.Veterinary },
        { text: "Account", to: "/auth/account", img: "/assets/user.png", activeIcon: activePage.Account },
        { text: "Logout", to: "/", img: "/assets/logout.png", activeIcon: activePage.Logout },
    ];

    return (
        <div className='flex flex-col md:flex-row justify-center items-center w-full h-full  '>
            {links.map((anchor, id) => (
                <Link
                    key={id}
                    href={anchor.to}
                    className={`w-full md:w-auto text-center px-4  md:py-0 ${anchor.class}`}
                >
                    <LinkTo
                        text={anchor.text}
                        to={anchor.to}
                        img={anchor.img}
                        activeIcon={anchor.activeIcon}
                    />
                </Link>
            ))}
            {/* <a href="/" className="w-full md:w-auto text-red-500 font-bold hover:text-red-700 text-center md:pl-3 md:py-0">
                Logout
            </a> */}
        </div>
    );
};

export default LinksAuth;