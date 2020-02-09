import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Modal = ({ onSelect, show, childr }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'> {childr}
        <button onClick={onSelect}>OK</button>
      </section>
    </div>
  )
}

Modal.propTypes = {
  onSelect: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  childr: PropTypes.any.isRequired
}

export default Modal
