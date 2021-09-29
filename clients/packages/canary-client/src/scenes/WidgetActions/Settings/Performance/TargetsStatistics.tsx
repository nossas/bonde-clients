import React from "react";
import {
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tooltip
} from "bonde-components";
import { ActivityFeedEmail } from "./hooks/usePerformance";

const OpenedLabel: React.FC<{ activityFeed: ActivityFeedEmail }> = ({ activityFeed }) => {
  const isOpened = activityFeed.events.filter((evt) => evt.eventType === "open").length > 0;

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

const DeliveredLabel: React.FC<{ activityFeed: ActivityFeedEmail }> = ({ activityFeed }) => {
  const processed = activityFeed
    .events
    .filter((evt) => evt.eventType === "processed" || evt.eventType === "dropped")
    .map((evt) => evt.total)
    .reduce((a, b) => a + b, 0)
  ;

  const delivered = activityFeed.events.filter(evt => evt.eventType === "delivered")[0];

  const valor = delivered?.total ? Math.round((delivered.total / processed) * 100) : 0;

  return (
    <span>
      {`${valor > 100 ? 100 : valor}% entregue`}
    </span>
  );
}

const ProcessedLabel: React.FC<{ activityFeed: ActivityFeedEmail }> = ({ activityFeed }) => {
  const processed = activityFeed
    .events
    .filter((evt) => evt.eventType === "processed" || evt.eventType === "dropped")
    .map((evt) => evt.total)
    .reduce((a, b) => a + b, 0)
  ;

  return (
    <span>
      {`${processed} envios`}
    </span>
  );
}

interface Props {
  aggregateEmails: ActivityFeedEmail[]
}

const TargetsStatistics: React.FC<Props> = ({ aggregateEmails }) => (
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
    <Table variant="simple" bg="white">
      <Thead>
        <Tr>
          <Th>Email</Th>
          <Th>Enviados</Th>
          <Th>Entregues</Th>
          <Th>Abertura</Th>
        </Tr>
      </Thead>
      <Tbody>
        {aggregateEmails.map((activityFeed: ActivityFeedEmail, index: number) => (
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Stack>
);

export default TargetsStatistics;
