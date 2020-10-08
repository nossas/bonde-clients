import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FetchDNSHostedZones from './FetchDNSHostedZones';
import DetailDomain from './DetailDomain';
import ListDomain from './ListDomain';

const Domains = () => {
  const { path } = useRouteMatch();
  return (
    <FetchDNSHostedZones>
      {({ hostedZones }: any) => (
        <Switch>
          <Route exact path={path}>
            <ListDomain hostedZones={hostedZones} />
          </Route>
          <Route exact path={`${path}/:hostedZoneId`}>
            <DetailDomain hostedZones={hostedZones} />
          </Route>
        </Switch>
      )}
    </FetchDNSHostedZones>
  );
}

export default Domains;