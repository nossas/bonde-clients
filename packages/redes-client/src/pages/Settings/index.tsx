import React from "react";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { useCommunityExtra } from "../../services/CommunityExtraProvider";
import { Navigation, MatchSettings } from "./scenes";

type Settings = {
  id?: number;
  settings: {
    volunteer_msg: string;
    individual_msg: string;
  };
  name?: string;
  version?: string;
  community_id?: number;
};

const Settings = ({
  community,
}: {
  community?: { id: number };
}): React.ReactElement => {
  const { path, url } = useRouteMatch();
  const { groups } = useCommunityExtra();

  return (
    <div style={{ width: "100%" }}>
      <Navigation>
        <NavLink to={`${url}/match`} activeClassName="active">
          Match
        </NavLink>
      </Navigation>
      <Switch>
        <Route path={`${path}/match`}>
          <MatchSettings community={community} groups={groups} />
        </Route>
      </Switch>
    </div>
  );
};

export default Settings;
