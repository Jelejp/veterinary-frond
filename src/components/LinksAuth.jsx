import React from 'react';
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

export default LinksAuth;