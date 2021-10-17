import React from "react";
import { Route } from "react-router-dom";
import Settings from "./Settings";
import Recipient from "./Recipient";

const CommunityRoute = () => (
  <>
    <Route exact path="/community/settings" component={Settings} />
    <Route exact path="/community/recipient" component={Recipient} />
  </>
);

export default CommunityRoute;