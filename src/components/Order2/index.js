import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardContent, CardHeader, Button, Typography, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '95%',
    margin: '0 auto',
    marginBottom: 16
  },
  header: {
    padding: '16px 16px 3px 16px'
  },
  content: {
    padding: '3px 16px 0 16px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 14,
    margin: '0 auto'
  },
  typo: {
    fontSize: 10
  }
}))

const OrderCard = (props) => {
  const classes = useStyles()
  let cardActions = <></>

  if (props.buttonText && props.onClick) {
    cardActions = <CardActions className={classes.actions}>
      <Button variant='contained' onClick={props.onClick}>{props.buttonText}</Button>
    </CardActions>
  }

  return (
    <Card className={classes.root} variant='elevation' elevation={3}>
      <CardHeader
        title={`${props.name}`}
        subheader = {`Mesa #${props.table}`}
        className={classes.header}/>
      <CardContent className={classes.content}>
        {props.items.map((item, i) =>
          <Typography key={i} className={classes.typo} variant='body2' color='textSecondary' component='p'>
            {item.name}
          </Typography>
        )}
        {cardActions}
      </CardContent>
    </Card>
  )
}

OrderCard.propTypes = {
  name: PropTypes.string.isRequired,
  table: PropTypes.any.isRequired,
  creationDate: PropTypes.any.isRequired,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  buttonText: PropTypes.string
}

export default OrderCard
