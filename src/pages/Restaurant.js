import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import firebase from '../utils/firebaseUtils'
import MenuCard from '../components/Menucard'
import Receipt from '../components/Receipt'
import Modal from '../components/Modal'
import Menu from '../components/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'

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
  }
}))

const HamburgerType = ({ item, onTypeSelect }) => {
  return (
    <>
      <h1>Tipo de Hamburguer:</h1>
      {item.type.map((e, i) =>
        <>
          <input
            name='type'
            type='radio'
            key={i}
            value={e}
            onClick={() => { onTypeSelect(e) }} />
          {e}
        </>
      )}
    </>
  )
}
HamburgerType.propTypes = {
  item: PropTypes.any.isRequired,
  onTypeSelect: PropTypes.func.isRequired
}
const Extra = ({ item, onExtraSelect }) => {
  return (
    <>
      <h1>Adicional:</h1>
      {item.extra.map((e, i) =>
        <>
          <input
            name='extra'
            type='radio'
            key={e.name}
            value={e.price}
            onClick={() => { onExtraSelect(e) }} />
          {e.name}
        </>
      )}
    </>
  )
}

Extra.propTypes = {
  item: PropTypes.any.isRequired,
  onExtraSelect: PropTypes.func.isRequired
}

function placeOrder (items, name, table, onOrderPlaced) {
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

function Restaurant () {
  const [menu, setMenu] = useState([])
  const [items, setItems] = useState([])
  const [breakfast, setBreakfast] = useState(null)
  const [name, setName] = useState(null)
  const [table, setTable] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [childr, setChildren] = useState(null)
  const [type, setType] = useState('')
  const [extra, setExtra] = useState({ price: 0, name: '' })
  const nameRef = useRef(null)
  const tableRef = useRef(null)
  const classes = useStyles()

  useEffect(() => {
    nameRef.current.value = ''
    tableRef.current.value = ''

    firebase.firestore().collection('menu').get().then((snapshot) => {
      snapshot.docs.map((doc) => setMenu((current) => [...current, doc.data()]))
    })
  }, [])

  const addOrder = (menuItem) => {
    const item = Object.assign({}, menuItem)
    if (menuItem.type && item.extra) {
      setChildren(<>
        <HamburgerType
          item={item}
          onTypeSelect={onTypeSelect} />
        <Extra
          item={item}
          onExtraSelect={onExtraSelect} />
      </>)
      setShowModal(true)
    }
    setItems([...items, item])
  }

  const onDelete = key => {
    setItems(items.filter((del, i) => i !== key))
    setExtra({ price: 0, name: '' })
    setType(null)
  }

  const onOrderPlaced = () => {
    setItems([])
    setBreakfast(null)
    setName(null)
    setTable(null)
    setExtra({ price: 0, name: '' })
    setType(null)
    nameRef.current.value = ''
    tableRef.current.value = ''
  }

  const onTypeSelect = (option) => {
    setType(option)
  }
  const onExtraSelect = (option) => {
    setExtra(option)
  }

  const onSelect = () => {
    if (!extra.name && !type) {
      alert('Selecione um tipo de hamburguer e um extra.')
      return
    }
    if (!extra) {
      alert('Selecione um extra.')
    }
    if (!type) {
      alert('Selecione um tipo de hamburguer.')
      return
    }
    const item = items[items.length - 1]
    item.extra = [extra]
    item.type = [type]
    setExtra({ price: 0, name: '' })
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
            <Modal onSelect={onSelect} show={showModal} childr={childr} />

            {menu.filter((m) => { return m.breakfast === breakfast }).map((menuItem, i) =>
              <MenuCard key={i} {...menuItem}
                handleClick={() => { addOrder(menuItem) }} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Receipt {...{ name: name, items: items, table: table }} onDelete={onDelete} />
            <form className="frm-container">
              <label>Cliente </label>
              <input className="input" type="text" ref={nameRef} placeholder="Nome do Cliente" onChange={() => {
                setName(nameRef.current.value)
              }} />
              <p></p>
              <label>N. Mesa </label>
              <input className="input" type="text" ref={tableRef} placeholder="N. Mesa" onChange={() => {
                setTable(tableRef.current.value)
              }} />
              <p></p>
            </form>
            <section className='btn' onClick={() => { placeOrder(items, name, table, onOrderPlaced) }}>Enviar Pedido</section>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Restaurant
