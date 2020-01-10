import React, {useEffect, useState} from 'react';
import firebase from '../utils/firebaseUtils';
import MenuCard from '../components/Menucard';


function Restaurant (){
    const [lunch, setLunch] = useState([])
    const [acompanhamentos, setAcompanhamentos] = useState([])
    const [bebidas, setBebidas] = useState([])


    useEffect(() => { 
      firebase.firestore().collection('lunch').get().then((snapshot) => {
        snapshot.docs.map((doc) => setLunch ((current) => [...current, doc.data()]))
    })

      firebase.firestore().collection('bebidas').get().then((snapshot) => {
        snapshot.docs.map((doc) => setBebidas ((current) => [...current, doc.data()]))
    })

      firebase.firestore().collection('acompanhamentos').get().then((snapshot) => {
        snapshot.docs.map((doc) => setAcompanhamentos ((current) => [...current, doc.data()]))
    })

    },[]);    
    

    return(
        <div>

            {lunch.map((menuItem, i) =>
                <MenuCard name = {menuItem.Name} 
                key = {i}
                price = {menuItem.Price} 
                handleclick = {() => console.log(menuItem)}/>
                )}
            {acompanhamentos.map((menuItem, i) =>
                <MenuCard name = {menuItem.Name} 
                key = {i}
                price = {menuItem.Price} 
                handleclick = {() => console.log(menuItem)}/>
                )}         
            {bebidas.map((menuItem, i) =>
                <MenuCard name = {menuItem.Name} 
                key = {i}
                price = {menuItem.Price} 
                handleclick = {() => console.log(menuItem)}/>
                )}
        </div>
        
    );
};

export default Restaurant;