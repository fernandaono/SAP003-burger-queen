import React from 'react';
import './index.css'

const MenuCard = (props) => {
    return  (
        <button className='btn' onClick={props.handleClick} > 
            <p>{props.Name}</p>
            <p>R${props.Price},00</p>
        </button>
        
    )
}

export default MenuCard;
