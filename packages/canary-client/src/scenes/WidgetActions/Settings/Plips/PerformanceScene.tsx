import React from "react";
import {
  Box,
  Button,
  Stack,
  Grid,
  GridItem,
  Text,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "bonde-components/chakra";
import { Link, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { Header } from "../../../../components/CardWithHeader";
import type { Widget } from "../../FetchWidgets";

import Chart from "./Chart";
import MenuActions from "./components/MenuActions";
import { percentage } from "./components/Percent";
import { usePerformanceQuery } from "./performance/fetchData";
import SignatureByStateGadget from "./SignatureByStateGadget";
import Eleitorado from "./SignatureByStateGadget/Eleitorado";
import PlipsFormTable from "./datatable/TableView";
import SignaturesTableView from "./datatable/SignaturesTableView";

interface Properties {
  widget: Widget;
}

interface Props {
  value: string | number;
  label: string;
  variant?: "lg" | "md";
}

const ValueWithLabel: React.FC<Props> = ({ value, label, variant = "md" }) =>
  variant === "lg" ? (
    <Box>
      <Text
        color="black"
        fontWeight="extrabold"
        fontSize="4xl"
        lineHeight={[1.3, null, null, null, 1]}
      >
        {value}
      </Text>
      <Text>{label}</Text>
    </Box>
  ) : (
    <Box>
      <Text color="black" fontWeight="bold" fontSize="2xl">
        {value}
      </Text>
      <Text fontSize="sm">{label}</Text>
    </Box>
  );

const PerformanceScene: React.FC<Properties> = ({ widget }) => {
  const { pathname } = useLocation();
  const { data, loading, error } = usePerformanceQuery(widget.id, isMobile);

  if (loading) return <Text>Carregando dados de performance</Text>;
  if (error) return <Text color="red">{JSON.stringify(error)}</Text>;

  return (
    <>
      <Stack
        spacing={4}
        overflowY={isMobile ? "auto" : undefined}
        mb={isMobile ? "75px" : undefined}
      >
        <Grid
          templateColumns={["repeat(2, 1fr)", null, "repeat(7, 1fr)"]}
          gap={4}
        >
          <GridItem colSpan={1}>
            <Stack>
              <Header
                label="Total assinaturas"
                helpText="Total de assinaturas entregues e registradas pela equipe."
              />
              <Flex bg="white" p={4} minH="131px" align="flex-end">
                <ValueWithLabel
                  variant="lg"
                  value={data?.confirmed_signatures || "0"}
                  label={`${percentage(
                    data?.confirmed_signatures,
                    Eleitorado.total * Eleitorado.goal.total
                  )}% da meta`}
                />
              </Flex>
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack>
              <Header
                label="Pendentes"
                helpText="Total de assinaturas geradas que ainda não foram entregues e registradas pela equipe."
              />
              <Flex bg="white" p={4} minH="131px" align="flex-end">
                <ValueWithLabel
                  variant="lg"
                  value={data?.pending_signatures || "0"}
                  label={`${percentage(
                    data?.pending_signatures,
                    Eleitorado.total * Eleitorado.goal.total
                  )}% da meta`}
                />
              </Flex>
            </Stack>
          </GridItem>
          <GridItem colSpan={2} rowSpan={2}>
            <SignatureByStateGadget
              isMobile={isMobile}
              signatureByState={data?.states_signatures || []}
            />
          </GridItem>
          {!isMobile && (
            <GridItem colSpan={3} rowSpan={2}>
              <Chart
                subscribers={data?.subscribers_range}
                start={data?.subscribers_range_start}
                end={data?.subscribers_range_end}
              />
            </GridItem>
          )}
          <GridItem colSpan={2}>
            <Stack flex={1} height="100%">
              <Header label="Ativistas" />
              <Stack
                bg="white"
                px={4}
                py={6}
                spacing={4}
                flex={1}
                height="100%"
                justifyContent="space-around"
              >
                <ValueWithLabel
                  variant="lg"
                  value={data?.total_subscribers || "0"}
                  label="Total de inscritos"
                />
                <Flex direction="row" justify="space-between">
                  <ValueWithLabel
                    value={`${Math.round(
                      percentage(
                        data?.confirmed_subscribers,
                        data?.total_subscribers
                      )
                    )}%`}
                    label="Concluídos"
                  />
                  <ValueWithLabel
                    value={`${Math.round(
                      percentage(
                        (data?.total_subscribers || 0) -
                          (data?.pending_subscribers || 0) -
                          (data?.confirmed_subscribers || 0),
                        data?.total_subscribers
                      )
                    )}%`}
                    label="Inscritos"
                  />
                  <ValueWithLabel
                    value={`${Math.round(
                      percentage(
                        data?.pending_subscribers,
                        data?.total_subscribers
                      )
                    )}%`}
                    label="Pendentes"
                  />
                </Flex>
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
        {!isMobile && (
          <Tabs>
            <TabList style={{ fontWeight: 800 }}>
              <Tab
                fontSize="sm"
                _focus={{
                  boxShadow: "none",
                }}
                _selected={{
                  color: "pink.200",
                  borderBottom: "2px solid",
                  borderColor: "pink.200",
                  borderBottomHeight: "1px",
                }}
                _hover={{
                  color: "gray.400",
                }}
              >
                FICHAS ENTREGUES
              </Tab>
              <Tab
                fontSize="sm"
                _focus={{
                  boxShadow: "none",
                }}
                _selected={{
                  color: "pink.200",
                  borderBottom: "2px solid",
                  borderColor: "pink.200",
                  borderBottomHeight: "2px",
                }}
                _hover={{
                  color: "gray.400",
                }}
              >
                INSCRIÇÕES
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SignaturesTableView widgetId={widget.id} />
              </TabPanel>
              <TabPanel>
                <PlipsFormTable widgetId={widget.id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Stack>
      {isMobile && (
        <MenuActions>
          <Button
            minH="42px"
            as={Link}
            to={`${pathname}/workflow?count=${data?.confirmed_signatures || 0}`}
          >
            Atualizar ficha
          </Button>
        </MenuActions>
      )}
    </>
  );
};

export default PerformanceScene;
