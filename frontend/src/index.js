import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
const root = ReactDOM.createRoot(document.getElementById("root"));


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider >,
  document.getElementById('root')
);
// ReactDOM.render(
//   // <React.StrictMode>
//     <App />
//   {/* </React.StrictMode>, */}
//   document.getElementById('root')
// );

// ReactDOM.render

