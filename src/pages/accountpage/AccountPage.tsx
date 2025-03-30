import React, { useEffect, useState } from 'react';
import './accountPage.css'
import { useAuth } from '../../components/authProvider/authContext';
import { useNavigate } from 'react-router';
import ContactInfo from '../../components/contactInfo/ContactInfo';
import OrderHistory from '../../components/orderHistory/OrderHistory';
const AccountPage: React.FC = () => {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!state.loggedIn) {
      navigate('/')
    }
  }, [])
  return (
    <div className="container center-items">
      <div className='grid-container grid-acct'>
        <ContactInfo />
        <div className='oh-max-width'>
          <OrderHistory />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
