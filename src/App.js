import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Restaurant from './pages/Restaurant';
import Kitchen from './pages/Kitchen'
import './App.css'

function App() {
  return (
    <Router>
      <nav className= 'topnav'>
        <ul className= 'rotas'>
          <a href><Link to="/pages/restaurant">Novo Pedido </Link></a> 
          <a href><Link to="/pages/kitchen">Status dos Pedidos</Link></a>
        </ul>
      </nav>
      <Switch>
        <Route path="/pages/restaurant" component={Restaurant}>
          <Restaurant/>
        </Route>
        <Route path="/pages/kitchen" component={Kitchen}>
          <Kitchen/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;