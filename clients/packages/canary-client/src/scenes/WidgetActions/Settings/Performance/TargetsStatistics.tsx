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
  const openingCount = activityFeed.events.filter((evt) => evt.eventType === "open").length
  const isOpened = openingCount > 0;

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
        {isOpened ? `Abriu ${openingCount}x` : "Não abriu"}
      </Button>
    </Tooltip>
  )
}

const FailedLabel: React.FC<{ activityFeed: ActivityFeedEmail }> = ({ activityFeed }) => {
  const isFailed = activityFeed.events.filter((evt) => evt.eventType === "bounce").length > 0;
  const isDropped = activityFeed.events.filter((evt) => evt.eventType === "dropped").length > 0;

  if (isFailed) {
    return (
      <Tooltip
        label="O e-mail do alvo está incorreto ou a caixa de entrada dele está cheia. Confira o e-mail do alvo para conseguir pressioná-lo."
        maxW="220px"
      >
        <Button variant="tag" bg="red.100">
          Falhou
        </Button>
      </Tooltip>
    )
  }

  if (isDropped) {
    return (
      <Tooltip
        label="O e-mail do alvo está correto, mas foi bloqueado porque ele se desinscreveu ou porque muitos emails foram marcados como spam."
        maxW="220px"
      >
        <Button variant="tag" bg="red.100">
          Bloqueou
        </Button>
      </Tooltip>
    )
  } else {
    return null
  }
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
  const targetsCount = aggregateEmails.length

  return (
    <Stack spacing={4}>
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase"
      >
        Todos os alvos ({targetsCount})
      </Heading>
      <Table variant="simple" bg="white">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Enviados</Th>
            <Th>Entregues</Th>
            <Th>Falha</Th>
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
                    <FailedLabel activityFeed={activityFeed} />
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
