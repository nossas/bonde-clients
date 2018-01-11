import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './example/index.css'
import App from './example/App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
