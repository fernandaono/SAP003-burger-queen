import React, {useEffect, useState, useRef} from 'react';
import firebase from '../utils/firebaseUtils';
import MenuCard from '../components/Menucard';
import Receipt from '../components/Receipt';

function placeOrder(items, name, table){
    if(name  == null)
        return alert("Preencha o nome do cliente")

    firebase.firestore().collection('orders').doc().set({
        name: name,
        table: table,
        items: items,
        status: 'pending',
        time:   new Date().toLocaleString('pt-BR')

    }).then(alert("Pedido Enviado!"));
}
function Restaurant (){
    const [menu, setMenu] = useState([]);
    const [items, setItems] = useState([]);
    const [breakfast, setBreakfast] = useState(null);
    const [name, setName] = useState(null);
    const [table, setTable] = useState(null);
    const nameRef = useRef(null);
    const tableRef = useRef (null)

    useEffect(() => { 
        nameRef.current.value = '';
        tableRef.current.value = '';

        firebase.firestore().collection('menu').get().then((snapshot) => {
            snapshot.docs.map((doc) => setMenu ((current) => [...current, doc.data()]))
        })
    },[]); 
    
    const addOrder = (menuItem) => {
        setItems([...items, menuItem])   
    }

    const onDelete = key => {
        setItems(items.filter((x,i) => i !== key))
    }

    return(
        
        <div>
            <section className="btn-set" onClick={()=>{setBreakfast(true)}} >Café da Manhã</section>
            <section className="btn-set" onClick={()=>{setBreakfast(false)}}>Almoço/Jantar</section>
            <br></br>
            {menu.filter((m)=>{return m.breakfast === breakfast}).map((menuItem, i) =>
                <MenuCard key = {i} {...menuItem} 
                handleClick = {() => {addOrder(menuItem)} }/>
            )}

            <section>

                <Receipt {...{name: name, items: items, table: table}} onDelete = {onDelete}/>
                <br></br>
                <label>Cliente</label>
                <input ref = {nameRef} placeholder="Nome do Cliente" onChange = {()=>{
                    setName(nameRef.current.value)}}> 
                </input>
                <label>N. Mesa</label>
                <input ref = {tableRef} placeholder="N. Mesa" onChange = {()=>{
                    setTable(tableRef.current.value)}}>
                </input>
                
                <button onClick = {()=>{placeOrder(items,name,table)}}>Enviar</button>
            </section>
        </div>
        
    );
};


export default Restaurant;