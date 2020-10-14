import React from "react";
import { Navigation, Tab, Header as Heading } from "bonde-components";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const StyledNavigation = styled(Navigation)`
  & > a {
    color: inherit;
    text-decoration: none;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  padding: 0px 60px;
`;

const Header = (): React.ReactElement => {
  return (
    <Wrap>
      <Heading.H3 style={{ color: "#fff" }}>Redes</Heading.H3>
      <StyledNavigation>
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
        <Link to="/pessoas">
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
        <Link to="/matchs">
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
      </StyledNavigation>
    </Wrap>
  );
};

export default Header;
