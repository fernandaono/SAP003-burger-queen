import React from 'react';
import './index.css'

const OrderCard = (props) => {
  return (
    <section className='order'>
      <h1>{props.name}</h1>
      <p>N. Mesa: {props.table} </p>
      <span>{new Date(props.creationDate.seconds * 1000).toLocaleDateString('pt-BR')} - </span>
      <span>{new Date(props.creationDate.seconds * 1000).toLocaleTimeString('pt-BR')} </span>

      {props.items.map((item) =>
        <li>
          {item.name}
          {item.type ? <>, {item.type}</> : ''}
          {item.extra ? item.extra.length > 0 ? <>, {item.extra[0].name}</> : '' : ''}
        </li>)}
      {props.buttonText ? <button onClick={props.onClick}>{props.buttonText}</button> : ''}
    </section>
  )
}

export default OrderCard;
