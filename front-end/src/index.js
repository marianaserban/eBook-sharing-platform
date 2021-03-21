// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root') 
// );



// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import  App  from './App';

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Now inside App.js

// export const App = () => {
//     // ONLY NOW does it make sense to try to access the store/dispatch actions
// }