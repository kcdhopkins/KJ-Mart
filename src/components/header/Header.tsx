import React from 'react';
import "./header.css"
import SignIn from '../sign-in/SignIn'
import signInIcon from '../../images/sign-in.png'
const App: React.FC = () => {
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
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default App;