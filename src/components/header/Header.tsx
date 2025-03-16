import React, { useState } from 'react';
import "./header.css"
import SignIn from '../sign-in/SignIn'
import DropDown from '../dropDown/DropDown';

const App: React.FC = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  return (
    <div className="header-bg-color header-size">
      <div className="layout space-between-layout h-center take-height">
        <div className=''>
          <p>I'm the Header</p>
        </div>
        <div>
          <p>I'm the Header</p>
        </div>
        <div className="">
          <SignIn setShowDropDown={setShowDropDown} />
        </div>
      </div>
      {showDropDown && <DropDown setShowDropDown={setShowDropDown}/>}
    </div>
  );
};

export default App;