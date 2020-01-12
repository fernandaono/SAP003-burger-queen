import React, {useEffect, useState} from 'react';
import firebase from '../utils/firebaseUtils';
import OrderCard from '../components/Order';

function Kitchen (){
    const [orders, setOrders] = useState([])

    useEffect(() => { 
        firebase.firestore().collection('orders').get().then((snapshot) => {
            snapshot.docs.map((doc) => setOrders ((current) => [...current, doc.data()]))
        })
    },[]); 

    return (
        <div>
            {orders.map((order, i) => 
            <OrderCard creationDate = {order.creationDate}
            key = {i}
            name = {order.name} 
            items = {order.items}/>  
            )}
        </div>
    );
};

export default Kitchen;