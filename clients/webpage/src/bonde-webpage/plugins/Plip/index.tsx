import React, { useState, useEffect } from 'react';
// import gql from 'graphql-tag';
// import DonationStats from './DonationStats';

// const query = gql`
//   query Targets($widgetId: Int!) {
//     pressure_targets(
//       where: { widget_id: { _eq: $widgetId } }
//       order_by: { label: asc }
//     ) {
//       identify
//       label
//       targets
//       email_subject
//       email_body
//     }
//   }
// `;

type Props = {
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  asyncFillWidget: any;
  widgetId: number;
  children: any;
};

interface State {
  data: any[];
  fetching: boolean;
}

const PlipPlugin = ({ asyncFillWidget, children }: Props): JSX.Element => {
  const [state, setState] = useState<State>({ data: [], fetching: true });

  useEffect(() => {
    asyncFillWidget({ email: "çicas", state: "sp", widget_id: 111 })
      .then(({ data }: any) => {
        setState({ data, fetching: false });
      })
      .catch((err: any) => {
        console.error('PlipPlugin: ', err);
      });
  }, []);

  // TODO: Render Loading...
  if (state.fetching) return <div />;
  return children({ data: state.data });
};

export default PlipPlugin;
