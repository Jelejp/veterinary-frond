import React from 'react';
import HeaderAuth from '../components/HeaderAuth';
import FooterAuth from '../components/FooterAuth';
import { useLocation } from 'react-router-dom';
import LinksAuth from '../components/LinksAuth';
import { Outlet } from 'react-router-dom';

const AuthLayout = (props) => {

	const location = useLocation()
	const landingViews = location.pathname === '/' || location.pathname === '/Register' || location.pathname === '/Login';

	return (
		<>
			<HeaderAuth />
			<main className=' flex min-h-[90vh] w-full flex-col'>
				{props.children}
			</main>

			<FooterAuth />
		</>
	);
};

export default AuthLayout;