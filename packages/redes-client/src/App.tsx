import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import styled from "styled-components"
import { Text } from "bonde-components"

import logo from './logo.svg';
import './App.css';

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

function App() {
  return (
    <Router>
      <Route exact path="/">
        <div className="App">
          <AppHeader>
            <img src={logo} className="App-logo" alt="logo" />
            <Text>
              Edit <code>src/App.tsx</code> and save to reload.
            </Text>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </AppHeader>
        </div>
      </Route>
    </Router>
  );
}

export default App;
