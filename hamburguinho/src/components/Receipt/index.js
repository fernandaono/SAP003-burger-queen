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
                {item.table}

                <button onClick = {()=> {props.onDelete(i)}}>x</button>
                </li>
                )}
            </ol>
            <section>
             <p>Total = {props.items.reduce((acc, cur) => acc + cur.price,0)},00</p>
            </section>
        </div>
    )
};

export default Receipt;