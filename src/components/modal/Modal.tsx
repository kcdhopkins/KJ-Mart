import React, { Children, JSX, useEffect } from 'react';
import './modal.css'

type ModalTypes = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string
    children?: React.ReactNode; 
    hideButtons?: boolean
}

const Modal: React.FC<ModalTypes> = ({ setShowModal, title, children, hideButtons }) => {
    //dispatchSubmitEvent is used to let components that need to submit know that the submit event has been fired by the submit button on this modal
    const dispatchSubmitEvent = ()=>{
        const event : Event = new CustomEvent('submitEvent')
        window.dispatchEvent(event)
    }
    //Adds the cancel event to the window for this modal, incase an action needs to be made when the cancel button is clicked
    const onCancel = ()=>{
        setShowModal(false)
        const event : Event = new CustomEvent('cancelEvent')
        window.dispatchEvent(event)
    }

    return (
        <>
            <div className="grey-see-through-background"/>
            <div className="card">
                <div className='card-container'>
                    <h2 className="title">{title}</h2>
                    <hr />
                    <div className="card-body">
                        {children}
                    </div>
                    {!hideButtons && <div className="move-to-bottom">
                        <hr />
                        <div className="card-footer">
                            <button className='button' onClick={()=>dispatchSubmitEvent()}>Submit</button>
                            <button className='button' onClick={() => onCancel()}>Cancel</button>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default Modal;