import React from 'react';
import './index.css'

const Receipt = (props) => {
    return (
        <div className='info'>
            <p>Nome: {props.name}</p>
            <p>N. Mesa: {props.table}</p>
            <ol>
            {props.items.map((item, i) =>
                <li key= {i}>
                {item.name} 
                {props.type}
                {props.extra.name}
                {item.table} 
                <a className='fa fa-trash' onClick = {()=> {props.onDelete(i)}}></a>
                </li>
                )}
            </ol>
            <section>
                <p>Total = {props.items.reduce((acc, cur) => acc + cur.price, props.extra.price)},00</p>
            </section>
        </div>
    )
};

export default Receipt;