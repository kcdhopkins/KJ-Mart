import React, { JSX, useEffect, useState } from 'react';
import signInIcon from '../../images/sign-in.png'
import Modal from '../modal/Modal'
import CreateAccountForm from '../createAccount/CreateAccountForm';
import { useAuth } from '../authProvider/authContext';
import cartIcon from '../../images/cart.png'
type CheckoutTypes = {
    setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkout: React.FC = () => {


    useEffect(() => {

    }, [])

    return (
        <>
            <div className='container column center-items text-color-white add-margin'>
                <i className="fa-solid fa-cart-shopping"></i>
                <h3>Cart</h3>
            </div>
        </>
    );
};

export default Checkout;