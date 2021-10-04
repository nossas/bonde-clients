import React from "react";
import { Stack, Skeleton, Flex } from "bonde-components";
import TargetsStatistics from "./TargetsStatistics";
import { Widget } from "../../FetchWidgets";
import EventsCards from "./EventsCards";
import BondePressureCards from "./BondePressureCards";
import DisclaimerRelease from "./DisclaimerRelease";
import usePerformance from "./hooks/usePerformance";
import Card from "./Card";

type Props = {
  widget: Widget
}

const PerformanceScene: React.FC<Props> = ({ widget }) => {
  const { data, loading, error } = usePerformance({ widget });

  if (error) return <span>Failed</span>;

  if (loading || !data) {
    return (
      <Stack spacing={12}>
        <Stack direction="row" spacing={4}>
          {[1, 2, 3, 4, 5, 6].map(id => (
            <Skeleton key={id} isLoading startColor="gray.50" endColor="gray.100">
              <Card />
            </Skeleton>))}
        </Stack>

        <Skeleton isLoading startColor="gray.50" endColor="gray.100">
          <Flex minH="131px" w="100%" />
        </Skeleton>
      </Stack>
    )
  }

  const {
    firstEventTimestamp,
    widgetCreatedAt,
    aggregateEvents,
    aggregateEmails,
    pressuresCount,
    activeTargets
  } = data;

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
        <BondePressureCards targetsCount={activeTargets.length} pressuresCount={pressuresCount} />
        {!hasntEventHistory && (
          <EventsCards aggregateEvents={aggregateEvents} />
        )}
      </Stack>
      <TargetsStatistics aggregateEmails={aggregateEmails} activeTargets={activeTargets} />
    </Stack>
  );
}

export default PerformanceScene;
