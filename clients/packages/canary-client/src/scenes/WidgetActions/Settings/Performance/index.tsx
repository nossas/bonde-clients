import React from "react";
import { Stack } from "bonde-components";
import TargetsStatistics from "./TargetsStatistics";
import { Widget } from "../../FetchWidgets";
import EventsCards from "./EventsCards";
import BondePressureCards from "./BondePressureCards";

type Props = {
  widget: Widget
}

// Widget.settings.pressureType possui dois tipos: unique e group
// Quando o tipo é 'unique' os alvos estarão salvos no atributo widget.settings.targets
// Quando o tipo é 'group' os alvos estarão salvos na tabela pressure_targets

const PerformanceScene: React.FC<Props> = ({ widget }) => {
  console.log('Widget:', { widget })
  return (
    <Stack spacing={6} mt={4}>
      <Stack direction="row" spacing={4}>
        <BondePressureCards widget={widget} />


        <EventsCards widget={widget} />
      </Stack>

      <TargetsStatistics widgetId={widget.id} />
    </Stack>
  );
}

export default PerformanceScene;
