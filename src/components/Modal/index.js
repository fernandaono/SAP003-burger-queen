import React from 'react';
import './index.css';

const Modal = (props) => {
  const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <div>{props.children}</div>
        <button onClick={props.onSelect}>OK</button>
      </section>
    </div>
  );
};

export default Modal;