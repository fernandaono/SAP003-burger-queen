import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Restaurant from './pages/Restaurant'
import Kitchen2 from './pages/Kitchen2'
import Navigation from './components/Navigation'
import CssBaseline from '@material-ui/core/CssBaseline';

function App () {
  return (
    <CssBaseline>
      <Router>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <Switch>
          <Route path="/pages/restaurant" component={Restaurant}>
            <Restaurant />
          </Route>
          <Route path="/pages/kitchen2" component={Kitchen2}>
            <Kitchen2 />
          </Route>
        </Switch>
        <Navigation />
      </Router>
    </CssBaseline>
  )
}

export default App
