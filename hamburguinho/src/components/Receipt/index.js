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
                {item.name} <span/>
                {item.type ? <><br/>{item.type[0]}</>: ''} 
                {item.extra  ? <><br/> + {item.extra[0].name} R$ {item.extra[0].price}</>:''}
                <br/><span> Subtotal: R${item.price + (item.extra ? item.extra[0].price : 0)},00 </span>                
                <p className='fa fa-trash' onClick = {()=> {props.onDelete(i)}}></p>
                </li>
                )}
            </ol>
            <section>
                <p>Total = {props.items.reduce((acc, cur) => acc + cur.price + (cur.extra ? cur.extra[0].price :0), 0)},00</p>
            </section>
        </div>
    )
};

export default Receipt;
