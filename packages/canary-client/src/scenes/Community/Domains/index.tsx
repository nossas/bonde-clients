import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import FetchDNSHostedZones from './FetchDNSHostedZones';
import DetailDomain from './DetailDomain';
import ListDomain from './ListDomain';

const Domains = () => {
  const { path } = useRouteMatch();
  return (
    <FetchDNSHostedZones>
      {({ dnsHostedZones }: any) => (
        <Switch>
          <Route exact path={path}>
            <ListDomain dnsHostedZones={dnsHostedZones} />
          </Route>
          <Route exact path={`${path}/:hostedZoneId`}>
            <DetailDomain dnsHostedZones={dnsHostedZones} />
          </Route>
        </Switch>
      )}
    </FetchDNSHostedZones>
  );
}

export default Domains;