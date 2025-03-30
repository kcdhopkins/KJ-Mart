import React from 'react';
import { Outlet } from 'react-router';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './layout.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Layout: React.FC = () => {
  return (
    <div className="flex-container">
      <Header />
      <main id="" className='t-margin b-margin '>
        <div className="layout container center">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;