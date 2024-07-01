import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicNav = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();

	const activePage = {
		Register: "/assets/register-active.png",
		Login: "/assets/login-active.png",
		Home: "/assets/home-active.png"
	};

	const links = [
		{ text: "Home", to: "/", img: "/assets/home.png", activeIcon: activePage.Home },
		{ text: "Register", to: "/Register", img: "/assets/register.png", activeIcon: activePage.Register },
		{ text: "Login", to: "/Login", img: "/assets/login.png", activeIcon: activePage.Login },
	];

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const isActive = (linkToCheck) => {
		return location.pathname === linkToCheck;
	};

	return (
		<>
			<header className='bg-[#8BA8C4] gap-8 py-5 flex justify-between items-center px-4 md:px-10 lg:px-20 h-[10vh]'>
				<div className='flex items-center'>
					<picture className='flex gap-2 lg:gap-3 items-center'>
						<img className='w-8 md:w-20' src="/assets/icono-VetNova.png" alt="logo" />
						<h1 className='text-white font-bold text-1xl md:text-4xl lg:text-5x1'>VetNova</h1>
					</picture>
				</div>
				<div className='lg:hidden'>
					<button onClick={toggleMenu} className='text-white focus:outline-none'>
						<img
							className='w-6 h-6'
							src={menuOpen ? '/assets/icon-Xmenu.png' : '/assets/icon-menu.png'}
							alt={menuOpen ? 'Close Menu' : 'Open Menu'}
						/>
					</button>
				</div>
				<nav className='hidden lg:flex lg:items-center mt-[20px] p-2'>
					<ul className="flex justify-around items-center space-x-3 gap-4">
						{links.map((anchor, id) => (
							<li
								key={id}
								className={`text-center ${anchor.text}`}
							>
								<Link
									to={anchor.to}
									className={`flex items-center text-2xl font-medium 
										${isActive(anchor.to) ? 'bg-[#b0b0b0] text-[#FFFFFF]' : 'text-white hover:text-[#FAE7D5]'} 
										rounded-md p-2 transition-colors`}
								>
									<img
										src={isActive(anchor.to) ? anchor.activeIcon : anchor.img}
										alt={anchor.text}
										className="h-6 w-6 mr-2"
									/>
									<span>{anchor.text}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
			{menuOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-end" onClick={() => setMenuOpen(false)}>
					<nav className='bg-[#8BA8C4] w-3/4 max-w-xs h-full shadow-lg p-4 transition-transform transform translate-x-0 bg-opacity-90' onClick={(e) => e.stopPropagation()}>
						<div className="flex justify-end">
							<button onClick={() => setMenuOpen(false)} className="text-white text-5xl mb-2">
								&times;
							</button>
						</div>
						<ul className="flex flex-col items-center gap-4 text-2xl">
							{links.map((anchor, id) => (
								<li
									key={id}
									className={`text-center w-full ${anchor.text}`}
								>
									<Link
										to={anchor.to}
										className={`flex items-center font-medium 
											${isActive(anchor.to) ? 'bg-[#b0b0b0] text-[#FFFFFF]' : 'text-white hover:text-[#FAE7D5]'} 
											rounded-md p-1 transition-colors w-[155px] justify-center
											${anchor.text === 'Register' ? 'ml-3' : ''}
											${anchor.text === 'Login' ? 'mr-2' : ''}`}
										onClick={() => setMenuOpen(false)}
									>
										<img
											src={isActive(anchor.to) ? anchor.activeIcon : anchor.img}
											alt={anchor.text}
											className="h-6 w-6 mr-2"
										/>
										<span>{anchor.text}</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</>
	);
};

export default PublicNav;

/* 

{menuOpen && (
				<nav className='lg:hidden bg-[#8BA8C4] flex justify-center '>
					<ul className="flex items-center gap-4 py-4">
						{links.map((anchor, id) => (
							<li
								key={id}
								className={`text-center ${anchor.text === "Home" ? 'mr-[18px]' : ''} ${anchor.text === "Login" ? 'mr-6' : ''}`}
							>
								<Link
									to={anchor.to}
									className='flex items-center space-x-2 text-white font-medium hover:text-[#FAE7D5]'
									onClick={() => setMenuOpen(false)}
								>
									<img
										src={isActive(anchor.to) ? anchor.activeIcon : anchor.img}
										alt={anchor.text}
										className="h-6 w-6"
									/>
									<span>{anchor.text}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}

*/