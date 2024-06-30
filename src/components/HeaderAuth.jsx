import React, { useState } from 'react';
import LinksAuth from './LinksAuth';
import { Link } from 'react-router-dom';

const HeaderAuth = () => {
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <>
      <header className='bg-[#8BA8C4] gap-8 flex justify-between items-center px-4 h-[15vh]'>
        <div className='flex items-center'>
          <Link to={'/auth/account'}>
            <picture className='flex gap-2 lg:gap-3 items-center cursor-pointer'>
              <img className='w-8 md:w-20' src="/assets/icono-VetNova.png" alt="logo" />
              <h1 className='text-white font-bold text-1xl md:text-4xl lg:text-5xl'>VetNova</h1>
            </picture>
          </Link>
        </div>        
            <LinksAuth />
			</header>
    </>
  );
};

export default HeaderAuth;
