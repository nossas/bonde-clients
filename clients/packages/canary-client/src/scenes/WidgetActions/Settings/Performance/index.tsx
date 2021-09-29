import React from "react";
import { Stack, Loading } from "bonde-components";
import TargetsStatistics from "./TargetsStatistics";
import { Widget } from "../../FetchWidgets";
import EventsCards from "./EventsCards";
import BondePressureCards from "./BondePressureCards";
import DisclaimerRelease from "./DisclaimerRelease";
import usePerformance from "./hooks/usePerformance";

type Props = {
  widget: Widget
}

const PerformanceScene: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = usePerformance({ widget });
  
  if (loading) return <Loading />;
  if (error) return <span>Failed</span>;
  
  const {
    firstEventTimestamp,
    widgetCreatedAt,
    aggregateEvents,
    aggregateEmails,
    pressuresCount,
    targetsCount
  }: any = data;

  const hasntEventHistory = firstEventTimestamp > widgetCreatedAt && aggregateEvents.length === 0;

  return (
    <Stack spacing={6} mt={4}>
      {!hasntEventHistory && (
        <DisclaimerRelease
          firstEventTimestamp={firstEventTimestamp}
          widgetCreatedAt={widgetCreatedAt}
        />
      )}
      <Stack direction="row" spacing={4}>
        <BondePressureCards targetsCount={targetsCount} pressuresCount={pressuresCount} />
        {!hasntEventHistory && (
          <EventsCards aggregateEvents={aggregateEvents} />
        )}
      </Stack>
      <TargetsStatistics aggregateEmails={aggregateEmails} />
    </Stack>
  );
}

export default PerformanceScene;
