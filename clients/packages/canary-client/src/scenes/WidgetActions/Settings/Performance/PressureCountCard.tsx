import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { Text } from "bonde-components";
import { Widget } from "../../FetchWidgets";
import Card from "./Card";


const ACTIVIST_PRESSURES_COUNT = gql`
query activist_pressures ($widgetId: Int!){
  activist_pressures_aggregate(where: {
    widget_id: {
      _eq: $widgetId
    }
  }) {
    aggregate{
      count
    }
  }
}
`;

type Props = {
  widget: Widget
}

const PressureCountCard: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = useQuery(ACTIVIST_PRESSURES_COUNT, {
    variables: {
      widgetId: widget.id
    }
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    console.log("EventsCards: ", error);
    return <Text>Failed!</Text>;
  }

  return (
    <>
      <Card
        value={data.activist_pressures_aggregate.aggregate.count}
        label={'Pressões'}
      />
    </>
  );
}

export default PressureCountCard;
