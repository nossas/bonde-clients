import React from 'react';
// import { Container, Row, Col } from 'react-grid-system';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import {
  Header,
  Text,
  Box,
  Link as LinkStyled,
  Grid,
  GridItem
} from 'bonde-components';
import Mailchimp from './Mailchimp';
import Twilio from './Twilio';

const MenuStyled = styled.div`
  padding: 20px 0 24px;

  ${LinkStyled} {
    margin-right: 15px;
    text-transform: uppercase;
    font-weight: bold;
    color: #424242;
    border: none;
    outline: none;
  }
  ${LinkStyled}.active {
    color: #EE0099;
  }
`;

const SettingsPage = () => {
  const { name }: any = useParams();
  const { path } = useRouteMatch();

  return (
    <Box bg="white" boxShadow="sm" p={6}>
      <Grid templateColumns="repeat(12, ifr);">
        <GridItem colSpan={12}>
          <Header.H3>Integrações</Header.H3>
          <Text>Conecte sua conta no BONDE a outras ferramentas para expandir seu impacto.</Text>
        </GridItem>
        <GridItem colSpan={12}>
          <MenuStyled>
            <LinkStyled component={Link} to={path.replace(':name', 'mailchimp')} className={name === 'mailchimp' ? 'active' : ''}>Comunicação</LinkStyled>
            <LinkStyled component={Link} to={path.replace(':name', 'twilio')} className={name === 'twilio' ? 'active' : ''}>Pressão</LinkStyled>
          </MenuStyled>
        </GridItem>
        <Switch>
          <Route exact path={path.replace(':name', 'mailchimp')}>
            <GridItem colSpan={12}>
              <Mailchimp />
            </GridItem>
          </Route>
          <Route exact path={path.replace(':name', 'twilio')}>
            <GridItem colSpan={12}>
              <Twilio />
            </GridItem>
          </Route>
        </Switch>
      </Grid>
    </Box>
  );
}

// TODO:
// - Translate
// - Validate (+phone)
// - Hint

export default SettingsPage;
