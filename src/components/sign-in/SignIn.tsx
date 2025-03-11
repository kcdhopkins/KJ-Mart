import React, { JSX, useState } from 'react';
import signInIcon from '../../images/sign-in.png'
import Modal from '../modal/Modal'
import './signin.css'
import SignInForm from './SignInForm';
import CreateAccountForm from '../createAccount/CreateAccountForm';

const SignIn: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [createAnAccountForm, setCreateAnAccountForm] = useState(false)
    const [accountCreationSuccess, setAccountCreationSuccess] = useState(false)
 
    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <div id="sign-in-div" className='sign-in-icon-text bright-invert'>
                    <img src={signInIcon} />
                    <p className="onHover" >Sign In</p>
                </div>
            </div>

            {showModal && !createAnAccountForm && <Modal setShowModal={setShowModal} title="Sign In">
                <SignInForm setShowModal={setShowModal} setCreateAnAccountForm={setCreateAnAccountForm}/>
            </Modal>}
            {showModal && createAnAccountForm && !accountCreationSuccess &&<Modal setShowModal={setShowModal} title="Create An Account">
                <CreateAccountForm setShowModal={setShowModal} setCreateAnAccountForm={setCreateAnAccountForm} setAccountCreationSuccess={setAccountCreationSuccess}/>
            </Modal>}
            {showModal && accountCreationSuccess && <Modal setShowModal={setShowModal} title="Account Created" hideButtons={true}>
                <div>
                    <p>Your account was created successfully! You may close this pop-up and continue shopping!</p>
                    <div className="container center">
                        <button onClick={()=>setShowModal(false)}>Close</button>
                    </div>
                </div>
            </Modal>}
        </>
    );
};

export default SignIn;