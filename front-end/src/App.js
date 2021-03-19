import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
