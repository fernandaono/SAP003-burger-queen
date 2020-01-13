import React from 'react';
import './index.css'

const OrderCard = (props) => {
    return (
        <section className = 'order'>
            <h1>{props.name}</h1>
            <b>N. Mesa: {props.table}</b>
            <span>{props.creationDate}</span>
            <p>{props.time}</p>
            <ol>{props.items.map((item)=>
                <li> {item.name}</li>)}
            </ol>
            </section>
    )
}

export default OrderCard;
