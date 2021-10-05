import React from "react";
import {
  Heading,
  Stack,
  Table,
  Tbody,
  Tr,
  Td,
} from "bonde-components";
import { ActivityFeedEmail } from "./hooks/usePerformance";

interface Props {
  aggregateEmails: ActivityFeedEmail[]
  activeTargets: string[]
}

interface ActivityFeedEmailWithDisabled extends ActivityFeedEmail {
  disabled: boolean
}

const TargetsTable: React.FC<Props> = ({ aggregateEmails, activeTargets }) => {
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
        <Tbody>
          {aggregateEmails
            .map((activityFeed: ActivityFeedEmail) => ({
              ...activityFeed,
              disabled: activeEmails.findIndex((email) => email === activityFeed.email) === -1
            }))
            .sort((a) => a.disabled ? 1 : -1)
            .map((activityFeed: ActivityFeedEmailWithDisabled, index: number) => {
              return (
                <Tr key={`activity-feed-${index}`} color={activityFeed.disabled ? "gray.300" : "inherit"}>
                  <Td>{activityFeed.email}</Td>
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </Stack>
  );
}

export default TargetsTable;
