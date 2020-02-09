import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import MenuCard from '../Menucard'
import { Tabs, Tab, AppBar, Typography, Box, Grid } from '@material-ui/core'
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import PropTypes from 'prop-types'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      { value === index && <Box p={3}>{children}</Box> }
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  grid: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const Menu = (props) => {
  const { menu, addOrder } = props
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='Opções de Menu'>
          <Tab label='Café da manhã ' {...a11yProps(0)} icon={<FreeBreakfastIcon/>}/>
          <Tab label='Almoço/Jantar' {...a11yProps(1)} icon={<FastfoodIcon/>}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel>
          <div className = {classes.grid}>
            <Grid container spacing={2}>
              {menu.filter((m) => { return m.breakfast === true }).map((menuItem, i) =>
                <Grid item xs = {3} key={i}>
                  <MenuCard key = {i} {...menuItem}
                    handleClick = {() => { addOrder(menuItem) } }/>
                </Grid>
              )}
            </Grid>
          </div>
        </TabPanel>
        <TabPanel>
          <div className = {classes.grid}>
            <Grid container spacing={2}>
              {menu.filter((m) => { return m.breakfast === false }).map((menuItem, i) =>
                <Grid item xs = {3} key={i}>
                  <MenuCard key = {i} {...menuItem}
                    handleClick = {() => { addOrder(menuItem) } }/>
                </Grid>
              )}
            </Grid>
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
  addOrder: PropTypes.func.isRequired
}

export default Menu
