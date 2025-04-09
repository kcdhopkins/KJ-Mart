import React, { useEffect, useState } from 'react';
import { useAuth } from '../authProvider/authContext';
import './contactInfo.css'
import Modal from '../modal/Modal';
import EditAccountForm from '../editAccount/EditAccountForm';

const ContactInfo: React.FC = () => {
    const { state, dispatch } = useAuth()
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className="card-acct container center-items">
                <div className="add-margin-acct-icon">
                    <i className="fa-solid fa-user acct-icon-size theme-color"></i>
                </div>
                <div>
                    <ul>
                        <li className="list-acct"><b>First Name: </b> {state.user.firstName}</li>
                        <li className="list-acct"><b>Last Name </b> {state.user.lastName}</li>
                        <li className="list-acct"><b>Email: </b> {state.user.email}</li>
                        <li className="list-acct"><b>Phone: </b> {state.user.phone}</li>
                        <li className="list-acct"><b>Address</b> </li>
                        <hr />
                        <li className="list-acct"><b>Street: </b>{state.user?.street}</li>
                        <li className="list-acct"><b>City, State, Zip: </b> {`${state.user.city} ${state.user.state}, ${state.user.zip} `}</li>
                    </ul>
                </div>
                <div className="h-100">
                    <i className="fa-solid fa-pen-to-square" onClick={() => setShowModal(true)}></i>
                </div>
            </div>
            {showModal && <Modal
                setShowModal={setShowModal}
                title="Edit Contact Info"
                hideButtons={true}
            >
                <EditAccountForm setShowModal={setShowModal}/>
            </Modal>}
        </>
    );
};

export default ContactInfo;
