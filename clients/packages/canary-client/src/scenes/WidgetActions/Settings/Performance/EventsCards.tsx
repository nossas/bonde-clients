import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { Text } from "bonde-components";
import { Widget } from "../../FetchWidgets";
import Card from "./Card";

const ACTIVITY_FEED_TOTAL_GQL = gql`
  query activity_feed_total ($widgetId: Int!) {
    activity_feed_total(widget_id: $widgetId) {
      total
      events {
        total
        event_type
      }
    }
  }
`;

type ActivityFeedEvent = {
  total: number
  event_type: string
}

type Props = {
  widget: Widget
}

const EventsCards: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = useQuery(ACTIVITY_FEED_TOTAL_GQL, {
    variables: {
      widgetId: widget.id
    }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.log("EventsCards: ", error);
    return <Text>Failed!</Text>;
  }

  return (
    <>
      {data.activity_feed_total.events.map((evt: ActivityFeedEvent, index: number) => (
        <Card
          key={`activity-feed-total-${index}`}
          label={evt.event_type}
          value={evt.total}
        />
      ))}
    </>
  );
}

export default EventsCards;