import React from 'react'
import { Switch } from 'react-router-dom'

// Routes
import SidebarContainer from './sidebar'
import PrivateRoute from './private-route'

const Logged = () => {
  return (
    <Switch>
      <PrivateRoute
        path='/'
        component={SidebarContainer}
      />
    </Switch>
  );
}

export default Logged;
