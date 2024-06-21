import React from 'react';

const FooterAuth = () => {
    return (
        <>
                <footer className='bg-[#8BA8C4] shadow-sm  p-3 flex justify-center items-center h-[9vh]'>
            
            <p className='text-white pr-5'> &copy;  2024 Veterinary. All rights reserved.</p>
             
            <div className='text-white flex gap-3 '>
                <img src=" src\assets\icon-github.png" alt="icon-github" />
                <img src="src\assets\icon-instagram.png" alt="icon-instagram" />
                <img src="src\assets\icon-x.png" alt="icon-x" />
            </div>
        </footer>
        </>
    );
};

export default FooterAuth;