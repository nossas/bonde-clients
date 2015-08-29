import React from 'react';
import { Route } from 'react-router';
import Application from '../../app/scripts/containers/Application.jsx';
import Login from '../../app/scripts/pages/Login.jsx';
import Mobilizations from '../../app/scripts/containers/Mobilizations.jsx';
import ListMobilizations from '../../app/scripts/pages/ListMobilizations.jsx';
import TopMenu from '../../app/scripts/components/TopMenu.jsx';

export default function(store) {
  return (
    <Route component={Application}>
      <Route path="/login" component={Login} />
      <Route component={Mobilizations}>
        <Route path="/" components={{main: ListMobilizations, topMenu: TopMenu}} />
      </Route>
    </Route>
  );
}
