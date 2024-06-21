import React from 'react'
import LinkTo from './LinkTo'


const PublicNav = () => {
    const activePage = {
        Register: "/assets/register-active.png",
        Login: "/assets/login-active.png",
        Home: "/assets/home-active.png"
    }
    const links = [
        { text: "Home", to: "/", img: "/assets/home.png", activeIcon: activePage.Home },
        { text: "Register", to: "/Register", img: "/assets/register.png", activeIcon: activePage.Register },
        { text: "Login", to: "/Login", img: "/assets/login.png", activeIcon: activePage.Login },
    ]
    return (
        <div className='bg-[#8BA8C4] gap-8 py-5 flex justify-between items-center px-4 md:px-10 lg:px-20 h-[15vh]'>
            <div className='flex items-center'>
                <picture className='flex gap-2  lg:gap-3 items-center'>
                    <img className=' w-8 md:w-20' src="/assets/icono-VetNova.png" alt="logo" />
                    <h1 className='text-white font-bold text-1xl md:text-4xl lg:text-5x1'>VetNova</h1>
                </picture>
            </div>
            <div className='h-26 lg:flex lg:justify-center lg:items-center lg:flex-col'>
                <nav className="flex justify-center items-center w-full h-full  pt-2">
                    <ul className="flex justify-around items-center w-11/12 py-1">
                        {links.map((anchor, id) => (
                            <li key={id} className="w-2/5 text-center px-4"> 
                                <LinkTo text={anchor.text} to={anchor.to} img={anchor.img} activeIcon={anchor.activeIcon} className={anchor.class} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default PublicNav

