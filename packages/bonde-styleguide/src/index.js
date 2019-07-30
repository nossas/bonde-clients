// import React from 'react';
// import ReactDOM from 'react-dom';
import WebFont from 'webfontloader'

import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

WebFont.load({
  google: {
    families: ['Nunito Sans:400,600,800', 'sans-serif', 'Source Sans Pro:400,700']
  }
})

export * from './components/assets'
export * from './components/await'
export * from './components/cards'
export * from './components/content'
export * from './components/form'
export * from './components/layout'
export * from './components/list'
export * from './components/navigation'
export * from './components/progress'
