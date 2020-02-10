import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Restaurant, LibraryBooksRounded } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: 50,
  },
  action: {
    fontSize: 24
  }
})

const Navigation = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}>
      <BottomNavigationAction
        label='Restaurante'
        value='restaurante'
        icon={<Restaurant/>}
        component={Link}
        to='/pages/restaurant'
        className={classes.action}/>
      <BottomNavigationAction
        label='Pedidos'
        value='pedidos'
        icon={<LibraryBooksRounded/>}
        component={Link}
        to='/pages/kitchen2'
        className={classes.action}/>
    </BottomNavigation>
  )
}

export default Navigation
