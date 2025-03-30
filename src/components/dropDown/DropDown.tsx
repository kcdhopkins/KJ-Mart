import React, { useEffect, useState } from 'react';
import { callLogoutUser } from '../../api/AccountService/account';
import { useAuth } from '../authProvider/authContext';
import { Link, useNavigate } from 'react-router';

type DropDownTypes = {
    setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown: React.FC<DropDownTypes> = ({setShowDropDown}) => {
    const {state, dispatch} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async ()=>{
        const response = await callLogoutUser()
        if(response.message === "Logout Success"){
            localStorage.removeItem('token')
            dispatch({type: 'LOGOUT'})
            navigate('/')
        }
    }

    useEffect(()=>{
        if(!state.loggedIn){
            setShowDropDown(false)
        }
    }, [state.loggedIn])
    return (
        <div className="drop-down">
            <ul className='drop-down-wt bg-white'>
                <li className="li-style" onClick={()=>setShowDropDown(false)}><Link to='/account'><span>Account</span></Link></li>
                <li className="li-style" onClick={()=>handleLogout()}><span>Logout</span></li>
                <li className="container center column li-style">
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