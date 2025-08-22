
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import Footer from './Footer.tsx';
import '../assets/styles/Layout.scss'

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <Header />
            <div className="main-container flex-row-reverse">
                <Sidebar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout; 