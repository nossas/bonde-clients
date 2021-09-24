import React from "react";
import { gql, useQuery } from "bonde-core-tools";
import {
  // Box,
  Heading,
  Stack,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tooltip
} from "bonde-components";

const ACTIVITY_FEED_GQL = gql`
  query activity_feed ($widgetId: Int!, $offset: Int!, $after: String) {
    activity_feed(filter: { widget_id: $widgetId, offset: $offset, after: $after }) {
      data {
        email
        total
        events {
          total
          event_type
        }
      }
      after
    }
  }
`;

type ActivityFeed = {
  email: string
  total: number
  events: {
    total: number
    event_type: string
  }[]
}

type Props = {
  widgetId: number
  offset?: number
}

// const EVENTS_TYPES = [
//   "deferred",
//   "bounce",
//   "open",
//   "delivered",
//   "processed",
//   "dropped",
//   "blocked",
//   "click",
//   "spamreport"
// ]

const OpenedLabel: React.FC<{ activityFeed: ActivityFeed }> = ({ activityFeed }) => {
  const isOpened = activityFeed.events.filter((evt) => evt.event_type === "open").length > 0;

  return (
    <Tooltip
      label={
        isOpened
          ? "O alvo recebeu os e-mails e abriu ao menos um deles."
          : "O alvo recebeu os e-mails, mas não abriu nenhum deles."
      }
      maxW="220px"
    >
      <Button variant="tag" colorScheme={isOpened ? "green" : "yellow"}>
        {isOpened ? "Abriu" : "Não abriu"}
      </Button>
    </Tooltip>
  )
}

const DeliveredLabel: React.FC<{ activityFeed: ActivityFeed }> = ({ activityFeed }) => {
  const processed = activityFeed.events.filter((evt) => evt.event_type === "processed")[0];
  const delivered = activityFeed.events.filter(evt => evt.event_type === "delivered")[0];

  const valor = delivered?.total ? Math.round((delivered.total / processed.total) * 100) : 0;

  return (
    <span>
      {`${valor > 100 ? 100 : valor}% entregue`}
    </span>
  );
}

const ProcessedLabel: React.FC<{ activityFeed: ActivityFeed }> = ({ activityFeed }) => {
  const processed = activityFeed.events.filter((evt) => evt.event_type === "processed")[0];
  return (
    <span>
      {`${processed?.total || 0} envios`}
    </span>
  );
}

const TargetsStatistics: React.FC<Props> = ({ widgetId, offset }) => {
  const { data, loading, errors, fetchMore } = useQuery(ACTIVITY_FEED_GQL, {
    variables: {
      widgetId,
      offset: offset
    }
  });

  // if (loading) return <p>Carregando...</p>;
  if (errors) {
    console.log("errors", errors);
    return <p>Error!</p>;
  }

  const onLoadMore = () => {
    fetchMore({
      variables: {
        widgetId,
        offset: offset,
        after: data.activity_feed.after
      }
    });
  };

  return (
    <Stack spacing={4}>
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase"
      >
        Todos os alvos
      </Heading>
      <Skeleton isLoaded={!loading} color="gray.50">
        <Table variant="simple" bg="white">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Enviados</Th>
              <Th>Entregues</Th>
              <Th>Abertura</Th>
              {/* {EVENTS_TYPES.map((label) => (<Th key={label} isNumeric>{label}</Th>))} */}
            </Tr>
          </Thead>
          <Tbody>
            {data?.activity_feed.data.map((activityFeed: ActivityFeed, index: number) => (
              <Tr key={`activity-feed-${index}`}>
                <Td>{activityFeed.email}</Td>
                <Td>
                  <ProcessedLabel activityFeed={activityFeed} />
                </Td>
                <Td>
                  <DeliveredLabel activityFeed={activityFeed} />
                </Td>
                <Td>
                  <OpenedLabel activityFeed={activityFeed} />
                </Td>
                {/* {EVENTS_TYPES.map((eventType: string, index: number) => {
                  const event = activityFeed.events.filter((evt: any) => evt.event_type === eventType)[0]

                  if (event) {
                    return <Td key={index} isNumeric>{event.total}</Td>
                  }
                  return <Td key={index} isNumeric>0</Td>
                })} */}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          disabled={data?.activity_feed.data.length % (offset as any) > 0}
          variant="link"
          colorScheme="gray"
          isFullWidth
          onClick={onLoadMore}
          py={4}
        >
          Carregar mais
        </Button>
      </Skeleton>
    </Stack>
  );
}

TargetsStatistics.defaultProps = {
  offset: 10
}

export default TargetsStatistics;
