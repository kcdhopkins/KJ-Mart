import React, {  useState, useReducer, useRef } from 'react';
import './editAccountForm.css'
import { isValidPhone, isValidStreet } from '../../helpers/helpers';
import { editAccountInfo } from '../../api/AccountService/account';

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
const initialState = {
    phoneError: false,
    cityError: false,
    stateError: false,
    zipError: false,
    streetError: false
}

const errorReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_PHONE_ERROR':
            return { ...state, phoneError: action.payload };
        case 'SET_CITY_ERROR':
            return { ...state, cityError: action.payload };
        case 'SET_STATE_ERROR':
            return { ...state, stateError: action.payload };
        case 'SET_ZIP_ERROR':
            return { ...state, zipError: action.payload };
        case 'SET_STREET_ERROR':
            return { ...state, streetError: action.payload };
        default:
            return state;
    }
}

const EditAccountForm: React.FC<ContactInfoTypes> = ({ setShowModal }) => {
    
    const phoneRef = useRef<HTMLInputElement | null>(null)
    const cityRef = useRef<HTMLInputElement | null>(null)
    const stateRef = useRef<HTMLSelectElement | null>(null)
    const zipRef = useRef<HTMLInputElement | null>(null)
    const streetRef = useRef<HTMLInputElement | null>(null)
    const [state, dispatch] = useReducer(errorReducer, initialState)
    const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false)

    const handleSubmit = async () => {
        
        const phone = phoneRef.current?.value || ""
        const street = streetRef.current?.value || ""
        const city = cityRef.current?.value || ""
        const state = stateRef.current?.value || ""
        const zip = zipRef.current?.value || ""
        
        const validPhone = phone !== "" ? isValidPhone(phone ?? '') : true
        const validCity = city !== "" ? city.length > 0 : true
        const validState = state != "" ? state.length !== 1 : true
        const validZip = zip !== "" ? zip.length === 5 && !isNaN(Number(zip)) : true;;
        const validStreet = street !== "" ? isValidStreet(street) : true
        
        dispatch({ type: 'SET_PHONE_ERROR', payload: !validPhone });
        dispatch({ type: 'SET_CITY_ERROR', payload: !validCity });
        dispatch({ type: 'SET_STATE_ERROR', payload: !validState });
        dispatch({ type: 'SET_ZIP_ERROR', payload: !validZip });
        dispatch({ type: 'SET_STREET_ERROR', payload: !validStreet });

        if (validPhone && validCity && validState && validZip && validStreet) {
            const result = await editAccountInfo(phone, city, state, zip, street)
            
            if(result.message === 'User Updated') {
                setShowEditSuccessMessage(true)
            }
        }
    }

    return (
        <>
            {!showEditSuccessMessage && <div className='container column'>
                <div>
                    <ul>
                        <li>
                            <label htmlFor='Phone' className="label-layout center-items">
                                <p className="list-acct"><b>Phone: </b></p>
                                <div>
                                    {state.phoneError && <p className="warning-text margin-left">Invalid Phone</p>}
                                    <input type='text' className='input-acct' ref={phoneRef} />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor='city' className="label-layout center-items">
                                <p className="list-acct"><b>Street: </b></p>
                                <div>
                                    {state.streetError && <p className="warning-text margin-left">Invalid Street</p>}
                                    <input type='text' className='input-acct' ref={streetRef} />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor='city' className="label-layout center-items">
                                <p className="list-acct"><b>City: </b></p>
                                <div>
                                    {state.cityError && <p className="warning-text margin-left">Invalid City</p>}
                                    <input type='text' className='input-acct' ref={cityRef} />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor='zip' className="label-layout center-items">
                                <p className="list-acct"><b>Zip: </b></p>
                                <div>
                                    {state.zipError && <p className="warning-text margin-left">Invalid Zip code</p>}
                                    <input type='text' className='input-acct' ref={zipRef} />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor='state' className="label-layout center-items">
                                <p className="list-acct"><b>State: </b></p>
                                <div className="margin">
                                    <p>Please Select A State</p>
                                    <select className="input-acct padding" ref={stateRef} defaultValue="">
                                        <option value="" disabled>Select a state</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="container center">
                    <button className='btn-acct button' onClick={() => handleSubmit()}>Save</button>
                    <button className='btn-acct button' onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>}
            {showEditSuccessMessage && <div>
                <p>Updates saved Successfully</p>
                <button className='btn-acct button' onClick={() => setShowModal(false)}>Close</button>    
            </div>}
        </>
    );
};

export default EditAccountForm;