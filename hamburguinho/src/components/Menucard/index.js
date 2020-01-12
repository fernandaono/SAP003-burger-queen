import React from 'react';
import './index.css'

const MenuCard = (props) => {
    return  (
        <button className='btn' onClick={props.handleClick} > 
            <p>{props.name}</p>
            <p>R${props.price},00</p>
        </button>
        
    )
}

export default MenuCard;
