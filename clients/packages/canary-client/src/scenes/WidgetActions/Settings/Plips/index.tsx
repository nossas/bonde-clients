import React from "react";
import { Box, Button, Stack, Text, Flex, SimpleGrid } from "bonde-components";
// import { useQuery, gql } from "bonde-core-tools";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../../../../components/CardWithHeader";
import type { Widget } from "../../FetchWidgets";

// const PLIP_QUERY = gql`
//   query ($widget_id: Int!) {
//     plips(where: { widget_id: { _eq: $widget_id } }) {
//       id
//       widget_id
//       form_data
//       pdf_data
//       unique_identifier
//     }
//   }
// `;

interface Properties {
  widget: Widget
}

// interface Plip {
//   id: number;
//   widget_id: number;
//   form_data: any;
//   pdf_data: string;
//   unique_identifier: string;
// }

interface Props {
  value: string;
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

const PlipsHomeScene: React.FC<Properties> = ({ widget }) => {
  const { pathname } = useLocation();
  console.log("widget", widget);
  // const { data, loading, error } = useQuery(PLIP_QUERY, { variables: { widget_id: widget.id } });

  // return loading ? (
  //   <Text>Carregando formulários PLIP</Text>
  // ) : error ? (
  //   <Text color="red">{JSON.stringify(error)}</Text>
  // ) : (
  //   <Stack spacing={4}>
  //     <Heading as="h2">Formulários gerados:</Heading>
  //     <Stack spacing={2}>
  //       {data.plips.map((p: Plip) =>
  //         <a key={p.unique_identifier} href={p.pdf_data} download={`plip-formulario-${p.unique_identifier}.pdf`}>
  //           <Text>{p.unique_identifier}</Text>
  //         </a>
  //       )}
  //     </Stack>
  //   </Stack>
  // );

  return (
    <Stack spacing={4}>
      <SimpleGrid columns={[2]} gap={[4]}>
        <Stack>
          <Header label="Total assinaturas" />
          <Flex bg="white" p={4} minH="105px" align="end">
            <ValueWithLabel
              variant="lg"
              value="12.348"
              label="5% da meta"
            />
          </Flex>
        </Stack>
        <Stack>
          <Header label="Pendentes" />
          <Flex bg="white" p={4} minH="105px" align="end">
            <ValueWithLabel
              variant="lg"
              value="5.244"
              label="12% da meta"
            />
          </Flex>
        </Stack>
      </SimpleGrid>
      <Stack>
        <Header label="Total por estado" />
        <Box bg="white" minH="200px" />
      </Stack>
      <Stack>
        <Header label="Ativistas" />
        <Stack bg="white" px={4} py={6} spacing={4}>
          <ValueWithLabel
            variant="lg"
            value="51.452"
            label="Total de inscritos"
          />
          <Flex direction="row" justify="space-between">
            <ValueWithLabel value="32%" label="Inscritos" />
            <ValueWithLabel value="54%" label="Concluídos" />
            <ValueWithLabel value="14%" label="Pendentes" />
          </Flex>
        </Stack>
      </Stack>
      <Button minH="42px" as={Link} to={pathname + "/qr"}>Atualizar ficha</Button>
    </Stack>
  )
}

export default PlipsHomeScene;