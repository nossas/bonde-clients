import React from "react";
import { useQuery, gql } from "bonde-core-tools";
import { Text } from "bonde-components";
import { Widget } from "../../FetchWidgets";
import Card, { CardProps } from "./Card";

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

interface CardIsLoadingProps extends Omit<CardProps, "value"> {
  data: any
  acessor: any
  render: any
}

const CardIsLoading: React.FC<CardIsLoadingProps> = ({
  label,
  helpText,
  data,
  isLoading,
  acessor,
  render
}) => {
  if (isLoading) {
    return (
      <Card
        label={label}
        helpText={helpText}
        isLoading={isLoading}
        value={0}
      />
    );
  }
  const events = acessor(data);

  return (
    <Card
      label={label}
      helpText={helpText}
      value={render(events)}
    />
  );
}

const EventsCards: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = useQuery(ACTIVITY_FEED_TOTAL_GQL, {
    variables: {
      widgetId: widget.id
    }
  });

  // if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.log("EventsCards: ", error);
    return <Text>Failed!</Text>;
  }

  const processed = (data: any) => data?.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "processed")[0];
  const dropped = (data: any) => data?.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "dropped")[0];
  const bounce = (data: any) => data?.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "bounce")[0];
  const delivered = (data: any) => data?.activity_feed_total.events.filter((evt: ActivityFeedEvent) => evt.event_type === "delivered")[0];

  return (
    <>
      <CardIsLoading
        label="Emails enviados"
        helpText={`
          O total de emails enviados varia de acordo com o número de pressões realizadas, a quantidade de alvos e se o envio otimizado está ativado ou não.

          Captura de eventos começou a partir de ${!loading ? new Date(data.activity_feed_total.min_timestamp).toLocaleString() : 0};
        `}
        data={data}
        isLoading={loading}
        acessor={processed}
        render={(eventsProcessed: any) => eventsProcessed?.total}
      />
      <CardIsLoading
        label="Entregues"
        data={data}
        isLoading={loading}
        acessor={(data: any) => ({
          eventsProcessed: processed(data),
          eventsDelivered: delivered(data)
        })}
        render={({ eventsProcessed, eventsDelivered }: any) => {
          const value = Math.round(eventsDelivered?.total ? (eventsDelivered?.total / eventsProcessed?.total) * 100 : 0);
          return `${value > 100 ? "100" : value}%`;
        }}
      />
      <CardIsLoading
        label="Bounce"
        data={data}
        isLoading={loading}
        acessor={(data: any) => ({
          eventsProcessed: processed(data),
          eventsBounce: bounce(data)
        })}
        render={({ eventsProcessed, eventsBounce }: any) => `${Math.round(eventsBounce?.total ? (eventsBounce?.total / eventsProcessed?.total) * 100 : 0)}%`}
      />
      <CardIsLoading
        label="Falha"
        helpText="Tentativas mal-sucedidas podem ocorrer porque o e-mail do alvo está incorreto ou por um bloqueio do destinatário."
        data={data}
        isLoading={loading}
        acessor={(data: any) => ({
          eventsProcessed: processed(data),
          eventsDropped: dropped(data)
        })}
        render={({ eventsProcessed, eventsDropped }: any) => `${Math.round(eventsDropped?.total ? (eventsDropped?.total / eventsProcessed?.total) * 100 : 0)}%`}
      />
    </>
  );
}

export default EventsCards;