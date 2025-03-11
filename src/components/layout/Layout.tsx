import React from 'react';
import { Outlet } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './layout.css'

const Layout: React.FC = () => {
  return (
    <div className="flex-container">
      <Header />
      <main className='t-margin b-margin'>
        <div className="layout">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;