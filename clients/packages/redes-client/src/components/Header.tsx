import React from "react";
import { Tab } from "bonde-components";
import { Flex, Heading, Stack } from "bonde-components/chakra"
import { Link, useRouteMatch } from "react-router-dom";
import { useFilterDispatch } from "../services/FilterProvider"

const Header = (): React.ReactElement => {
  const dispatch = useFilterDispatch()
  return (
    <Stack
      bgColor="black"
      padding="0 60px"
      spacing={4}
    >
      <Heading
        as="h2"
        size="xl"
        color="white"
      >
        Redes
      </Heading>

      <Flex>
        <Link to="/">
          <Tab
            active={
              !!useRouteMatch({
                path: "/",
                exact: true,
              })
            }
          >
            Início
          </Tab>
        </Link>
        <Link
          to="/pessoas"
          onClick={() => dispatch({
            type: "order_by",
            value: [{ created_at: 'asc' }]
          })}
        >
          <Tab
            active={
              !!useRouteMatch({
                path: "/pessoas",
                exact: false,
              })
            }
          >
            Pessoas
          </Tab>
        </Link>
        <Link to="/matches">
          <Tab
            active={
              !!useRouteMatch({
                path: "/matches",
                exact: false,
              })
            }
          >
            Relações
          </Tab>
        </Link>
        <Link to="/configuracoes/match">
          <Tab
            active={
              !!useRouteMatch({
                path: "/configuracoes/match",
                exact: false,
              })
            }
          >
            Configurações
          </Tab>
        </Link>
      </Flex>
    </Stack>
  )
}

export default Header;
