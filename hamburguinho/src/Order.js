import React, {useState, useRef, useEffect} from 'react';

function PrintOrder() {
  const [name, setName] = useState('') 
  const inputRef = useRef(null) 

  useEffect(() => {
    inputRef.current.value = ''
  })

  return (
    <>
      <input type="text" ref={inputRef}  placeholder="Enter a Name" />
      <button onClick={() => setName(inputRef.current.value)}>Envie o Pedido</button>
      <p> {name} </p>
    </>
  )
}

export default PrintOrder


/* db.collection("pedidos").add({
    name: "teste",
    number: "1"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

let docRef = db.collection('pedidos').doc('some-id');
let updateTimestamp = docRef.update({
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
});
 */