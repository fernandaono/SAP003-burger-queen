import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import firebase from '../utils/firebaseUtils'
import MenuCard from '../components/Menucard'
import Receipt from '../components/Receipt'
import Modal from '../components/Modal'
import Menu from '../components/Menu'
import TypeExtra from '../components/TypeExtra'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1
  },
  paper: {
    width: '100%',
    margin: 6
  },
  control: {
    padding: theme.spacing(2)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function placeOrder(items, name, table, onOrderPlaced) {
  if (!name && !table) {
    return alert('Preencha o nome do cliente e mesa')
  }
  if (!name) {
    return alert('Preencha o nome do cliente')
  }
  if (!table) {
    return alert('Preencha o número da mesa')
  }

  firebase.firestore().collection('orders').doc().set({
    name: name,
    table: table,
    items: items,
    creationDate: new Date(),
    preparationDate: null,
    readyDate: null,
    deliveryDate: null
  }).then(() => { alert('Pedido Enviado!'); onOrderPlaced() })
}

function Restaurant() {
  const [menu, setMenu] = useState([])
  const [items, setItems] = useState([])
  const [breakfast, setBreakfast] = useState(null)
  const [name, setName] = useState('')
  const [table, setTable] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [childr, setChildren] = useState(null)
  const [type, setType] = useState(null)
  const [extra, setExtra] = useState(null)
  const classes = useStyles()
  
  const handleName = event => {
    setName(event.target.value)
  }
  const handleTable = event => {
    setTable(event.target.value)
  }

  useEffect(() => {  
    firebase.firestore().collection('menu').get().then((snapshot) => {
      snapshot.docs.map((doc) => setMenu((current) => [...current, doc.data()]))
    })
  }, [])
  
  const addOrder = (menuItem) => {
    // faz uma cópia do objeto menuItem
    const item = Object.assign({}, menuItem)
    if (item.type && item.extra) {
      setChildren(
        <TypeExtra
        item={item}
        onTypeSelect={onTypeSelect} 
        onExtraSelect={onExtraSelect} 
      />)
      setShowModal(true)
    }
    setItems([...items, item])
  }

  const onDelete = key => {
    setItems(items.filter((del, i) => i !== key))
    setExtra(null)
    setType(null)
  }

  const onOrderPlaced = () => {
    setItems([])
    setBreakfast(null)
    setName('')
    setTable('')
    setExtra(null)
    setType(null)
  }
  
  const onTypeSelect = (type) => {
    setType(type)
  }
  const onExtraSelect = (extra) => {
    setExtra(extra)
  }
  
  const onSelect = () => {
    if (!extra && !type) {
      alert('Selecione um tipo de hamburguer e um extra.')
      return
    }
    if (!extra) {
      alert('Selecione um extra.')
      return
    }
    if (!type) {
      alert('Selecione um tipo de hamburguer.')
      return
    }
    const item = items[items.length - 1]
    item.extra = [extra]
    item.type = [type]
    setExtra(null)
    setType(null)
    items.splice(-1, 1)
    setItems([...items, item])
    setMenu(menu)
    setShowModal(false)
    setChildren(null)
  }

  return (
    <>
      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Menu menu={menu} addOrder={addOrder}></Menu>
            <Modal onSelect={onSelect} show={showModal} children={childr} />
            {menu.filter((m) => { return m.breakfast === breakfast }).map((menuItem, i) =>
              <MenuCard key={i} {...menuItem}
              handleClick={() => { addOrder(menuItem) }} />
              )}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Receipt {...{ name: name, items: items, table: table }} onDelete={onDelete} />
            
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label= "Nome" value={name} onChange={handleName} />
              <TextField id="standard-basic" label= "Mesa" value={table} onChange={handleTable}/>
            <Button variant="contained" color="secondary.dark" onClick={() => { placeOrder(items, name, table, onOrderPlaced)}}>
              Enviar Pedido
            </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
export default Restaurant
          


          
