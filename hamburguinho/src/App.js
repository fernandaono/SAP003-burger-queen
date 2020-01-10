import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Restaurant from './pages/Restaurant';
import Kitchen from './pages/Kitchen';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className= 'rotas'>
            <li>
              <Link to="/pages/breakfast">Café da Manhã</Link>
            </li>
            <li>
              <Link to="/pages/lunch">Lanches & Bebidas</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/pages/breakfast" component={Restaurant}>
            <Restaurant/>
          </Route>
         
          <Route path="/pages/lunch" component={Kitchen}>
            <Kitchen/>
          </Route>
        </Switch>
      
      </div>
    </Router>
  );
}

export default App;
