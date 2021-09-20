import React from "react";
import { gql, useQuery } from "bonde-core-tools";
import {
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button
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

type Props = {
  widgetId: number
  offset?: number
}

const EVENTS_TYPES = [
  "deferred",
  "bounce",
  "open",
  "delivered",
  "processed",
  "dropped"
]

const TargetsStatistics: React.FC<Props> = ({ widgetId, offset }) => {
  const { data, loading, errors, fetchMore } = useQuery(ACTIVITY_FEED_GQL, {
    variables: {
      widgetId,
      offset: offset
    }
  });

  if (loading) return <p>Carregando...</p>;
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
      <Heading as="h5" size="sm" color="gray.300" textTransform="uppercase">Todos os alvos</Heading>
      <Table variant="simple" bg="white">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th isNumeric>Enviados</Th>
            {EVENTS_TYPES.map((label) => (<Th key={label} isNumeric>{label}</Th>))}
          </Tr>
        </Thead>
        <Tbody>
          {data.activity_feed.data.map((activityFeed: any, index: number) => (
            <Tr key={`activity-feed-${index}`}>
              <Td>{activityFeed.email}</Td>
              <Td isNumeric>{activityFeed.total}</Td>
              {EVENTS_TYPES.map((eventType: string, index: number) => {
                const event = activityFeed.events.filter((evt: any) => evt.event_type === eventType)[0]

                if (event) {
                  return <Td key={index} isNumeric>{event.total}</Td>
                }
                return <Td key={index} isNumeric>0</Td>
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        disabled={data.activity_feed.data.length % (offset as any) > 0}
        variant="link"
        colorScheme="gray"
        onClick={onLoadMore}
      >
        Carregar mais
      </Button>
    </Stack>
  );
}

TargetsStatistics.defaultProps = {
  offset: 10
}

export default TargetsStatistics;