import React, {useEffect, useState} from 'react';
import firebase from '../utils/firebaseUtils';
import MenuCard from '../components/Menucard';
import Order from '../Order'


function Restaurant (){
    const [menu, setMenu] = useState([])
    const [order, setOrder] = useState([])


    useEffect(() => { 
    firebase.firestore().collection('breakfast').where('Breakfast', '==', false).get().then((snapshot) => {
        snapshot.docs.map((doc) => setMenu ((current) => [...current, doc.data()]))
    })
    },[]); 
    
    const addOrder = (menuItem) => {
        setOrder((curr) => [...curr, menuItem])
    }

    return(
        
            <div>
                {menu.map((menuItem, i) =>
                    <MenuCard name = {menuItem.Name} 
                    key = {i}
                    price = {menuItem.Price} 
                    handleClick = {() => {addOrder(menuItem)} }/>
                )}
                
            <section>
                <h1>Pedidos</h1>
                    {order.map(el => 
                        <p> 1 {el.Name} R${el.Price},00 </p>
                        )}

                <Order />
            </section>
                    </div>
        
    );
};

export default Restaurant;