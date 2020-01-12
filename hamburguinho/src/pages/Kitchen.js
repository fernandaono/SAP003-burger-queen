import React, {useEffect, useState} from 'react';
import firebase from '../utils/firebaseUtils';
import MenuCard from '../components/Menucard';


function Kitchen (){
    const [lunch, setLunch] = useState([])

    useEffect(() => { 
    
      firebase.firestore().collection('breakfast').where('Breakfast', '==', true).get().then((snapshot) => {
        snapshot.docs.map((doc) => setLunch ((current) => [...current, doc.data()]))
    })

    },[]);    
    

    return(
        <div>

            {lunch.map((menuItem, i) =>
                <MenuCard 
                name = {menuItem.Name} 
                key = {i}
                price = {menuItem.Price} 
                handleclick = {() => console.log(menuItem)}/>
                )}
        </div>
        
    );
};

export default Kitchen;