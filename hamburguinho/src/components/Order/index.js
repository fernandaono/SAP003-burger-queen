import React from 'react';

const OrderCard = (props) => {
    return (
        <section className = 'order'>
            <fieldset>
            <h1>{props.name}</h1>
            <b>N. Mesa: {props.table}</b>
            <span>{props.creationDate}</span>
            <p>{props.time}</p>
            <ol>{props.items.map((item)=>
                <li> {item.name}</li>)}
            </ol>
            <button>{props.status}</button>
            </fieldset>
       </section>
    )
}

export default OrderCard;
