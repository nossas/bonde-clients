import React from "react";
import {
  Heading,
  Stack,
  Table,
  Tbody,
  Tr,
  Td,
} from "bonde-components";

interface Props {
  activeTargets: string[]
}

const TargetsTable: React.FC<Props> = ({ activeTargets }) => {
  const activeEmails = activeTargets.map((target) => (target.match(/^[A-zÀ-ú0-9 .]+<([\w.@]+)>$/) || [])[1]);
  const targetsCount = activeTargets.length

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
          {activeEmails
            .map((email: string, index: number) => {
              return (
                <Tr key={`activity-feed-${index}`}>
                  <Td>{email}</Td>
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
