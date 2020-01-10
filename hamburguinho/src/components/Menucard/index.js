import React from 'react';
import './index.css'

function MenuCard(props){
    return  (
        <section onClick={props.handeClick} className='menucss' > 
            <p>{props.name}</p>
            <p>R$ {props.price},00</p>
        </section>
    )
}

export default MenuCard;
