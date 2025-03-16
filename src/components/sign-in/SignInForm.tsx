import React, { useEffect, useState } from "react";
import { callSignIn } from "../../api/AccountService/account";
import { useAuth } from "../authProvider/authContext";

type SignInFormTypes = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateAnAccountForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInForm: React.FC<SignInFormTypes> = ({ setShowModal, setCreateAnAccountForm }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {dispatch} = useAuth()
    
    const handleSubmit = async () => {
        try{
            const result = await callSignIn({ email, password })
            if(result?.loggedIn){
                delete result.status
                dispatch({type: 'LOGIN', payload: result})
            }
        }catch(err){
            throw new Error('Error while signing in')
        }
    }

    useEffect(() => {
        window.addEventListener('submitEvent', handleSubmit)
        return () => window.removeEventListener('submitEvent', handleSubmit)
    }, [email, password])

    return (
        <>
            <div className="grid-container center-items">
                <span>Email:</span>
                <input name="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                <span>Password:</span>
                <input name="password" type="password" onChange={e => setPassword(e.currentTarget.value)} />
            </div>
            <div className="container-column center-items">
                <p>OR</p>
                <a href="#" onClick={() => setCreateAnAccountForm(true)}>Create an Account</a>
            </div>
        </>
    )
}

export default SignInForm;