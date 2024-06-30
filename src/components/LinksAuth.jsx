import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { linksUser, linksAdmin } from '../utils/Links';

const LinksAuth = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const admin = useSelector((state) => state.authReducer.isAdmin);

	const isActive = (linkToCheck) => {
		return location.pathname === linkToCheck;
	};

	return (
		<div className='relative'>
			<button
				onClick={() => setMenuOpen(true)}
				className='lg:hidden flex items-center p-2 text-white hover:text-[#FAE7D5]'
			>
				<svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
				</svg>
			</button>
			{menuOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-300"
					onClick={() => setMenuOpen(false)}
				>
					<nav
						className='bg-[#8BA8C4] w-3/4 max-w-xs h-full shadow-lg p-4 transition-transform duration-300 ease-in-out transform translate-x-0 bg-opacity-90'
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-end mb-4">
							<button
								onClick={() => setMenuOpen(false)}
								className="text-white text-5xl"
							>
								&times;
							</button>
						</div>
						<ul className="flex flex-col items-center gap-4">
							{(admin ? linksAdmin : linksUser).map((anchor, id) => (
								<li
									key={id}
									className={`text-center text-2xl ${anchor.text}`}
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
				</div>
			)}

			<div className='hidden lg:flex lg:items-center lg:flex-row lg:justify-start p-2 gap-4'>
				{(admin ? linksAdmin : linksUser).map((anchor, id) => (
					<Link
						key={id}
						to={anchor.to}
						className={`flex items-center space-y-1 space-x-3 lg:px-0 lg:py-0 text-center text-white font-medium hover:text-[#FAE7D5] lg:text-left ${anchor.text}`}
					>
						<img
							src={isActive(anchor.to) ? anchor.activeIcon : anchor.img}
							alt={anchor.text}
							className="h-6 w-6 lg:hidden"
						/>
						<span className="lg:flex items-center">
							<img
								src={isActive(anchor.to) ? anchor.activeIcon : anchor.img}
								alt={anchor.text}
								className="h-6 w-6 hidden lg:block mr-2"
							/>
							<span>{anchor.text}</span>
						</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default LinksAuth;
