import React, {useEffect, useState, useRef} from 'react';
import firebase from '../utils/firebaseUtils';
import MenuCard from '../components/Menucard';
import Receipt from '../components/Receipt';
import Modal from '../components/Modal';

const HamburgerType = ({item, onTypeSelect}) => {
    return (
        <div>
            <label> Tipo de Hamburguer:
            {item.type.map((e, i)=>
                <><input
                name= 'type'
                type= 'radio'
                key = {i}
                value = {e} 
                onClick = {() => {onTypeSelect(e)}}/>{e}<br/></>
            )}
                </label>
        </div>
    );
};

const Extra = ({item, onExtraSelect}) => {
    return (
        <div>
        <label> Adicional:
        {item.extra.map((e, i)=>
            <><input
            name= 'extra'
            type= 'radio'
            key = {e.name}
            value = {e.price} 
            onClick = {() => {onExtraSelect(e.name)}}
            />{e.name}<br/></>
        )}
            </label>
        </div>
    );
};
function placeOrder(items, name, table, onOrderPlaced){
    if(!name && !table)
        return alert("Preencha o nome do cliente e mesa")
    if(!name)
        return alert("Preencha o nome do cliente")
    if(!table)
        return alert("Preencha o número da mesa")

        firebase.firestore().collection('orders').doc().set({
        name: name,
        table: table,
        items: items,
        creationDate: new Date(),
        preparationDate: null,
        readyDate: null,
        deliveryDate: null,

    }).then(() => {alert("Pedido Enviado!");onOrderPlaced()});
}
function Restaurant (){
    const [menu, setMenu] = useState([]);
    const [items, setItems] = useState([]);
    const [breakfast, setBreakfast] = useState(null);
    const [name, setName] = useState(null);
    const [table, setTable] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [children, setChildren] = useState(null);
    const [type, setType] = useState('');
    const [extra, setExtra] = useState({price:0,name:''});
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
        setChildren(null);
        if(menuItem.type && menuItem.extra){
            setChildren(<div><HamburgerType item = {menuItem} onTypeSelect= {onTypeSelect}/> Extra item = {menuItem} onExtraSelect = {onExtraSelect}/></div>);
            setShowModal(true)
        }
        setItems([...items, menuItem])   
    }

    const onDelete = key => {
        setItems(items.filter((del,i) => i !== key))
    }

    const onOrderPlaced = () => {
        setItems([]);
        setBreakfast(null);
        setName(null);
        setTable(null);
        nameRef.current.value = ""
        tableRef.current.value = ""
    }

    const onTypeSelect = (option) => {
        setType(option);
    }
    const onExtraSelect = (option) => {
        setExtra(option);
    }   

    return(
        
        <div>
            <Modal setShowModal = {setShowModal} show = {showModal} children = {children}/>
            <section className="btn-set" onClick={()=>{setBreakfast(true)}} >Café da Manhã</section>
            <section className="btn-set" onClick={()=>{setBreakfast(false)}}>Almoço/Jantar</section>
            <br></br>
            {menu.filter((m)=>{return m.breakfast === breakfast}).map((menuItem, i) =>
                <MenuCard key = {i} {...menuItem} 
                handleClick = {() => {addOrder(menuItem)} }/>
            )}

            <section>
                <Receipt {...{name: name, items: items, table: table, extra:extra, type:type}} onDelete = {onDelete}/>
                <br></br>
                <form className="frm-container">
                <label>Cliente </label>
                <input className="input" type="text" ref = {nameRef} placeholder="Nome do Cliente" onChange = {()=>{
                    setName(nameRef.current.value)}}/> 
                <p></p>
                <label>N. Mesa </label>
                <input className="input" type="text" ref = {tableRef} placeholder="N. Mesa" onChange = {()=>{
                    setTable(tableRef.current.value)}}/>
                <p></p>
                </form>
               <button onClick = {()=>{placeOrder(items,name,table,onOrderPlaced)}}>Enviar</button>
            </section>
        </div>
        
    );
};


export default Restaurant;