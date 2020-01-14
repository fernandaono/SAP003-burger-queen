import React from 'react';
import './index.css'

const OrderCard = (props) => {
    return (
        <section className = 'order'>
            <h1>{props.name}</h1>
            <span>N. Mesa: {props.table}</span><br></br>
            <span>{new Date(props.creationDate.seconds*1000).toLocaleDateString('pt-BR')}</span>
            <ol>{props.items.map((item)=>
                <li> {item.name}</li>)}
            </ol>
            {props.buttonText ? <button onClick = {props.onClick}>{props.buttonText}</button> : ''}
            </section>
    )
}

export default OrderCard;
