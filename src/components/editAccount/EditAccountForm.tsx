import React, { JSX, use, useEffect, useRef, useState } from 'react';
import './editAccountForm.css'

type ContactInfoTypes = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const EditAccountForm: React.FC<ContactInfoTypes> = ({ setShowModal }) => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const phoneRef = useRef<HTMLInputElement | null>(null)
    const cityRef = useRef<HTMLInputElement | null>(null)
    const stateRef = useRef<HTMLSelectElement | null>(null)
    const zipRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        console.log(stateRef.current?.value)
    })

    return (
        <>
            <div className='container column'>
                <div>
                    <ul>
                        <label htmlFor='email' className="label-layout">
                            <li className="list-acct"><b>Email: </b></li>
                            <input type='text' className='input-acct' ref={emailRef} />
                        </label>
                        <label htmlFor='Phone' className="label-layout">
                            <li className="list-acct"><b>Phone: </b></li>
                            <input type='text' className='input-acct' ref={phoneRef} />
                        </label>
                        <label htmlFor='city' className="label-layout">
                            <li className="list-acct"><b>City: </b></li>
                            <input type='text' className='input-acct' ref={cityRef} />
                        </label>
                       
                        <label htmlFor='zip' className="label-layout">
                            <li className="list-acct"><b>Zip: </b></li>
                            <input type='text' className='input-acct' ref={zipRef} />
                        </label>
                    </ul>
                </div>
                <label htmlFor='state' className="label-layout">
                            <li className="list-acct"><b>State: </b></li>
                            <select ref={stateRef} defaultValue="">
                                <option value="" disabled>Select a state</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </label>
                <div className="container center">
                    <button className='btn-acct'>Save</button>
                    <button className='btn-acct' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default EditAccountForm;