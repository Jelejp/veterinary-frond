import React from 'react';
import LinkTo from './LinkTo';

const LinksAuth = () => {
    const activePage = {
        Services: "src/assets/register-active.png",
        Veterinary: "src/assets/login-active.png",
        Account: "src/assets/home-active.png"
    };

    const links = [
        { text: "Services", to: "/auth/services", img: "src/assets/home.png", activeIcon: activePage.Services },
        { text: "Veterinary", to: "/auth/veterinary", img: "src/assets/register.png", activeIcon: activePage.Veterinary },
        { text: "Account", to: "/auth/account", img: "src/assets/login.png", activeIcon: activePage.Account },
    ];

    return (
        <div className='flex flex-col md:flex-row justify-center items-center w-full h-full  md:pt-0'>
            {links.map((anchor, id) => (
                <a
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
                </a>
            ))}
            <a href="/" className="w-full md:w-auto text-red-500 font-bold hover:text-red-700 text-center md:pl-3 md:py-0">
                Logout
            </a>
        </div>
    );
};

export default LinksAuth;
