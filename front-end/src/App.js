import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
