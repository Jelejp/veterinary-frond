import React from 'react';
import HeaderAuth from '../components/HeaderAuth';
import FooterAuth from '../components/FooterAuth';

const AuthLayout = (props) => {
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