import React from 'react';
import SocialMedia from './SocialMedia';

const FooterAuth = () => {
  return (
    <>
      <footer className="flex gap-3 bg-[#8BA8C4] font-bold text-white justify-around items-center flex-col md:flex-row md:h-[15vh] py-4 md:py-0">
        <div className='flex flex-wrap justify-around items-center w-10/12 '>
          <small className="text-base md:text-2xl">Veterinary clinic</small>
          <small className="text-base md:text-2xl font-thin"> &#169; 2024 VetNova. All rights reserved.</small>
        </div>
        <SocialMedia />
      </footer>
    </>
  );
};

export default FooterAuth;
