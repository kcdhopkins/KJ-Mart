import React, { JSX, useEffect, useState } from 'react';
import signInIcon from '../../images/sign-in.png'
import Modal from '../modal/Modal'
import './signin.css'
import SignInForm from './SignInForm';
import CreateAccountForm from '../createAccount/CreateAccountForm';
import { useAuth } from '../authProvider/authContext';

type SignInTypes = {
    setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInTypes> = ({setShowDropDown}) => {
    const {state} = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [createAnAccountForm, setCreateAnAccountForm] = useState(false)
    const [accountCreationSuccess, setAccountCreationSuccess] = useState(false)
    
    useEffect(()=>{
        if(state.loggedIn){
            localStorage.setItem('token', state.token)
        }
    }, [state.loggedIn])

    return (
        <>
            <div onClick={state.loggedIn ? ()=>setShowDropDown(true) : () => setShowModal(true)}>
                <div id="sign-in-div" className='sign-in-icon-text bright-invert'>
                    <img src={signInIcon} />
                    {!state.loggedIn && <p className="onHover" >Sign In</p>}
                    {state.loggedIn && <p className="onHover" >{`Welcome ${state.user.firstName} ${state.user.lastName}`}</p>}
                </div>
            </div>
            {showModal && !createAnAccountForm && !state.loggedIn && <Modal setShowModal={setShowModal} title="Sign In">
                <SignInForm setShowModal={setShowModal} setCreateAnAccountForm={setCreateAnAccountForm}/>
            </Modal>}
            {showModal && createAnAccountForm && !accountCreationSuccess &&<Modal setShowModal={setShowModal} title="Create An Account">
                <CreateAccountForm setShowModal={setShowModal} setCreateAnAccountForm={setCreateAnAccountForm} setAccountCreationSuccess={setAccountCreationSuccess}/>
            </Modal>}
            {showModal && accountCreationSuccess && <Modal setShowModal={setShowModal} title="Account Created" hideButtons={true}>
                <div>
                    <p>Your account was created successfully! You may close this pop-up and continue shopping!</p>
                    <div className="container center add-margin">
                        <button onClick={()=>setShowModal(false)}>Close</button>
                    </div>
                </div>
            </Modal>}
            {showModal && state.loggedIn && !accountCreationSuccess && <Modal setShowModal={setShowModal} title="Signed in Successfully" hideButtons={true}>
                <div>
                    <p>You have Successfully Signed In</p>
                    <div className="container center add-margin">
                        <button onClick={()=>setShowModal(false)}>Close</button>
                    </div>
                </div>
            </Modal>}
        </>
    );
};

export default SignIn;