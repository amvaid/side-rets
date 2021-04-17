import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import PropertyListings from './PropertyListings'
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
          <Link to="/">Property Listing</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/">
            <PropertyListings />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
