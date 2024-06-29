import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { linksUser, linksAdmin } from '../utils/Links';

const LinksAuth = () => {
	const location = useLocation();

	const admin = useSelector((state) => state.authReducer.isAdmin);
	console.log(admin);

	const isActive = (linkToCheck) => {
		return location.pathname === linkToCheck;
	};

	return (
		<div className='flex flex-col items-center lg:flex-row justify-start lg:justify-center w-full md:h-[15vh] space-y-2 lg:space-y-0 lg:space-x-4'>
			{admin ? (
				linksAdmin.map((anchor, id) => (
					<Link
						key={id}
						to={anchor.to}
						className={`flex items-center space-y-1 space-x-3 lg:px-0 lg:py-0 text-center text-white font-medium hover:text-[#FAE7D5] lg:text-left ${anchor.text === "Vet" ? 'mr-8' : ''}`}
					>
						<img src={isActive(anchor.to) ? anchor.activeIcon : anchor.img} alt={anchor.text} className="h-6 w-6 lg:hidden" />
						<span className="lg:flex items-center">
							<img src={isActive(anchor.to) ? anchor.activeIcon : anchor.img} alt={anchor.text} className="h-6 w-6 hidden lg:block mr-2" />
							<span>{anchor.text}</span>
						</span>
					</Link>
				))
			) : (
				linksUser.map((anchor, id) => (
					<Link
						key={id}
						to={anchor.to}
						className={`flex items-center space-y-1 space-x-3 lg:px-0 lg:py-0 text-center text-white font-medium hover:text-[#FAE7D5] lg:text-left ${anchor.text === "Vet" ? 'mr-8' : ''}`}
					>
						<img src={isActive(anchor.to) ? anchor.activeIcon : anchor.img} alt={anchor.text} className="h-6 w-6 lg:hidden" />
						<span className="lg:flex items-center">
							<img src={isActive(anchor.to) ? anchor.activeIcon : anchor.img} alt={anchor.text} className="h-6 w-6 hidden lg:block mr-2" />
							<span>{anchor.text}</span>
						</span>
					</Link>
				))
			)}
		</div>
	);
};

export default LinksAuth;


/* import React from 'react';
import LinkTo from './LinkTo';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { linksUser, linksAdmin } from '../utils/Links';

const LinksAuth = () => {

	const admin = useSelector((state) => state.authReducer.isAdmin);
	console.log(admin)

	

	return (
		<div className='flex flex-col md:flex-row justify-center items-center w-full h-full  '>
			{admin ? linksAdmin.map((anchor, id) => (
				<div key={id} className={`w-full md:w-auto text-center px-4  md:py-0 ${anchor.class}`}>
					<LinkTo
						text={anchor.text}
						to={anchor.to}
						img={anchor.img}
						activeIcon={anchor.activeIcon}
					/>
				</div>
			)) : linksUser.map((anchor, id) => (
				<div key={id} className={`w-full md:w-auto text-center px-4  md:py-0 ${anchor.class}`}>
					<LinkTo
						text={anchor.text}
						to={anchor.to}
						img={anchor.img}
						activeIcon={anchor.activeIcon}
					/>
				</div>
			))}
		</div>
	);
};

export default LinksAuth; */