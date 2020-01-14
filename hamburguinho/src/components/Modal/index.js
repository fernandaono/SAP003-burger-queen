import React from 'react';
import './index.css';

const Modal = ({setShowModal, show, children}) => {
    const showHideClassName = show ? 'modal display-block': 'modal display-none';
    return (
        <div className={showHideClassName}>
        <section className='modal-main'>
            {children}
            <button onClick= {() =>{setShowModal(false)}}>Close modal</button>
        </section>
        </div>
    );
};

export default Modal;