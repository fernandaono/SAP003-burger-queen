import React from 'react';
import './index.css';

const Modal = ({onSelect, show, children}) => {
    const showHideClassName = show ? 'modal display-block': 'modal display-none';
    return (
        <div className={showHideClassName}>
            <section className='modal-main'> {children}
                <button onClick= {onSelect}>OK</button>
            </section>
        </div>
    );
};

export default Modal;
