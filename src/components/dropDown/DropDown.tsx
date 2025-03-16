import React, { useState } from 'react';

type DropDownTypes = {
    setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown: React.FC<DropDownTypes> = ({setShowDropDown}) => {
    
    return (
        <div className="drop-down">
            <ul className='drop-down-wt'>
                <li><span>Account</span></li>
                <li><span>Logout</span></li>
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