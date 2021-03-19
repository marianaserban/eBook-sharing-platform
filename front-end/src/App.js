import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
