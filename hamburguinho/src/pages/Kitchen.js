import React, {useEffect, useState} from 'react';
import firebase from '../utils/firebaseUtils';
import OrderCard from '../components/Order';

function Kitchen (){
    const [orders, setOrders] = useState([])

    useEffect(()=> {
        firebase.firestore().collection('order').get().then((snapshot) => {
            snapshot.docs.map((doc) => setOrders ((current) => [...current, doc.data()]))   
   })
    },[]);

    return (
        <div>
            {orders.map((order) => 
            <OrderCard creationDate = {order.creationDate}
            key = {order.number}
            name = {order.name} 
            items = {order.items.map((item)=> <p>{item.Name}</p> )}/>  
            )}
        </div>
    );
};

export default Kitchen;