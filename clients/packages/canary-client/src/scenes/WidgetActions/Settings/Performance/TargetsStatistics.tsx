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

interface Props {
  aggregateEmails: ActivityFeedEmail[]
  activeTargets: string[]
}

interface ActivityFeedEmailWithDisabled extends ActivityFeedEmail {
  disabled: boolean
}

const TargetsStatistics: React.FC<Props> = ({ aggregateEmails, activeTargets }) => {
  const activeEmails = activeTargets.map((target) => (target.match(/^[\w ]+<([\w.@]+)>$/) || [])[1]);

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
          {aggregateEmails
            .map((activityFeed: ActivityFeedEmail) => ({
              ...activityFeed,
              disabled: activeEmails.findIndex((email) => email === activityFeed.email) === -1
            }))
            .sort((a) => a.disabled ? 1 : -1)
            .map((activityFeed: ActivityFeedEmailWithDisabled, index: number) => {
              const processed = activityFeed
                .events
                .filter((evt) => evt.eventType === "processed" || evt.eventType === "dropped")
                .map((evt) => evt.total)
                .reduce((a, b) => a + b, 0)
              ;
              
              const delivered = activityFeed.events.filter(evt => evt.eventType === "delivered")[0];
              const deliveredPercentage = delivered?.total ? Math.round((delivered.total / processed) * 100) : 0;
              
              return (
                <Tr key={`activity-feed-${index}`} color={activityFeed.disabled ? "gray.300" : "inherit"}>
                  <Td>{activityFeed.email}</Td>
                  <Td>{`${processed} envios`}</Td>
                  <Td color={!activityFeed.disabled && deliveredPercentage === 0 ? "red.300" : "inherit"}>
                    {`${deliveredPercentage}% entregue`}
                  </Td>
                  <Td>
                    <OpenedLabel activityFeed={activityFeed} />
                  </Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </Stack>
  );
}

export default TargetsStatistics;
