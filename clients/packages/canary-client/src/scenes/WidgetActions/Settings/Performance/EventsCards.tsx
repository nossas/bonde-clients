import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { Text } from "bonde-components";
import { Widget } from "../../FetchWidgets";
import Card from "./Card";

const ACTIVITY_FEED_TOTAL_GQL = gql`
  query activity_feed_total ($widgetId: Int!) {
    activity_feed_total(widget_id: $widgetId) {
      total
      min_timestamp
      max_timestamp
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

  const eventsProcessed = data.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "processed")[0];
  const eventsDropped = data.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "dropped")[0];
  const eventsBounce = data.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "bounce")[0];
  const eventsDelivered = data.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "delivered")[0];

  return (
    <>
      <Card
        label="Emails enviados"
        helpText={`
          O total de emails enviados varia de acordo com o número de pressões realizadas, a quantidade de alvos e se o envio otimizado está ativado ou não.

          Captura de eventos começou a partir de ${new Date(data.activity_feed_total.min_timestamp).toLocaleString()};
        `}
        value={eventsProcessed.total}
      />
      <Card
        label="Entregues"
        value={`${Math.round(eventsDelivered?.total ? (eventsDelivered?.total / eventsProcessed?.total) * 100 : 0)}%`}
      />
      <Card
        label="Bounce"
        value={`${Math.round(eventsBounce?.total ? (eventsBounce?.total / eventsProcessed?.total) * 100 : 0)}%`}
      />
      <Card
        label="Falha"
        helpText="Tentativas mal-sucedidas podem ocorrer porque o e-mail do alvo está incorreto ou por um bloqueio do destinatário."
        value={`${Math.round(eventsDropped?.total ? (eventsDropped?.total / eventsProcessed?.total) * 100 : 0)}%`}
      />
    </>
  );
}

export default EventsCards;