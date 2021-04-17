import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'

import PropertyListings from './PropertyListings'
import './styles.css';

const queryClient = new QueryClient();

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
            <QueryClientProvider client={queryClient}>
            <PropertyListings />
            </QueryClientProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
