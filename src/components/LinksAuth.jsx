import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LinksAuth = () => {
    const location = useLocation();

    const activePage = {
        Services: "/auth/services",
        Veterinary: "/auth/veterinary",
        Account: "/auth/account",
        Logout: "/"
    };

    const links = [
        { text: "Services", to: "/auth/services", img: "/assets/services.png", activeIcon: "/assets/services-active.png" },
        { text: "Vet", to: "/auth/veterinary", img: "/assets/veterinary.png", activeIcon: "/assets/veterinary-active.png" },
        { text: "Account", to: "/auth/account", img: "/assets/user.png", activeIcon: "/assets/user-active.png" },
        { text: "Logout", to: "/", img: "/assets/logout.png", activeIcon: "/assets/logout-active.png" },
    ];

    const isActive = (linkToCheck) => {
        return location.pathname === linkToCheck;
    };

    return (

          <div className='flex flex-col items-center lg:flex-row justify-start lg:justify-center w-full  md:h-[15vh] space-y-2 lg:space-y-0 lg:space-x-4 '>
            {links.map((anchor, id) => (
              <Link
                key={id}
                to={anchor.to}
                className={`flex items-center space-y-1 space-x-3  lg:px-0 lg:py-0 text-center text-white font-medium hover:text-[#FAE7D5] lg:text-left ${anchor.text === "Vet" ? 'mr-8' : ''}`}
              >
                <img src={isActive(anchor.to) ? anchor.activeIcon : anchor.img} alt={anchor.text} className="h-6 w-6 lg:hidden" />
                <span className="lg:flex items-center">
                  <img src={isActive(anchor.to) ? anchor.activeIcon : anchor.img} alt={anchor.text} className="h-6 w-6 hidden lg:block mr-2" />
                  <span>{anchor.text}</span>
                </span>
              </Link>
            ))}
          </div>

    );
};

export default LinksAuth;
