import React from "react";
import Card from "./Card";
import { ActivityFeedEvent } from "./hooks/usePerformance";

type Props = {
  aggregateEvents: ActivityFeedEvent[]
}

const EventsCards: React.FC<Props> = ({ aggregateEvents }) => {
  const processed: number = aggregateEvents
    .filter((evt: ActivityFeedEvent) => evt.eventType === "processed" || evt.eventType === "dropped")
    .map((evt: ActivityFeedEvent) => evt.total)
    .reduce((a: number, b: number) => a + b, 0);

  // Filter events
  const dropped: ActivityFeedEvent | undefined = aggregateEvents.filter((evt: ActivityFeedEvent) => evt.eventType === "dropped")[0];
  const bounce: ActivityFeedEvent | undefined = aggregateEvents.filter((evt: ActivityFeedEvent) => evt.eventType === "bounce")[0];
  const delivered: ActivityFeedEvent | undefined = aggregateEvents.filter((evt: ActivityFeedEvent) => evt.eventType === "delivered")[0];

  // Parse events to percentage
  const droppedPercetage: number = Math.round(dropped?.total ? (dropped?.total / processed) * 100 : 0);
  const bouncePercentage: number = Math.round(bounce?.total ? (bounce?.total / processed) * 100 : 0);
  const deliveredPercentage: number = Math.round(delivered?.total ? (delivered?.total / processed) * 100 : 0);

  return (
    <>
      <Card
        label="Emails enviados"
        helpText="O total de emails enviados varia de acordo com o número de pressões realizadas, a quantidade de alvos e se o envio otimizado está ativado ou não."
        value={processed}
      />
      <Card
        label="Entregues"
        helpText="O total de emails que chegaram com sucesso na caixa dos alvos."
        value={`${deliveredPercentage}%`}
      />
      <Card
        label="Bloqueados"
        helpText="O e-mail do alvo está correto, mas foi bloqueado porque ele se desinscreveu ou porque muitos emails foram marcados como spam."
        value={`${droppedPercetage}%`}
      />
      <Card
        label="Falhas"
        helpText="O famoso bounce! Ocorre porque o e-mail do alvo está incorreto ou porque a caixa de entrada dele está cheia."
        value={`${bouncePercentage}%`}
      />
    </>
  );
}

export default EventsCards;
