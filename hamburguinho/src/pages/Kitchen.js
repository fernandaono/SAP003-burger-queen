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
            {orders.map((order, index) => 
            <OrderCard creationDate = {order.creationDate}
            key = {index}
            time = {order.time}
            table = {order.table}
            name = {order.name} 
            items = {order.items}
            status = {order.status}
            
            />  
            )}
        </div>
    );
};

export default Kitchen;