import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import AddBook from './components/AddBook/AddBook'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/addBook" exact component={AddBook} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
