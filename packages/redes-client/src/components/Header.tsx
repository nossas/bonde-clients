import React from "react";
import { Navigation, Tab } from "bonde-components";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const StyledNavigation = styled(Navigation)`
  padding: 0 45px;
  & > a {
    color: inherit;
    text-decoration: none;
  }
  justify-items: center;
`;
const Header = () => {
  return (
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
      <Link to="/users">
        <Tab
          active={
            !!useRouteMatch({
              path: "/users",
              exact: false,
            })
          }
        >
          Pessoas
        </Tab>
      </Link>
      <Link to="/relations">
        <Tab
          active={
            !!useRouteMatch({
              path: "/relations",
              exact: false,
            })
          }
        >
          Relações
        </Tab>
      </Link>
    </StyledNavigation>
  );
};

export default Header;
