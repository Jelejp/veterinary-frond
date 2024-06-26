import React from 'react'
import SocialMedia from './SocialMedia'

const FooterAuth = () => {
    return (
        <>
            <footer className="flex gap-3 bg-[#8BA8C4] font-bold text-white justify-around items-center flex-col md:flex-row md:h-[15vh]">
                <small className="text-xs">Veterinary clinic</small>
                <small className="text-xs"> &#169; 2024 VetNova. All rights reserved.</small>
                <SocialMedia />
            </footer>
        </>
    );
};

export default FooterAuth