import React, { useState } from 'react';
import "./header.css"
import SignIn from '../sign-in/SignIn'
import DropDown from '../dropDown/DropDown';
import { useNavigate } from 'react-router';
import Checkout from '../checkout/Checkout';
import SearchBar from '../searchBar/SearchBar';

const App: React.FC = () => {
  const navigate = useNavigate()
  const [showDropDown, setShowDropDown] = useState(false)
  return (
    <div className="header-bg-color header-size">
      <div className="layout space-between-layout h-center take-height">
        <div className='clickable header-text-color'>
          <h4 className="logo" onClick={()=>navigate('/')}>KJ-MART</h4>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className="header-container">
          <SignIn setShowDropDown={setShowDropDown} />
          <Checkout />
        </div>
      </div>
      {showDropDown && <DropDown setShowDropDown={setShowDropDown}/>}
    </div>
  );
};

export default App;