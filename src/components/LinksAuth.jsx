import React from 'react';
import LinkTo from './LinkTo';
import { Link } from 'react-router-dom';

const LinksAuth = () => {
    //cambiar iconos si es que ponemos y sacar src
    const activePage = {
        Services: "src/assets/register-active.png",
        Veterinary: "src/assets/login-active.png",
        Account: "src/assets/home-active.png"
    }
    const links = [
        { text: "Services", to: "/auth/services", img: "src/assets/home.png", activeIcon: activePage.Services },
        { text: "Veterinary", to: "/auth/veterinary", img: "src/assets/register.png", activeIcon: activePage.Veterinary },
        { text: "Account", to: "/auth/account", img: "src/assets/login.png", activeIcon: activePage.Account },
    ]
    return (
        <>
            <nav className="flex justify-center items-center w-full h-full pt-2">
                <ul className="lg:flex justify-around items-center w-11/12 py-1 md:flex hidden ">
                    {links.map((anchor, id) => (
                        <li key={id} className="w-2/5 text-center px-4">
                            <LinkTo text={anchor.text} to={anchor.to} img={anchor.img} activeIcon={anchor.activeIcon} className={anchor.class} />
                        </li>
                    ))}
                    {/* Opción de cerrar sesión */}
                    <Link to={"/"}>
                    <li className="text-red-500 hover:text-red-700" > Logout</li>
                    </Link>
                </ul>
            </nav>
        </>

    );
};

export default LinksAuth;