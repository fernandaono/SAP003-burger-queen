import React, {useEffect, useState} from 'react';
import firebase from '../utils/firebaseUtils';
import MenuCard from '../components/Menucard';


function Restaurant (){
    const [breakfast, setBreakfast] = useState([])


    useEffect(() => { 

    firebase.firestore().collection('breakfast').get().then((snapshot) => {
        snapshot.docs.map((doc) => setBreakfast ((current) => [...current, doc.data()]))
    })

    },[]);    
    

    return(
        <div>

            {breakfast.map((menuItem, i) =>
                <MenuCard name = {menuItem.Name} 
                key = {i}
                price = {menuItem.Price} 
                handleclick = {() => console.log(menuItem)}/>
                )}
        </div>
        
    );
};

export default Restaurant;