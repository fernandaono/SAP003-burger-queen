import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Restaurant from './pages/Restaurant';
import Kitchen from './pages/Kitchen'


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className= 'rotas'>
            <button><Link to="/pages/restaurant">Pedidos</Link></button>
            <button><Link to="/pages/kitchen">Cozinha</Link></button>
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
      
      </div>
    </Router>
  );
}

export default App;
