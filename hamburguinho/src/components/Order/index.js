import React from 'react';

const OrderCard = (props) => {
    return (
        <section className = 'order'>
            <span>{props.creationDate}</span>
            <span>{props.name}</span>
            <ol>{props.items.map((item)=>
                <li> {item.Name}</li>)}
            </ol>
       </section>
    )
}

export default OrderCard;
