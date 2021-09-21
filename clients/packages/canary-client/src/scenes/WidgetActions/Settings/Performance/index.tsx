import React from "react";
import { Stack } from "bonde-components";
import TargetsStatistics from "./TargetsStatistics";
import { Widget } from "../../FetchWidgets";
import Card from "./Card";
import PressureCountCard from "./PressureCountCard";
import EventsCards from "./EventsCards";

const CARDS_LABELS = [
  // "Pressões",
  "Alvos",
  // "Envios totais",
  // "Entregues",
  // "SPAM",
  // "Falha"
]

type Props = {
  widget: Widget
}

const PerformanceScene: React.FC<Props> = ({ widget }) => {

  return (
    <Stack spacing={6} mt={4}>
      <Stack direction="row" spacing={4}>
        <PressureCountCard widget={widget} />
        {CARDS_LABELS.map((label: string, index: number) => (
          <Card
            key={`card-item-${index}`}
            label={label}
            value={label === "Alvos" ? widget.settings.targets?.length : Math.round(Math.random() * 100000)}
          />
        ))}
        <EventsCards widget={widget} />
      </Stack>
      <TargetsStatistics widgetId={widget.id} />
    </Stack>
  );
}

export default PerformanceScene;
