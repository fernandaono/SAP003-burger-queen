import React, {useEffect, useState, useRef} from 'react';
import firebase from '../utils/firebaseUtils';
import MenuCard from '../components/Menucard';


function placeOrder(items, name){
    if(name == null)
        return alert("Preencha o nome do cliente")
        
    firebase.firestore().collection('orders').doc().set({
        name: name,
        items: items,
        status: 'pending'
    }).then(alert("Pedido Enviado!"));
}
function Restaurant (){
    const [menu, setMenu] = useState([])
    const [items, setItems] = useState([])
    const [breakfast, setBreakfast] = useState(null)
    const [name, setName] = useState(null)
    const nameRef = useRef(null)


    useEffect(() => { 
        nameRef.current.value = ''
        firebase.firestore().collection('breakfast').get().then((snapshot) => {
            snapshot.docs.map((doc) => setMenu ((current) => [...current, doc.data()]))
        })
    },[]); 
    
    const addOrder = (menuItem) => {
        setItems([...items, menuItem])   
    }

    return(
        
        <div>
            <button onClick={()=>{setBreakfast(true)}} >Café da Manhã</button>
            <button onClick={()=>{setBreakfast(false)}}>Almoço/Jantar</button>
            <br></br>
            {menu.filter((m)=>{return m.Breakfast === breakfast}).map((menuItem, i) =>
                <MenuCard key = {i} {...menuItem} 
                handleClick = {() => {addOrder(menuItem)} }/>
            )}
            
            <section>
                <h1>Pedidos</h1>
                    {items.map(el => <p> 1 {el.Name} R${el.Price},00 </p>)}
                <input ref = {nameRef} placeholder="Nome do Cliente" onChange = {()=>{
                    setName(nameRef.current.value)}} >
                </input>
                <button onClick = {()=>{placeOrder(items,name)}}>Enviar</button>
            </section>
        </div>
        
    );
};


export default Restaurant;