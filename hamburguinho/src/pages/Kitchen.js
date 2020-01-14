import React, {useEffect, useState} from 'react';
import firebase from '../utils/firebaseUtils';
import OrderCard from '../components/Order';

function Kitchen (){
    const [orders, setOrders] = useState([])

    useEffect(() => { 
        firebase.firestore().collection('orders').get().then((snapshot) => {
            snapshot.docs.map((doc) => setOrders ((current) => [...current, {data:doc.data(), key: doc._key.path.segments[doc._key.path.segments.length -1]}]))
        })
    },[]); 

    const onClick = (order) => {
        if(order.data.creationDate
            && !order.data.preparationDate
            && !order.data.readyDate
            && !order.data.deliveryDate){
            order.data.preparationDate = new Date()
            firebase.firestore().collection('orders').doc(order.key).set({
                preparationDate: order.data.preparationDate
            },{merge: true});
        }else if(order.data.creationDate
            && order.data.preparationDate
            && !order.data.readyDate
            && !order.data.deliveryDate){
            order.data.readyDate = new Date ()
            firebase.firestore().collection('orders').doc(order.key).set({
                readyDate: order.data.readyDate
            },{merge: true});
        }else if(order.data.creationDate
            && order.data.preparationDate
            && order.data.readyDate
            && !order.data.deliveryDate){
            order.data.deliveryDate = new Date ()
            firebase.firestore().collection('orders').doc(order.key).set({
                deliveryDate: order.data.deliveryDate
            },{merge: true});
        }
        let newOrders = orders.filter((e) => e.key !== order.key)
        setOrders([...newOrders,order])
    }

    return (
        <div className='container'>

            <div className= 'creation'>
            <h1>Criados</h1>
                {orders.filter((e) => e.data.creationDate && !e.data.preparationDate && !e.data.readyDate && !e.data.deliveryDate).map((order)=>
                    <OrderCard {...order.data} buttonText = 'Preparar' onClick = {() =>{onClick(order)}}
                    />
                )}
            </div>
            <div className='preparation'>
            <h1>Preparando</h1>
                {orders.filter((e) => e.data.creationDate && e.data.preparationDate && !e.data.readyDate && !e.data.deliveryDate).map((order)=>
                    <OrderCard {...order.data} buttonText = 'Pronto' onClick = {() =>{onClick(order)}}
                    />
                )}
            </div>
            <div className='ready'>
            <h1>Prontos</h1>
                {orders.filter((e) => e.data.creationDate && e.data.preparationDate && e.data.readyDate && !e.data.deliveryDate).map((order)=>
                    <OrderCard {...order.data} buttonText = 'Entregue' onClick = {() =>{onClick(order)}}
                    />
                )}
            </div>
            <div className='delivery'>
            <h1>Entregue</h1>
                {orders.filter((e) => e.data.creationDate && e.data.preparationDate && e.data.readyDate && e.data.deliveryDate).map((order)=>
                    <OrderCard {...order.data}/>
                )}
            </div>
        </div>
    );
};

export default Kitchen;