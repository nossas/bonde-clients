import { gql, useQuery } from "bonde-core-tools";
import { Widget } from "../../../FetchWidgets";

const PERFORMANCE_GQL = gql`
  query PerformanceQuery ($widgetId: Int!) {
    activity_feed_total(widget_id: $widgetId) {
      events {
        total
        event_type
      }
    }

    activity_feed(filter: { widget_id: $widgetId, offset: 500 }) {
      data {
        email
        total
        events {
          total
          event_type
        }
      }
    }

    activity_feed_timestamp {
      min_timestamp
    }

    activist_pressures_aggregate(where: {
      widget_id: {
        _eq: $widgetId
      }
    }) {
      aggregate {
        count
      }
    }
  }
`;

interface PerformanceArgs {
  widget: Widget
}

export interface ActivityFeedEvent {
  total: number
  eventType: string
}

export interface ActivityFeedEmail {
  email: string
  total: number
  events: ActivityFeedEvent[]
}

interface PerformanceData {
  aggregateEvents: ActivityFeedEvent[]
  aggregateEmails: ActivityFeedEmail[]
  firstEventTimestamp: Date
  widgetCreatedAt: Date
  pressuresCount: number
  activeTargets: string[]
}

interface PerformanceResult {
  data?: PerformanceData
  loading: boolean
  error: any
}

const usePerformance = ({ widget }: PerformanceArgs): PerformanceResult => {

  const { data, loading, error } = useQuery(PERFORMANCE_GQL, {
    variables: {
      widgetId: widget.id
    }
  });

  if (loading || error) {
    return { loading, error }
  }

  // Parse performance data queries
  const {
    activity_feed_total: activityFeedTotal,
    activity_feed: activityFeed,
    activity_feed_timestamp: activityFeedTimestamp,
    activist_pressures_aggregate: activistPressuresAggregate
  } = data;

  // Parse aggregate events
  const aggregateEvents: ActivityFeedEvent[] = activityFeedTotal.events.map((event: any) => ({
    total: event.total,
    eventType: event.event_type
  }));

  // Parse aggregate emails
  const aggregateEmails: ActivityFeedEmail[] = activityFeed.data.map((activityFeed: any) => ({
    email: activityFeed.email,
    total: activityFeed.total,
    events: activityFeed.events.map((event: any) => ({
      total: event.total,
      eventType: event.event_type
    }))
  }));

  // Parse first event timestamp
  const firstEventTimestamp: Date = new Date(activityFeedTimestamp.min_timestamp * 1000);

  // Parse widget created at
  const widgetCreatedAt: Date = new Date(widget.created_at);

  // Parse pressures count
  const pressuresCount: number = activistPressuresAggregate.aggregate.count;

  // Parse active targets
  let activeTargets: string[];
  if (widget.settings.pressure_type === 'unique') {
    activeTargets = typeof widget.settings.targets === "string"
      ? widget.settings.targets.split(";").filter((value) => value !== '')
      : widget.settings.targets
  } else {
    activeTargets = widget.groups
      .map((group) => group.targets)
      .reduce((previous, current) => [...previous, ...current], [])
  }

  return {
    data: {
      aggregateEvents,
      aggregateEmails,
      firstEventTimestamp,
      widgetCreatedAt,
      pressuresCount,
      activeTargets
    },
    loading,
    error
  }
}

export default usePerformance;
