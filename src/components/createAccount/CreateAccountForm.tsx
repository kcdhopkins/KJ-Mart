import React, { useEffect, useState } from "react";
import { callCreateAccount } from "../../api/AccountService/account";

type CreateAccountFormTypes = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCreateAnAccountForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccountForm: React.FC<CreateAccountFormTypes> = ({ setShowModal, setCreateAnAccountForm }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [showRequiredFields, setShowRequiredFields] = useState(false)
    const [passwordDontMatch, setPasswordDontMatch] = useState(false)
    const [invalidFormat, setInvalidFormat] = useState(false)
    const [passwordTooShort, setPasswordTooShort] = useState(false)
    const [userExistErrorMessage, setUserExistErrorMessage] = useState(false)
    const [invalidApiEmail, setInvalidApiEmail] = useState(false)

    const handleSubmit = async () => {
        //Used to determine if the form can submit with any requied fields active
        let canSubmit = true
        if (email) {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailFormat.test(email)
            if (!isValid) {
                setInvalidFormat(!isValid)
                canSubmit = false
            } else {
                setInvalidFormat(false)
            }
        }

        if (password) {
            if (password.length <= 5) {
                setPasswordTooShort(true)
                canSubmit = false;
            } else {
                setPasswordTooShort(false)
            }
        }

        if ((!firstName || !lastName || !email || !password || !reEnterPassword) || (password !== reEnterPassword)) {
            if (password && password !== reEnterPassword) {
                setPasswordDontMatch(true)
            }
            canSubmit = false;
        } else {
            setPasswordDontMatch(false)
        }

        if (canSubmit) {
            const result = await callCreateAccount({ firstName, lastName, email, password })
            if(result.message === 'User exists' || result.message === 'Invalid email'){
                result.message === 'User exists' && setUserExistErrorMessage(true)
                result.message === 'Invalid email' && setInvalidApiEmail(true)
                return
            }else if(invalidApiEmail || userExistErrorMessage){
                setInvalidApiEmail(false)
                setUserExistErrorMessage(false)
            }
            setShowModal(false)
            setCreateAnAccountForm(false)
        } else {
            setShowRequiredFields(true)
        }
    }

    const cancelEventTriggered = () => {
        setCreateAnAccountForm(false)
    }

    //Listens for a cancel event and runs the event after, this is to close the modal and reset to sign in form
    useEffect(() => {
        window.addEventListener('cancelEvent', cancelEventTriggered)
        return () => window.removeEventListener('cancelEvent', cancelEventTriggered)
    }, [])

    //Add each useState var that is captured in the form here, to re-add the handleSubmit listener to the window to update
    useEffect(() => {
        window.addEventListener('submitEvent', handleSubmit)
        return () => window.removeEventListener('submitEvent', handleSubmit)
    }, [firstName, lastName, email, password, reEnterPassword, showRequiredFields, passwordDontMatch, invalidFormat, passwordTooShort, invalidApiEmail, userExistErrorMessage])

    return (
        <>
            {userExistErrorMessage && <div className="warning-text">An account with this email exist, please try again with a different email.</div>}
            {invalidApiEmail && <div className="warning-text">There was an issue with the email address entered, please try again.</div>}
            {<div></div>}
            <div className="grid-container center-items">
                <span>First Name:</span>
                <div className="container-column">
                    {!firstName && showRequiredFields && <div className="margin-left warning-text">Required</div>}
                    <input name="firstname" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />
                </div>

                <span>Last Name:</span>
                <div className="container-column">
                    {!lastName && showRequiredFields && <div className="margin-left warning-text">Required</div>}
                    <input name="lastname" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                </div>

                <span>Email:</span>
                <div className="container-column">
                    {!email && showRequiredFields && <div className="margin-left warning-text">Required</div>}
                    {email && showRequiredFields && invalidFormat && <div className="margin-left warning-text">Invalid email format. e.g example@email.com</div>}
                    <input name="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                </div>

                <span>Password:</span>
                <div className="container-column">
                    {!password && showRequiredFields && <div className="margin-left warning-text">Required</div>}
                    {password && showRequiredFields && passwordTooShort && <div className="margin-left warning-text">Please enter a password with 6 or more characters</div>}
                    <input name="password" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                </div>

                <span>RE-Enter Password:</span>
                <div className="container-column">
                    {!reEnterPassword && showRequiredFields && <div className="margin-left warning-text">Required</div>}
                    {reEnterPassword && showRequiredFields && passwordDontMatch && <div className="margin-left warning-text">Password don't match</div>}
                    <input name="re-enter-password" type="password" value={reEnterPassword} onChange={e => setReEnterPassword(e.currentTarget.value)} />
                </div>

            </div>
        </>
    )
}

export default CreateAccountForm;