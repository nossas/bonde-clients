import React from "react";
import { Box, Button, Stack, Table, Tbody, Tr, Td, Text, Flex, SimpleGrid } from "bonde-components";
import { Link, useLocation } from "react-router-dom";

import { Header } from "../../../../components/CardWithHeader";
import type { Widget } from "../../FetchWidgets";
import { usePerformanceQuery } from "./performance/fetchData";
import eleitorado from "./performance/eleitorado";

interface Properties {
  widget: Widget
}

interface Props {
  value: string | number;
  label: string;
  variant?: "lg" | "md"
}

const ValueWithLabel: React.FC<Props> = ({ value, label, variant = "md" }) => variant === "lg" ? (
  <Box>
    <Text
      color="black"
      fontWeight="extrabold"
      fontSize="4xl"
      lineHeight={1}
    >
      {value}
    </Text>
    <Text>{label}</Text>
  </Box>
) : (
  <Box>
    <Text
      color="black"
      fontWeight="bold"
      fontSize="2xl"
    >
      {value}
    </Text>
    <Text textTransform="uppercase" fontSize="sm">{label}</Text>
  </Box>
)

const percentage = (value = 0, total = 0) => (value * 100) / total;

const PerformanceScene: React.FC<Properties> = ({ widget }) => {
  const { pathname } = useLocation();
  const { data, loading, error } = usePerformanceQuery(widget.id)

  if (loading) return <Text>Carregando dados de performance</Text>;
  if (error) return <Text color="red">{JSON.stringify(error)}</Text>;

  return (
    <Stack spacing={4}>
      <SimpleGrid columns={[2]} gap={[4]}>
        <Stack>
          <Header label="Total assinaturas" />
          <Flex bg="white" p={4} minH="105px" align="end">
            <ValueWithLabel
              variant="lg"
              value={data?.confirmed_signatures || "0"}
              label={`${percentage(data?.confirmed_signatures, eleitorado.total * eleitorado.goal.total)}% da meta`}
            />
          </Flex>
        </Stack>
        <Stack>
          <Header label="Pendentes" />
          <Flex bg="white" p={4} minH="105px" align="end">
            <ValueWithLabel
              variant="lg"
              value={data?.pending_signatures || "0"}
              label={`${percentage(data?.pending_signatures, eleitorado.total * eleitorado.goal.total)}% da meta`}
            />
          </Flex>
        </Stack>
      </SimpleGrid>
      <Stack>
        <Header label="Total por estado" />
        <Box bg="white">
          <Table>
            <Tbody>
            {data?.states_signatures.filter((ss) => !!ss.state).sort((a, b) => a.confirmed_signatures - b.confirmed_signatures).splice(0, 5).map((ss) => (
              <Tr>
                <Td>{ss.state}</Td>
                <Td>{ss.confirmed_signatures || "0"}</Td>
                <Td>{`${percentage(ss.confirmed_signatures, eleitorado.states[ss.state] * eleitorado.goal.state)}%`}</Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
      <Stack>
        <Header label="Ativistas" />
        <Stack bg="white" px={4} py={6} spacing={4}>
          <ValueWithLabel
            variant="lg"
            value={data?.total_subscribers || "0"}
            label="Total de inscritos"
          />
          <Flex direction="row" justify="space-between">
            <ValueWithLabel value={`XX%`} label="Inscritos" />
            <ValueWithLabel value={`${percentage(data?.confirmed_subscribers, data?.total_subscribers)}%`} label="Concluídos" />
            <ValueWithLabel value={`${percentage(data?.pending_subscribers, data?.total_subscribers)}%`} label="Pendentes" />
          </Flex>
        </Stack>
      </Stack>
      <Button minH="42px" as={Link} to={pathname + "/workflow"}>Atualizar ficha</Button>
    </Stack>
  )
}

export default PerformanceScene;