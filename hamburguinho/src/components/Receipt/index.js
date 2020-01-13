import React from 'react';

const Receipt = (props) => {
    return (
        <div> 
            <h1>{props.name}</h1>
            <ol>
            {props.items.map((item, i) =>
                <li key= {i}>
                {item.name}
                <button onClick = {()=> {props.onDelete(i)}}>❌</button>
                </li>
                )}
            </ol>
            <section>
                {props.items.reduce((acc, cur) => acc + cur.price,0)}
            </section>
        </div>
    );
};

export default Receipt;