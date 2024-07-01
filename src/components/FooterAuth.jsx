import React from 'react';

const FooterAuth = () => {
    return (
        <>
                <footer className='bg-[#8BA8C4] shadow-sm  p-3 flex justify-center items-center h-[12vh]'>
            
            <p className='text-white font-medium text-center mt-2 pr-5'> &copy;  2024 VetNova. All rights reserved.</p>
             
            <div className='text-white flex gap-3 '>
                <a href="https://github.com/Jelejp/veterinary-frond.git"><img className='w-[30px]' src="/assets/icon-github.png" alt="icon github" /></a>
                <a href="https://www.instagram.com"><img className ='w-[30px]' src="/assets/icon-instagram.png" alt="icon instagram" /></a>
                <a href="https://www.x.com"><img className='w-[30px]' src="/assets/icon-x.png" alt="icon x" /></a>
            </div>
        </footer>
        </>
    );
};

export default FooterAuth;