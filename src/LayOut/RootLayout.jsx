import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Pages/Sheard/Navber/Navber';
import Footer from '../Pages/Sheard/Navber/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto bg-base-300'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;