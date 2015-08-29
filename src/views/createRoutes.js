import React from 'react'
import { Route } from 'react-router'
import { Application, Mobilizations, Mobilization } from '../../app/scripts/containers'
import { Login, ListMobilizations, NewMobilization, ShowMobilization } from '../../app/scripts/pages'
import { TopMenu } from '../../app/scripts/components'

export default function(store) {
  return (
    <Route component={Application}>
      <Route path="/login" component={Login} />
      <Route component={Mobilizations}>
        <Route path="/" components={{main: ListMobilizations, topMenu: TopMenu}} />
        <Route path="/mobilizations/new" components={{main: NewMobilization, topMenu: TopMenu}} />
          <Route component={Mobilization} >
            <Route path="/mobilizations/:mobilization_id" components={{main: ShowMobilization}} />
          </Route>
      </Route>
    </Route>
  );
}
