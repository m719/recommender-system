// React deps
import React from 'react';
import ReactDOM from 'react-dom';

// CSS
import './index.css';
import 'antd/dist/antd.css';

// Specific modules
import configureStore from './configureStore'
import { createBrowserHistory } from 'history'

// Main entry app
import App from './components/App';

// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createBrowserHistory()
const initialState = window.INITIAL_REDUX_STATE;

const store = configureStore(history, initialState)

ReactDOM.render(
  <React.StrictMode>
    <App store={store} history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
