import React from "react";
// import { Box, Button, Stack, Text, Flex, SimpleGrid } from "bonde-components";
// import { useQuery, gql } from "bonde-core-tools";
import { Route, useRouteMatch, Switch } from "react-router-dom";
// import { Header } from "../../../../components/CardWithHeader";
import type { Widget } from "../../FetchWidgets";
import PerformanceScene from "./PerformanceScene";
import QRScene from "./QRScene";

// const PLIP_QUERY = gql`
//   query ($widget_id: Int!) {
//     plips(where: { widget_id: { _eq: $widget_id } }) {
//       id
//       widget_id
//       form_data
//       pdf_data
//       unique_identifier
//     }
//   }
// `;

interface Properties {
  widget: Widget
}

// interface Plip {
//   id: number;
//   widget_id: number;
//   form_data: any;
//   pdf_data: string;
//   unique_identifier: string;
// }

const PlipsHomeScene: React.FC<Properties> = ({ widget }) => {
  const match = useRouteMatch();
  console.log("widget", { widget });

  return (
    <Switch>
      <Route exact path={`${match.path}`} component={PerformanceScene} />
      <Route exact path={`${match.path}/workflow`} component={QRScene} />
    </Switch>
  )
}

export default PlipsHomeScene;