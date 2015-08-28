import React from 'react';
import { Route } from 'react-router';
import Application from '../../app/scripts/containers/Application.jsx';
import Login from '../../app/scripts/pages/Login.jsx';

export default function(store) {
  return (
    <Route path="/" component={Application}>
      <Route path="/login" component={Login} />
    </Route>
  );
}
