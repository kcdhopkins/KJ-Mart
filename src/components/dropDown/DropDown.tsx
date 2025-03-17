import React, { useState } from 'react';
import { callLogoutUser } from '../../api/AccountService/account';
import { useAuth } from '../authProvider/authContext';

type DropDownTypes = {
    setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown: React.FC<DropDownTypes> = ({setShowDropDown}) => {
    const {state, dispatch} = useAuth()
    const handleLogout = async ()=>{
        const response = await callLogoutUser()
        if(response.message === "Logout Success"){
            localStorage.removeItem('token')
            dispatch({type: 'LOGOUT'})
        }
    }
    return (
        <div className="drop-down">
            <ul className='drop-down-wt'>
                <li><span>Account</span></li>
                <li onClick={()=>handleLogout()}><span>Logout</span></li>
                <li className="container center column">
                    <hr />
                    <div className='container center'>
                        <button onClick={()=>setShowDropDown(false)}>Close</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default DropDown;