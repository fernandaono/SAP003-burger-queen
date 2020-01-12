
import React from 'react';
import './index.css';

const Button = (props) => (
  <button id={props.id} className={props.class} onClick={props.handleClick}>
  {props.name}
  </button>
);

export default Button;