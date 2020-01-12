import React from 'react';

function OrderCard(props){
    return (
        <section className = 'order'>
            <span>{props.creationDate}</span>
            <span>{props.name}</span>
            <ol>{props.items.map((item, i)=>
                <li> {item.Name}</li>)}
            </ol>
       </section>
    )
}

export default OrderCard;
