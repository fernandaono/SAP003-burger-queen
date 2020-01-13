import React from 'react';

const Receipt = (props) => {
    return (
        <div>
            <p>Nome: {props.name}</p>
            <p>Mesa: {props.table}</p>
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
    );
};

export default Receipt;