import React, { useEffect, useState } from 'react'
import firebase from '../utils/firebaseUtils'
import OrderCard from '../components/Order2'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography, Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1
  },
  title: {
    padding: 16
  },
  control: {
    padding: theme.spacing(2)
  },
  paper: {
    padding: '16px 8px 16px 8px',
    alignItems: 'center'
  },
  divider: {
    marginBottom: 16
  }
}))

const Kitchen2 = () => {
  const [orders, setOrders] = useState([])
  const classes = useStyles()

  useEffect(() => {
    firebase.firestore().collection('orders').get().then((snapshot) => {
      snapshot.docs.map((doc) => setOrders((current) => [...current, { data: doc.data(), key: doc._key.path.segments[doc._key.path.segments.length - 1] }]))
    })
  }, [])

  const onClick = (order) => {
    if (order.data.status === 'pending') {
      order.data.preparationDate = new Date()
      firebase.firestore().collection('orders').doc(order.key).set({
        preparationDate: order.data.preparationDate
      }, { merge: true })
    } else if (order.data.status === 'preparing') {
      order.data.readyDate = new Date()
      firebase.firestore().collection('orders').doc(order.key).set({
        readyDate: order.data.readyDate
      }, { merge: true })
    } else if (order.data.status === 'ready') {
      order.data.deliveryDate = new Date()
      firebase.firestore().collection('orders').doc(order.key).set({
        deliveryDate: order.data.deliveryDate
      }, { merge: true })
    }
    const newOrders = orders.filter((e) => e.key !== order.key)
    setOrders([...newOrders, order])
  }

  return (
    <Container>
      <Grid container xs={12}>
        <Grid key='pending' item  xs={3} justify='center' alignItems='center'>
          <Typography variant='h4' component='h1' className={classes.title}>Pendente</Typography>
          <Divider className={classes.divider} />
          {orders.filter((e) => e.data.creationDate && !e.data.preparationDate && !e.data.readyDate && !e.data.deliveryDate).map((order) =>
            <OrderCard key={Math.random().toString(36).substring(7)} {...order.data} buttonText='Preparar' onClick={() => { onClick(order) }} />
          )}
        </Grid>
        <Grid key='preparing' item xs={3} justify='center' alignItems='center'>
          <Typography variant='h4' component='h1' className={classes.title}>Preparando</Typography>
          <Divider className={classes.divider} />
          {orders.filter((e) => e.data.creationDate && e.data.preparationDate && !e.data.readyDate && !e.data.deliveryDate).map((order) =>
            <OrderCard key={Math.random().toString(36).substring(7)} {...order.data} buttonText='Pronto' onClick={() => { onClick(order) }} />
          )}
        </Grid>
        <Grid key='ready' item xs={3} justify='center' alignItems='center'>
          <Typography variant='h4' component='h1' className={classes.title}>Prontos</Typography>
          <Divider className={classes.divider} />
          {orders.filter((e) => e.data.creationDate && e.data.preparationDate && e.data.readyDate && !e.data.deliveryDate).map((order) =>
            <OrderCard key={Math.random().toString(36).substring(7)} {...order.data} buttonText='Entregue' onClick={() => { onClick(order) }} />
          )}
        </Grid>
        <Grid key='delivered' item xs={3} justify='center' alignItems='center'>
          <Typography variant='h4' component='h1' className={classes.title}>Entregues</Typography>
          <Divider className={classes.divider} />
          {orders.filter((e) => e.data.creationDate && e.data.preparationDate && e.data.readyDate && e.data.deliveryDate).map((order) =>
            <OrderCard key={Math.random().toString(36).substring(7)} {...order.data} />
          )}
        </Grid>
      </Grid>
    </Container>

  )
}

export default Kitchen2
