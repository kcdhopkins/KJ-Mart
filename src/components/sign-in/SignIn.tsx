import React, { JSX, useState } from 'react';
import signInIcon from '../../images/sign-in.png'
import Modal from '../modal/Modal'
import './signin.css'
import SignInForm from './SignInForm';
import CreateAccountForm from '../createAccount/CreateAccountForm';

const SignIn: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [createAnAccountForm, setCreateAnAccountForm] = useState(false)
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
            {showModal && createAnAccountForm && <Modal setShowModal={setShowModal} title="Create An Account">
                <CreateAccountForm setShowModal={setShowModal} setCreateAnAccountForm={setCreateAnAccountForm}/>
            </Modal>}
        </>
    );
};

export default SignIn;